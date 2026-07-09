import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { AnalyzerSection } from "@/components/AnalyzerSection";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ResumeIQ — AI Resume Analyzer & ATS Score" },
      {
        name: "description",
        content:
          "Upload your resume for an instant ATS compatibility score, detected skills, missing keywords, and personalized improvement suggestions.",
      },
      { property: "og:title", content: "ResumeIQ — AI Resume Analyzer" },
      {
        property: "og:description",
        content: "Instant ATS score, skills, keywords and improvements for your resume.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen pb-10">
      <Navbar />
      <main>
        <Hero />
        <AnalyzerSection />
        <HowItWorks />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
