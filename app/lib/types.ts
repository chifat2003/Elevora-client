export type Job = {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  type: string;
  category: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  deadline: string;
  imageUrl: string | null;
  recruiterId: string;
  recruiterName: string | null;
  createdAt: string;
};

export type JobsResponse = {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type JobFilterOptions = {
  categories: string[];
  types: string[];
  experienceLevels: string[];
};

export type JobsQuery = {
  q?: string;
  category?: string;
  type?: string;
  location?: string;
  experienceLevel?: string;
  minSalary?: number;
  maxSalary?: number;
  recruiterId?: string;
  sort?: "newest" | "salary_asc" | "salary_desc";
  page?: number;
  limit?: number;
};

export type Application = {
  _id: string;
  jobId: string;
  seekerId: string;
  seekerName: string | null;
  status: string;
  appliedAt: string;
  job: Job | null;
};

export type Applicant = {
  _id: string;
  jobId: string;
  seekerId: string;
  seekerName: string | null;
  status: string;
  appliedAt: string;
};

export type SavedJob = {
  _id: string;
  jobId: string;
  seekerId: string;
  savedAt: string;
  job: Job | null;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImageUrl: string;
  author: string;
  category: string;
  publishedAt: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  createdAt: string;
};

export type PlatformStats = {
  jobsPosted: number;
  companiesHiring: number;
  applicationsSubmitted: number;
};

export type ChatMessage = {
  _id: string;
  userId: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type GeneratedJobContent = {
  title: string;
  shortDescription: string;
  fullDescription: string;
};

export type GenerateJobInput = {
  role: string;
  seniority: string;
  keySkills?: string;
  companyBlurb?: string;
  length: "concise" | "standard" | "detailed";
};
