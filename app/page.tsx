import {
  fetchBlogPosts,
  fetchJobFilters,
  fetchJobs,
  fetchStats,
  fetchTestimonials,
} from "@/app/lib/api";
import { Hero } from "@/app/components/landing/hero";
import { FeaturedJobsSection } from "@/app/components/landing/featured-jobs-section";
import { CategoriesSection } from "@/app/components/landing/categories-section";
import { HowItWorksSection } from "@/app/components/landing/how-it-works-section";
import { StatsSection } from "@/app/components/landing/stats-section";
import { TestimonialsSection } from "@/app/components/landing/testimonials-section";
import { BlogHighlightsSection } from "@/app/components/landing/blog-highlights-section";
import { NewsletterSection } from "@/app/components/landing/newsletter-section";
import { FaqSection } from "@/app/components/landing/faq-section";
import { CtaSection } from "@/app/components/landing/cta-section";

export default async function Home() {
  const [jobsResponse, filters, stats, testimonials, blogPosts] = await Promise.all([
    fetchJobs({ sort: "newest", limit: 8 }),
    fetchJobFilters(),
    fetchStats(),
    fetchTestimonials(),
    fetchBlogPosts(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Hero featuredJobs={jobsResponse.jobs.slice(0, 5)} />
      <FeaturedJobsSection jobs={jobsResponse.jobs.slice(0, 4)} />
      <CategoriesSection categories={filters.categories} />
      <HowItWorksSection />
      <StatsSection stats={stats} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogHighlightsSection posts={blogPosts} />
      <NewsletterSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
