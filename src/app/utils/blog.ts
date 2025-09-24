import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "src/content-blog");

export function getBlogPosts() {
  const files = fs.readdirSync(blogDir);
  return files.map((file) => {
    const source = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data, content } = matter(source);
    return {
      slug: file.replace(/\.mdx$/, ""),
      metadata: data,
      content,
    };
  }).sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export function getAdjacentBlogPosts(slug: string) {
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prevPost: posts[index - 1] || null,
    nextPost: posts[index + 1] || null,
  };
}
