import type { Blog } from "../types/blog";

const body = (title: string) =>
  `<p>${title} — in this article we walk through the practical steps, the trade-offs, and the mistakes worth avoiding.</p><h2>Overview</h2><p>Start with the constraints, then pick the smallest solution that satisfies them.</p>`;

export const adminCategories: string[] = [
  "Technology",
  "Design",
  "Development",
  "Lifestyle",
  "Business",
  "AI & ML",
  "DevOps",
  "Product",
];

export const adminBlogs: Blog[] = [
  {
    id: "b1",
    title: "Building Scalable APIs with Node.js and GraphQL",
    slug: "building-scalable-apis-node-graphql",
    description:
      "A practical look at schema design, resolvers and DataLoader for N+1 problems.",
    content: body("Building Scalable APIs with Node.js and GraphQL"),
    thumbnail: "https://picsum.photos/seed/admin-api-graphql/1200/700",
    category: "Development",
    tags: ["node", "graphql", "api", "architecture"],
    status: "published",
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-01-12T10:00:00Z",
    author: "Arpita Awasthi",
  },
  {
    id: "b2",
    title: "The Future of Web Development in 2035",
    slug: "future-of-web-development-2035",
    description:
      "Speculative trends in edge runtimes, streaming SSR and local-first databases.",
    content: body("The Future of Web Development in 2035"),
    thumbnail: "https://picsum.photos/seed/admin-web-2035/1200/700",
    category: "Trends",
    tags: ["web", "edge", "future"],
    status: "draft",
    createdAt: "2026-01-11T10:00:00Z",
    updatedAt: "2026-01-11T10:00:00Z",
    author: "Arpita Awasthi",
  },
  {
    id: "b3",
    title: "Figma Variables: Advanced Design System Patterns",
    slug: "figma-variables-design-system",
    description:
      "How to model colour, spacing and typography scales that survive a redesign.",
    content: body("Figma Variables: Advanced Design System Patterns"),
    thumbnail: "https://picsum.photos/seed/admin-figma-vars/1200/700",
    category: "Design",
    tags: ["figma", "design-system"],
    status: "published",
    createdAt: "2026-01-09T10:00:00Z",
    updatedAt: "2026-01-09T10:00:00Z",
    author: "Arpita Awasthi",
  },
  {
    id: "b4",
    title: "Optimizing Next.js Images with Cloudflare CDN",
    slug: "optimizing-nextjs-images-cloudflare",
    description:
      "Tuning loader parameters and cache headers to cut image weight by more than half.",
    content: body("Optimizing Next.js Images with Cloudflare CDN"),
    thumbnail: "https://picsum.photos/seed/admin-next-img/1200/700",
    category: "Development",
    tags: ["nextjs", "images", "cdn"],
    status: "published",
    createdAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z",
    author: "Arpita Awasthi",
  },
  {
    id: "b5",
    title: "Designing Accessible Color Palettes for SaaS",
    slug: "accessible-color-palettes-saas",
    description:
      "Meeting WCAG AA contrast across light and dark themes without a design review bottleneck.",
    content: body("Designing Accessible Color Palettes for SaaS"),
    thumbnail: "https://picsum.photos/seed/admin-a11y-color/1200/700",
    category: "Design",
    tags: ["accessibility", "color"],
    status: "published",
    createdAt: "2025-12-28T10:00:00Z",
    updatedAt: "2025-12-28T10:00:00Z",
    author: "Arpita Awasthi",
  },
];
