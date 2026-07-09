import { createFileRoute } from "@tanstack/react-router";
import { JobsApp } from "@/components/jobs/JobsApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TrackWise — Job Application Tracker" },
      {
        name: "description",
        content:
          "Track your job applications with a beautiful dashboard: stats, filters, search, sort, and a calendar view. Data stays in your browser.",
      },
      { property: "og:title", content: "TrackWise — Job Application Tracker" },
      {
        property: "og:description",
        content: "Beautiful job application tracker with dashboard, calendar view, filters, and dark mode.",
      },
    ],
  }),
});

function Index() {
  return <JobsApp />;
}
