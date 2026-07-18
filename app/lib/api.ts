import type { Job, JobFilterOptions, JobsQuery, JobsResponse } from "./types";

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
