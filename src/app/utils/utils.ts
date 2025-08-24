import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Schemes } from "@once-ui-system/core";

interface Post {
  slug: string;
  content: string;
  navTag?: string;
  navLabel?: string;
  navIcon?: string;
  navTagVariant?: Schemes;
  metadata: {
    title: string;
    summary: string;
    github?: string;
    updatedAt: string;
    image?: string;
    order?: number; // Add order field for explicit ordering
  };
}

export function getPages(customPath = ["src", "content"], order = 1): Post[] {
  const postsDir = path.join(process.cwd(), ...customPath);
  const contentBasePath = path.join(process.cwd(), "src", "content");

  // Check if directory exists before trying to read it
  if (!fs.existsSync(postsDir)) {
    console.warn(`Directory does not exist: ${postsDir}`);
    return [];
  }

  const files = fs.readdirSync(postsDir);
  const posts: Post[] = [];

  // Try to read meta.json if it exists in the current directory
  let metaData: { pages?: Record<string, number>, order?: number, title?: string } = {};
  const metaPath = path.join(postsDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (error) {
      console.warn(`Error reading meta.json: ${metaPath}`, error);
    }
  }

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      try {
        const dirOrder = metaData.pages?.[file] || order;
        posts.push(...getPages([...customPath, file], dirOrder));
      } catch (error) {
        console.warn(`Error reading directory: ${filePath}`, error);
      }
    } else if (file.endsWith('.mdx')) {
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Create slug without src/content prefix
        const slug = path.relative(contentBasePath, filePath)
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/');

        // Get order from meta.json if available
        const fileName = path.basename(file, path.extname(file));
        const metaOrder = (metaData.pages?.[fileName] || 0) + order * 10;

        posts.push({
          slug,
          content,
          navTag: data.tag,
          navLabel: data.tagLabel,
          navIcon: data.navIcon,
          navTagVariant: data.navTagVariant,
          metadata: {
            title: data.title || '',
            summary: data.summary,
            github: data.github,
            updatedAt: data.updatedAt || '',
            image: data.image,
            // Priority: 1. Frontmatter order, 2. meta.json order, 3. undefined
            order: data.order !== undefined ? Number(data.order) : (metaOrder !== undefined ? Number(metaOrder) : undefined),
          },
        });
      } catch (error) {
        console.warn(`Error reading file: ${filePath}`, error);
      }
    }
  });

  const sortedPosts = posts.sort((a, b) => {
    return (a.metadata.order || 0) - (b.metadata.order || 0);
  });
  console.log(customPath, sortedPosts.map(post => ({ order: post.metadata.order, name: post.metadata.title })));

  return sortedPosts;
}

// Sort types for documentation pages
export type SortType = 'order' | 'alphabetical' | 'date' | 'section';

// Function to sort pages consistently across the application
export function sortPages(pages: Post[], sortType: SortType = 'order'): Post[] {
  if (!pages || pages.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating the original array
  const sortedPages = [...pages];

  switch (sortType) {
    case 'order':
      // First sort by explicit order (if available), then alphabetically by slug as fallback
      return sortedPages.sort((a, b) => {
        // If both have order, sort by order
        if (a.metadata.order !== undefined && b.metadata.order !== undefined) {
          return a.metadata.order - b.metadata.order;
        }
        // If only a has order, a comes first
        if (a.metadata.order !== undefined) {
          return -1;
        }
        // If only b has order, b comes first
        if (b.metadata.order !== undefined) {
          return 1;
        }
        // If neither has order, sort alphabetically by slug
        return a.slug.localeCompare(b.slug);
      });

    case 'alphabetical':
      // Sort alphabetically by title
      return sortedPages.sort((a, b) =>
        a.metadata.title.localeCompare(b.metadata.title)
      );

    case 'date':
      // Sort by update date (newest first)
      return sortedPages.sort((a, b) =>
        new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime()
      );

    case 'section':
      // Sort by section (directory structure) first, then by order within section
      return sortedPages.sort((a, b) => {
        // Get the section (first part of the slug)
        const aSection = a.slug.split('/')[0];
        const bSection = b.slug.split('/')[0];

        // If sections are different, sort by section
        if (aSection !== bSection) {
          return aSection.localeCompare(bSection);
        }

        // If in the same section, use order logic
        if (a.metadata.order !== undefined && b.metadata.order !== undefined) {
          return a.metadata.order - b.metadata.order;
        }
        if (a.metadata.order !== undefined) return -1;
        if (b.metadata.order !== undefined) return 1;

        // Fallback to alphabetical by title
        return a.metadata.title.localeCompare(b.metadata.title);
      });

    default:
      return sortedPages;
  }
}

// Function to get adjacent pages based on the current slug
export function getAdjacentPages(currentSlug: string, sortType: SortType = 'section') {
  try {
    // Get all pages
    const allPages = getPages();

    // Find the current page
    const currentIndex = allPages.findIndex(page => page.slug === currentSlug);
    if (currentIndex === -1) {
      return { prevPage: null, nextPage: null };
    }

    // Get previous and next pages based on the sidebar order
    let prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
    let nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

    return { prevPage, nextPage };
  } catch (error) {
    console.error("Error getting adjacent pages:", error);
    return { prevPage: null, nextPage: null };
  }
}

// Function to get all sections with their pages
export function getSections(sortType: SortType = 'order'): { section: string, pages: Post[] }[] {
  try {
    // Get all pages
    const allPages = getPages();

    // Group pages by section
    const sectionMap = new Map<string, Post[]>();

    allPages.forEach(page => {
      const section = page.slug.split('/')[0];
      if (!sectionMap.has(section)) {
        sectionMap.set(section, []);
      }
      sectionMap.get(section)!.push(page);
    });

    // Sort sections based on meta.json order if available
    const sections: { section: string, pages: Post[] }[] = [];

    // Try to read root meta.json for section ordering
    let rootMetaData: { sections?: Record<string, number> } = {};
    const rootMetaPath = path.join(process.cwd(), "src", "content", "meta.json");
    if (fs.existsSync(rootMetaPath)) {
      try {
        rootMetaData = JSON.parse(fs.readFileSync(rootMetaPath, 'utf8'));
      } catch (error) {
        console.warn(`Error reading root meta.json: ${rootMetaPath}`, error);
      }
    }

    // Convert map to array and sort sections
    for (const [section, pages] of sectionMap.entries()) {
      sections.push({
        section,
        pages: sortPages(pages, sortType)
      });
    }

    // Sort sections based on meta.json order if available, otherwise alphabetically
    return sections.sort((a, b) => {
      const aOrder = rootMetaData.sections?.[a.section];
      const bOrder = rootMetaData.sections?.[b.section];

      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder;
      }
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;

      return a.section.localeCompare(b.section);
    });
  } catch (error) {
    console.error("Error getting sections:", error);
    return [];
  }
}