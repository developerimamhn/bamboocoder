import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, the people involved and the requirements behind the request.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "Define scope, priorities and technical direction so effort goes where it matters.",
  },
  {
    number: "03",
    title: "Design",
    description: "Map user flows, wireframes and interfaces, and validate them before code is written.",
  },
  {
    number: "04",
    title: "Develop",
    description: "Build and integrate the solution in short iterations you can review along the way.",
  },
  {
    number: "05",
    title: "Test",
    description: "Validate quality, security and performance against agreed acceptance criteria.",
  },
  {
    number: "06",
    title: "Launch & Improve",
    description: "Deploy, monitor real usage and keep iterating on what the data tells us.",
  },
];
