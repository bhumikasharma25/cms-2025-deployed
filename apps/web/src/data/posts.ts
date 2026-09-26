import type { Blog } from "../types/blog";

const thumb = (seed: string) => `https://picsum.photos/seed/${seed}/1200/700`;

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

export const featuredPost: Blog = {
  id: "f1",
  title:
    "The Future of Web Development in 2025: Headless, Edge-First, and Generative",
  slug: "future-of-web-development-2025",
  description:
    "Start learning how modern platforms ship faster with decoupled backends and edge rendering.",
  content:
    "<p>Modern platforms ship faster by decoupling the backend from the frontend.</p><h2>Why headless wins</h2><p>Content moves behind an API, so the same data powers every surface.</p>",
  thumbnail: thumb("blogify-hero-2025"),
  category: "Technology",
  tags: ["Web Development", "Edge", "Generative"],
  status: "published",
  createdAt: "2025-09-28T09:00:00Z",
  updatedAt: "2025-09-28T09:00:00Z",
  author: "Alex Thorne",
};

export const posts: Blog[] = [
  {
    id: "1",
    title: "Building a Headless CMS with Next.js & GraphQL",
    slug: "building-a-headless-cms",
    description:
      "Learn how to architect a completely decoupled content strategy with powerful querying speeds.",
    content:
      "<p>A headless CMS treats your content as data instead of pages.</p><h2>Components</h2><ul><li>Decoupled backend</li><li>Virtual DOM</li><li>Reusable UI</li></ul>",
    thumbnail: thumb("headless-cms-nextjs"),
    category: "Development",
    tags: ["React", "Next.js", "GraphQL"],
    status: "published",
    createdAt: "2025-09-28T08:30:00Z",
    updatedAt: "2025-09-28T08:30:00Z",
    author: "Alex Thorne",
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Generic Types",
    slug: "mastering-typescript-generics",
    description:
      "Unlock type-safety patterns that scale natively with your complex corporate library APIs.",
    content:
      "<p>Generics let one definition serve many types safely.</p><h2>Constraints</h2><p>Use <code>extends</code> to narrow what a type parameter accepts.</p>",
    thumbnail: thumb("typescript-generics"),
    category: "Development",
    tags: ["TypeScript", "JavaScript"],
    status: "published",
    createdAt: "2025-09-25T11:15:00Z",
    updatedAt: "2025-09-25T11:15:00Z",
    author: "Elena Rostova",
  },
  {
    id: "3",
    title: "Designing for Devs: Dark Mode Best Practices",
    slug: "dark-mode-best-practices",
    description:
      "Ensure contrast accessibility ratios conform elegantly with standard developer environments.",
    content:
      "<p>Dark mode is not an inversion, it is a separate palette.</p><h2>Contrast</h2><p>Check contrast ratios against your darkest surface, not white.</p>",
    thumbnail: thumb("dark-mode-design"),
    category: "Design",
    tags: ["Design", "Accessibility", "Dark Mode"],
    status: "published",
    createdAt: "2025-09-24T16:45:00Z",
    updatedAt: "2025-09-24T16:45:00Z",
    author: "Alex Thorne",
  },
  {
    id: "4",
    title: "WebAssembly: High Performance Web Apps",
    slug: "webassembly-high-performance",
    description:
      "Explore compilation techniques to scale graphics-heavy client features smoothly.",
    content:
      "<p>WebAssembly compiles ahead of time for predictable performance.</p><h2>Use cases</h2><ul><li>Image and video processing</li><li>Physics simulations</li></ul>",
    thumbnail: thumb("webassembly-gpu"),
    category: "Technology",
    tags: ["WebAssembly", "Performance"],
    status: "published",
    createdAt: "2025-09-22T10:20:00Z",
    updatedAt: "2025-09-22T10:20:00Z",
    author: "Marcus Aurel",
  },
  {
    id: "5",
    title: "Deploying Edge Functions with Vercel",
    slug: "deploying-edge-functions-vercel",
    description:
      "Achieve sub-millisecond dynamic routing times natively on modern global serverless nodes.",
    content:
      "<p>Edge functions run close to your visitors.</p><h2>Limits</h2><p>No Node.js built-ins, and cold starts stay in the low milliseconds.</p>",
    thumbnail: thumb("edge-functions-vercel"),
    category: "DevOps",
    tags: ["DevOps", "Serverless", "Vercel"],
    status: "published",
    createdAt: "2025-09-18T14:00:00Z",
    updatedAt: "2025-09-18T14:00:00Z",
    author: "Sarah Chen",
  },
  {
    id: "6",
    title: "A Complete Guide to CSS Container Queries",
    slug: "css-container-queries",
    description:
      "Ditch standard media queries and design truly responsive, container-boundary driven components.",
    content:
      "<p>Container queries respond to the component, not the viewport.</p><h2>Syntax</h2><p>Declare a containment context with <code>container-type</code>.</p>",
    thumbnail: thumb("css-container-queries"),
    category: "Design",
    tags: ["CSS", "Responsive"],
    status: "published",
    createdAt: "2025-09-15T09:40:00Z",
    updatedAt: "2025-09-15T09:40:00Z",
    author: "Sarah Jenkins",
  },
];
