import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Schemes } from '@once-ui-system/core';

interface BlogNavigationItem {
  slug: string;
  title: string;
  label?: string;
  navTag?: string;
  navLabel?: string;
  navIcon?: string;
  navTagVariant?: Schemes;
  keywords?: string;
  children?: BlogNavigationItem[];
  order?: number;
}

interface MetaData {
  title?: string;
  order?: number;
  pages?: Record<string, number>;
}

function sortItems(items: BlogNavigationItem[]): BlogNavigationItem[] {
  return items.sort((a, b) => {
    const aIsCategory = !!a.children;
    const bIsCategory = !!b.children;

    if (!aIsCategory && bIsCategory) return -1;
    if (aIsCategory && !bIsCategory) return 1;

    const aHasOrder = typeof a.order === 'number';
    const bHasOrder = typeof b.order === 'number';

    if (aHasOrder && !bHasOrder) return -1;
    if (!aHasOrder && bHasOrder) return 1;

    if (aHasOrder && bHasOrder && a.order !== b.order) {
      return a.order! - b.order!;
    }

    return a.title.localeCompare(b.title);
  });
}

export default function getBlogNavigation(
  dirPath = path.join(process.cwd(), 'src/content-blog')
): BlogNavigationItem[] {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const BlogNavigationItems = entries.map((entry) => {
    if (entry.name === 'meta.json') return null;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      const filenameNoExt = entry.name.replace(/\.mdx$/, '');
      const relativePath = path
        .relative(path.join(process.cwd(), 'src/content-blog'), fullPath)
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '');

      return {
        slug: relativePath,
        title: data.title || filenameNoExt,
        navTag: data.navTag,
        navLabel: data.navLabel,
        navIcon: data.navIcon,
        navTagVariant: data.navTagVariant,
        keywords: data.keywords,
        order: data.order,
      };
    }

    return null;
  }).filter(Boolean) as BlogNavigationItem[];

  return sortItems(BlogNavigationItems);
}
