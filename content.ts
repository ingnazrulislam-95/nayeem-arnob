// Edit this file to update the site. No other file needs to change for content.
export const LINKEDIN = "https://www.linkedin.com/in/ing-nayeem-al-tamzid-bhuiyan-43779a1ab/";

export const nav = ["about", "expertise", "experience", "projects", "education", "contact"] as const;

export const heroIntro =
  "Application and systems engineering professional based in Czechia. [Edit: one or two verified sentences about current role and interests.]";

export const about = [
  "I am always eager to learn and implement new technologies and methods that can change the circumstances of a company or an organization. By improving my knowledge and skills, I want to make changes in IT services by using them well.",
  "I am willing to take risks and manage decisions by analyzing all the circumstances around them. Working hard is like a hobby to me, and I would like to work hard on any project. The scope for personal growth, acquiring new skills and handling challenging tasks are also critical in my career choice.",
];

export const expertise = [
  { title: "Application engineering", text: "[Edit: verified description]" },
  { title: "Systems engineering", text: "[Edit: verified description]" },
  { title: "Test automation", text: "[Edit: verified description]" },
];

export const experience = [
  {
    title: "Application/System Engineer Professional",
    meta: "Zebra Technologies · Full-time · Jul 2026 – Present",
    place: "Brno, South Moravia, Czechia · Hybrid",
    note: "4 years 4 months at Zebra Technologies in total.",
    duties: [] as string[],
    tools: [] as string[],
  },
  {
    title: "Application System Engineer",
    meta: "Zebra Technologies · Full-time · Jul 2022 – Present",
    place: "Brno, South Moravia, Czechia · Hybrid",
    note: "",
    duties: [
      "Collaborate with ISVs to define a joint test plan.",
      "Execute the test plan using the provided software and Zebra devices.",
      "Work with ISVs and Zebra engineering to identify and resolve issues found during testing.",
      "Complete the test documentation.",
      "Automation testing with Selenium, Appium, Robot Framework, TestProject, Postman and similar tools.",
    ],
    tools: ["Selenium", "Appium", "Robot Framework", "TestProject", "Postman", "PyCharm"],
  },
];

// Sample content. Replace with real projects before publishing.
export const projects = [
  { title: "Device telemetry dashboard", text: "Objective: make the health of connected devices visible in one place. Approach: collect status events, normalise them, and show fleet state with alerts.", tools: ["Python", "REST API", "SQL", "Grafana"] },
  { title: "Integration test bench", text: "Objective: check that hardware and software components work together before release. Approach: scripted scenarios with a repeatable report.", tools: ["Python", "Pytest", "CI"] },
  { title: "Troubleshooting knowledge base", text: "Objective: shorten the path from symptom to fix. Approach: structured guides with diagnostic steps.", tools: ["Markdown", "Documentation"] },
];

export const education = [
  { title: "Czech University of Life Sciences Prague", meta: "[Dates] · Prague", text: "[Verified qualification and specialization.]" },
];

export const philosophy = [
  "Curiosity drives engineering.",
  "Systems thinking improves problem-solving.",
  "Continuous learning creates growth.",
  "Practical beats unnecessarily complex.",
];
