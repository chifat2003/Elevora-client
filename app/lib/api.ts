import type {
  Applicant,
  Application,
  BlogPost,
  ChatMessage,
  GenerateJobInput,
  GeneratedJobContent,
  Job,
  JobFilterOptions,
  JobsQuery,
  JobsResponse,
  PlatformStats,
  SavedJob,
  Testimonial,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function buildQueryString(query: JobsQuery): string {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function fetchJobs(query: JobsQuery): Promise<JobsResponse> {
  return apiFetch<JobsResponse>(`/api/jobs${buildQueryString(query)}`);
}

export function fetchJobFilters(): Promise<JobFilterOptions> {
  return apiFetch<JobFilterOptions>("/api/jobs/categories");
}

export function fetchJob(id: string): Promise<Job> {
  return apiFetch<Job>(`/api/jobs/${id}`);
}

export function fetchRelatedJobs(id: string): Promise<Job[]> {
  return apiFetch<Job[]>(`/api/jobs/${id}/related`);
}

export function createJob(
  job: Omit<Job, "_id" | "createdAt">
): Promise<Job> {
  return apiFetch<Job>("/api/jobs", {
    method: "POST",
    body: JSON.stringify(job),
  });
}

export function deleteJob(id: string, recruiterId: string): Promise<void> {
  return apiFetch<void>(`/api/jobs/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ recruiterId }),
  });
}

export function fetchApplications(seekerId: string): Promise<Application[]> {
  return apiFetch<Application[]>(`/api/applications?seekerId=${seekerId}`);
}

export function applyToJob(
  jobId: string,
  seekerId: string,
  seekerName: string
): Promise<Application> {
  return apiFetch<Application>("/api/applications", {
    method: "POST",
    body: JSON.stringify({ jobId, seekerId, seekerName }),
  });
}

export function withdrawApplication(
  id: string,
  seekerId: string
): Promise<void> {
  return apiFetch<void>(`/api/applications/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ seekerId }),
  });
}

export function fetchJobApplicants(
  jobId: string,
  recruiterId: string
): Promise<Applicant[]> {
  return apiFetch<Applicant[]>(
    `/api/applications/by-job/${jobId}?recruiterId=${recruiterId}`
  );
}

export function fetchSavedJobs(seekerId: string): Promise<SavedJob[]> {
  return apiFetch<SavedJob[]>(`/api/saved-jobs?seekerId=${seekerId}`);
}

export function saveJob(jobId: string, seekerId: string): Promise<SavedJob> {
  return apiFetch<SavedJob>("/api/saved-jobs", {
    method: "POST",
    body: JSON.stringify({ jobId, seekerId }),
  });
}

export function unsaveJob(id: string, seekerId: string): Promise<void> {
  return apiFetch<void>(`/api/saved-jobs/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ seekerId }),
  });
}

export function fetchBlogPosts(): Promise<BlogPost[]> {
  return apiFetch<BlogPost[]>("/api/blog-posts");
}

export function fetchBlogPost(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/api/blog-posts/${slug}`);
}

export function fetchTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>("/api/testimonials");
}

export function fetchStats(): Promise<PlatformStats> {
  return apiFetch<PlatformStats>("/api/stats");
}

export function subscribeNewsletter(email: string): Promise<{ email: string }> {
  return apiFetch<{ email: string }>("/api/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function fetchChatHistory(userId: string): Promise<ChatMessage[]> {
  return apiFetch<ChatMessage[]>(`/api/chat?userId=${userId}`);
}

export async function streamChat(
  userId: string,
  message: string,
  onDelta: (text: string) => void
): Promise<void> {
  const res = await fetch(`${API_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = JSON.parse(line.slice(6));
      if (payload.error) throw new Error(payload.error);
      if (payload.delta) onDelta(payload.delta);
    }
  }
}

export function generateJobContent(
  input: GenerateJobInput
): Promise<GeneratedJobContent> {
  return apiFetch<GeneratedJobContent>("/api/ai/generate-job", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
