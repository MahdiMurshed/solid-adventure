import { TCATAGORIES } from "./types";

export const EXPLORE_WORLDS = [
  {
    id: "world-1",
    imgUrl: "/ai.webp",
    title: "Artificial Intelligence",
  },
  {
    id: "world-2",
    imgUrl: "/bc.webp",
    title: "Blockchain",
  },
  {
    id: "world-3",
    imgUrl: "/cs.webp",
    title: "Cyber Security",
  },
  {
    id: "world-4",
    imgUrl: "/ds.webp",
    title: "Data Science",
  },
];

export const startingFeatures = [
  "Find a world that suits you and you want to enter",
  "Enter the world by reading basmalah to be safe",
  "No need to beat around the bush, just stay on the gas and have fun",
];

export const newFeatures = [
  {
    imgUrl: "/vrpano.svg",
    title: "A new world",
    subtitle:
      "we have the latest update with new world for you to try never mind",
  },
  {
    imgUrl: "/headset.svg",
    title: "More realistic",
    subtitle:
      "In the latest update, your eyes are narrow, making the world more realistic than ever",
  },
];

export const insights = [
  {
    imgUrl: "/dp.webp",
    title: "Deep Learning for Sentiment Analysis: A Comparative Study",
    subtitle:
      "Evaluating the performance of various neural network architectures on sentiment analysis tasks",
  },
  {
    imgUrl: "/ml.webp",
    title: "The Impact of Data Privacy Regulations on Machine Learning",
    subtitle:
      "Analyzing the challenges and opportunities of complying with data protection laws in the age of artificial intelligence",
  },
  {
    imgUrl: "/sc.webp",
    title:
      "A Survey of Blockchain Technologies and Their Applications in Supply Chain Management",
    subtitle:
      "Exploring the potential of distributed ledger technologies for improving traceability and transparency in global supply chains",
  },
];

export const socials = [
  {
    name: "twitter",
    url: "/twitter.svg",
  },
  {
    name: "linkedin",
    url: "/linkedin.svg",
  },
  {
    name: "instagram",
    url: "/instagram.svg",
  },
  {
    name: "facebook",
    url: "/facebook.svg",
  },
];

export const links = [
  {
    link: "/",
    label: "Home",
    links: [
      {
        link: "#hero",
        label: "Hero",
      },
      {
        link: "#about",
        label: "About",
      },
      {
        link: "#topics",
        label: "Topics",
      },
      {
        link: "#top",
        label: "Top research",
      },
    ],
  },
  {
    link: "/faculty",
    label: "Faculty",
  },
  {
    link: "/materials",
    label: "Materials",
  },
  {
    link: "/submit-material",
    label: "Add Materials",
  },
  {
    link: "/notices",
    label: "Notices",
  },
];

export const SUPERVISORS = [
  {
    value: "bob@handsome.inc",
    label: "bob@handsome.inc",

    name: "Bob Handsome",
  },
  {
    value: "bill@outlook.com",
    label: "bill@outlook.com",

    name: "Bill Rataconda",
  },
  {
    value: "amy@wong.cn",
    label: "amy@wong.cn",

    name: "Amy Wong",
  },
];

export const TAGS = [
  "artificial intelligence",
  "machine learning",
  "deep learning",
  "neural networks",
  "computer vision",
  "natural language processing",
  "big data",
  "data science",
  "cloud computing",
  "high performance computing",
  "distributed systems",
  "parallel computing",
  "algorithms",
  "software engineering",
  "human-computer interaction",
  "security and privacy",
  "internet of things",
  "blockchain technology",
  "game development",
  "virtual reality",
];

// export const CATEGORIES = [
//   { value: "artificial_intelligence", label: "Artificial Intelligence" },
//   { value: "data_science", label: "Data Science" },
//   { value: "cloud_computing", label: "Cloud Computing" },
//   { value: "high_performance_computing", label: "High Performance Computing" },
//   { value: "distributed_systems", label: "Distributed Systems" },
//   { value: "security_and_privacy", label: "Security and Privacy" },
//   { value: "software_engineering", label: "Software Engineering" },
//   { value: "human_computer_interaction", label: "Human-Computer Interaction" },
//   { value: "game_development", label: "Game Development" },
//   { value: "virtual_reality", label: "Virtual Reality" },
// ];

export const CATEGORIES: {
  value: TCATAGORIES;
  label: string;
  tags: string[];
}[] = [
  {
    value: "artificial_intelligence",
    label: "Artificial Intelligence",
    tags: [
      "machine learning",
      "deep learning",
      "neural networks",
      "computer vision",
      "natural language processing",
    ],
  },
  {
    value: "data_science",
    label: "Data Science",
    tags: [
      "big data",
      "data mining",
      "data analysis",
      "data visualization",
      "statistics",
    ],
  },
  {
    value: "cloud_computing",
    label: "Cloud Computing",
    tags: [
      "cloud infrastructure",
      "cloud storage",
      "cloud security",
      "cloud migration",
      "cloud optimization",
    ],
  },
  {
    value: "high_performance_computing",
    label: "High Performance Computing",
    tags: [
      "parallel computing",
      "GPU computing",
      "HPC algorithms",
      "HPC systems",
      "HPC applications",
    ],
  },
  {
    value: "distributed_systems",
    label: "Distributed Systems",
    tags: [
      "distributed algorithms",
      "distributed storage",
      "distributed databases",
      "distributed networks",
      "distributed security",
    ],
  },
  {
    value: "security_and_privacy",
    label: "Security and Privacy",
    tags: [
      "cryptography",
      "network security",
      "information security",
      "cyber security",
      "privacy protection",
    ],
  },
  {
    value: "software_engineering",
    label: "Software Engineering",
    tags: [
      "software design",
      "software development",
      "software testing",
      "software maintenance",
      "software quality assurance",
    ],
  },
  {
    value: "human_computer_interaction",
    label: "Human-Computer Interaction",
    tags: [
      "user experience",
      "user interface design",
      "human-centered computing",
      "accessibility",
      "interactive technology",
    ],
  },
  {
    value: "game_development",
    label: "Game Development",
    tags: [
      "game design",
      "game programming",
      "game graphics",
      "game audio",
      "game AI",
    ],
  },
  {
    value: "virtual_reality",
    label: "Virtual Reality",
    tags: [
      "VR hardware",
      "VR software",
      "VR content creation",
      "VR applications",
      "VR interaction",
    ],
  },
];

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "teacher",
};
