export interface Author {
  name: string;
  initials: string;
  color: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  label: string;
  category: string;
  tags: string[];
  date: string;
  imageSeed: string;
  author: Author;
}

export const authors: Record<string, Author> = {
  alex: { name: "Alex Thorne", initials: "AT", color: "#8b2151" },
  elena: { name: "Elena Rostova", initials: "ER", color: "#4338ca" },
  marcus: { name: "Marcus Aurel", initials: "MA", color: "#0e7490" },
  sarahChen: { name: "Sarah Chen", initials: "SC", color: "#b45309" },
  sarahJenkins: { name: "Sarah Jenkins", initials: "SJ", color: "#7e22ce" },
};

export const categories: string[] = [
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Development",
  "AI & ML",
  "DevOps",
  "Product",
];

export const featuredPost: Post = {
  id: "f1",
  slug: "future-of-web-development-2025",
  title:
    "The Future of Web Development in 2025: Headless, Edge-First, and Generative",
  excerpt:
    "Start learning how modern platforms ship faster with decoupled backends and edge rendering.",
  label: "Technology",
  category: "Technology",
  tags: ["Web Development", "Edge", "Generative"],
  date: "Sep 28, 2025",
  imageSeed: "publiq-hero-2025",
  author: authors.alex,
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "building-a-headless-cms",
    title: "Building a headless CMS with Next.js & GraphQL",
    excerpt:
      "Learn how to architect a completely decoupled content strategy with powerful querying speeds.",
    label: "React",
    category: "Development",
    tags: ["React", "Next.js", "GraphQL"],
    date: "Sep 28, 2025",
    imageSeed: "headless-cms-nextjs",
    author: authors.alex,
  },
  {
    id: "2",
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript: Advanced Generic Types",
    excerpt:
      "Unlock type-safety patterns that scale natively with your complex corporate library APIs.",
    label: "TypeScript",
    category: "Development",
    tags: ["TypeScript", "JavaScript"],
    date: "Sep 25, 2025",
    imageSeed: "typescript-generics",
    author: authors.elena,
  },
  {
    id: "3",
    slug: "dark-mode-best-practices",
    title: "Designing for Devs: Dark Mode Best Practices",
    excerpt:
      "Ensure contrast accessibility ratios conform elegantly with standard developer environments.",
    label: "UI Design",
    category: "Design",
    tags: ["Design", "Accessibility", "Dark Mode"],
    date: "Sep 24, 2025",
    imageSeed: "dark-mode-design",
    author: authors.alex,
  },
  {
    id: "4",
    slug: "webassembly-high-performance",
    title: "WebAssembly: High Performance Web Apps",
    excerpt:
      "Explore compilation techniques to scale graphics-heavy client features smoothly.",
    label: "WASM",
    category: "Technology",
    tags: ["WebAssembly", "Performance"],
    date: "Sep 22, 2025",
    imageSeed: "webassembly-gpu",
    author: authors.marcus,
  },
  {
    id: "5",
    slug: "deploying-edge-functions-vercel",
    title: "Deploying Edge Functions with Vercel",
    excerpt:
      "Achieve sub-millisecond dynamic routing times natively on modern global serverless nodes.",
    label: "DevOps",
    category: "DevOps",
    tags: ["DevOps", "Serverless", "Vercel"],
    date: "Sep 18, 2025",
    imageSeed: "edge-functions-vercel",
    author: authors.sarahChen,
  },
  {
    id: "6",
    slug: "css-container-queries",
    title: "A Complete Guide to CSS Container Queries",
    excerpt:
      "Ditch standard media queries and design truly responsive, container-boundary driven components.",
    label: "CSS",
    category: "Design",
    tags: ["CSS", "Responsive"],
    date: "Sep 15, 2025",
    imageSeed: "css-container-queries",
    author: authors.sarahJenkins,
  },
];
