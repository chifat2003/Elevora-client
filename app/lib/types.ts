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
  sort?: "newest" | "salary_asc" | "salary_desc";
  page?: number;
  limit?: number;
};
