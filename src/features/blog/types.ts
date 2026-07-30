export type BlogAuthor = {
  name: string;
  role: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: BlogAuthor;
  body: readonly BlogBlock[];
};

export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "publishedAt" | "author"
>;
