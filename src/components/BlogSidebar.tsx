"use client";

import React, { useEffect, useState, useMemo } from "react";
import { isMobile } from "react-device-detect";
import {
  Schemes,
  Accordion,
  Column,
  Flex,
  Icon,
  Row,
  Tag,
  ToggleButton,
  NavIcon,
} from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { routes, layout, style } from "@/resources/once-ui.config";

import styles from "./Sidebar.module.scss";

// Global navigation cache to prevent refetching
let globalNavigationCache: any = null;

export interface BlogNavigationItem
  extends Omit<
    React.ComponentProps<typeof Flex>,
    "title" | "label" | "children"
  > {
  slug: string;
  title: string;
  label?: string;
  order?: number;
  children?: BlogNavigationItem[];
  schemes?: Schemes;
  keywords?: string;
  navIcon?: string;
  navTag?: string;
  navLabel?: string;
  navTagVariant?: Schemes;
}

interface BlogSidebarProps
  extends Omit<React.ComponentProps<typeof Flex>, "children"> {
  initialNavigation: BlogNavigationItem[];
  posts: { slug: string; title: string; date: string }[];
}

// Memoized navigation item component to prevent re-renders
const BlogNavigationItemComponent: React.FC<{
  item: BlogNavigationItem;
  depth: number;
  pathname: string;
  renderNavigation: (
    items: BlogNavigationItem[],
    depth: number
  ) => React.ReactNode;
}> = ({ item, depth, pathname, renderNavigation }) => {
  const correctedSlug = item.slug;

  const pathSegments = pathname.split("/").filter(Boolean);

  const isTopLevelMatch =
    depth === 0 &&
    pathSegments.length >= 2 &&
    pathSegments[0] === "blog" &&
    correctedSlug.split("/")[0] === pathSegments[1];

  // For deeper items, check for exact match or if it's a parent path
  const isExactMatch = pathname === `/${correctedSlug}`;
  const isParentPath = pathname.startsWith(`/${correctedSlug}/`);

  const isSelected = isExactMatch;

  // Use this for accordion open state - if it's a parent or exact match
  const isActive = isExactMatch || isParentPath || isTopLevelMatch;

  const isPathWithinSection = (() => {
    if (!correctedSlug) return false;

    const sectionSegments = correctedSlug.split("/").filter(Boolean);

    if (pathSegments.length < sectionSegments.length) return false;

    // Check if all section segments match the corresponding path segments
    for (let i = 0; i < sectionSegments.length; i++) {
      if (pathSegments[i] !== sectionSegments[i]) {
        return false;
      }
    }

    return true;
  })();

  // For accordion sections, check if any child's path is in the current URL
  const hasActiveChild = item.children?.some((child) => {
    const childSlug = child.slug;
    const childSegments = childSlug.split("/").filter(Boolean);

    // Check if the pathname segments match this child's segments
    if (pathSegments.length >= childSegments.length) {
      for (let i = 0; i < childSegments.length; i++) {
        if (pathSegments[i] !== childSegments[i]) {
          return false;
        }
      }
      return true;
    }

    return false;
  });

  // Check if current section should be open based on path matching
  // This ensures the section is open when arriving at a page within this section
  const shouldBeOpen =
    isSelected || hasActiveChild || isParentPath || isPathWithinSection;

  if (item.children) {
    return (
      <Row
        fillWidth
        style={{ paddingLeft: `calc(${depth} * var(--static-space-8))` }}
      >
        <Column fillWidth marginTop="2">
          {layout.sidebar.collapsible ? (
            <Accordion
              gap="2"
              icon="chevronRight"
              iconRotation={90}
              size="s"
              radius="s"
              paddingX={undefined}
              paddingBottom={undefined}
              paddingLeft="4"
              paddingTop="4"
              open={shouldBeOpen}
              title={
                <Row textVariant="label-strong-s" onBackground="brand-strong">
                  {item.title}
                </Row>
              }
            >
              {renderNavigation(item.children, depth + 1)}
            </Accordion>
          ) : (
            <Column gap="2" paddingLeft="4" paddingTop="4">
              <Row
                paddingY="8"
                paddingLeft="8"
                textVariant="label-strong-s"
                onBackground="brand-strong"
              >
                {item.title}
              </Row>
              {renderNavigation(item.children, depth + 1)}
            </Column>
          )}
        </Column>
      </Row>
    );
  }

  return (
    <ToggleButton
      fillWidth
      horizontal="between"
      selected={isSelected}
      className={depth === 0 ? styles.navigation : undefined}
      href={`/blog/${correctedSlug}`}
    >
      <Row fillWidth horizontal="between" vertical="center">
        <Row
          overflow="hidden"
          gap="8"
          onBackground={isSelected ? "neutral-strong" : "neutral-weak"}
          textVariant={isSelected ? "label-strong-s" : "label-default-s"}
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {item.navIcon && <Icon size="xs" name={item.navIcon} />}
          {item.label || item.title}
        </Row>
        {item.navTag && (
          <Tag
            data-theme="dark"
            data-brand={item.navTagVariant}
            style={{
              marginRight: "-0.5rem",
              transform: "scale(0.8)",
              transformOrigin: "right center",
            }}
            variant="brand"
            size="s"
          >
            {item.navTag}
          </Tag>
        )}
      </Row>
    </ToggleButton>
  );
};

const BlogNavigationItem = React.memo(
  BlogNavigationItemComponent,
  (prevProps, nextProps) => {
    if (prevProps.pathname !== nextProps.pathname) {
      return false;
    }

    return prevProps.item === nextProps.item;
  }
);

BlogNavigationItem.displayName = "BlogNavigationItem";

// Memoized resource link component
const ResourceLinkComponent: React.FC<{
  href: string;
  icon: string;
  label: string;
  pathname: string;
}> = ({ href, icon, label, pathname }) => {
  const isSelected = pathname === href;

  return (
    <ToggleButton
      fillWidth
      horizontal="between"
      selected={isSelected}
      className={styles.navigation}
      href={href}
    >
      <Row
        gap="8"
        onBackground={isSelected ? "neutral-strong" : "neutral-weak"}
        textVariant={isSelected ? "label-strong-s" : "label-default-s"}
      >
        <Icon size="xs" name={icon} />
        {label}
      </Row>
    </ToggleButton>
  );
};

const ResourceLink = React.memo(
  ResourceLinkComponent,
  (prevProps, nextProps) => {
    if (prevProps.pathname !== nextProps.pathname) {
      return false;
    }

    return (
      prevProps.href === nextProps.href && prevProps.icon === nextProps.icon
    );
  }
);

ResourceLink.displayName = "ResourceLink";

const BlogSidebarContent: React.FC<{
  blogNavigation: BlogNavigationItem[];
  pathname: string;
  posts: { slug: string; title: string; date: string }[];
}> = React.memo(
  ({ blogNavigation, pathname, posts }) => {
    const groupedByMonth = useMemo(() => {
      if (!posts) return {};

      return posts.reduce((acc, post) => {
        const date = new Date(post.date);
        const key = date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!acc[key]) acc[key] = [];
        acc[key].push(post);
        return acc;
      }, {} as Record<string, typeof posts>);
    }, [posts]);

    const renderNavigation = (items: BlogNavigationItem[], depth = 0) => {
      return (
        <>
          {items.map((item) => (
            <BlogNavigationItem
              key={item.slug}
              item={item}
              depth={depth}
              pathname={pathname}
              renderNavigation={renderNavigation}
            />
          ))}
        </>
      );
    };


    // Monthly archive
    const monthlyArchive = (
      <Column gap="1" marginTop="16" paddingLeft="4">
        <Row
          textVariant="label-strong-s"
          onBackground="brand-strong"
          paddingLeft="8"
          paddingY="12"
        >
          By Month
        </Row>

        {Object.entries(groupedByMonth).map(([month, monthPosts]) => (
          <Accordion
            key={month}
            gap="2"
            icon="chevronRight"
            iconRotation={90}
            size="s"
            radius="s"
            paddingLeft="4"
            paddingTop="4"
            title={
              <Row textVariant="label-strong-s" onBackground="neutral-medium">
                {month}
              </Row>
            }
          >
            {monthPosts.map((p) => (
              <ToggleButton
                key={p.slug}
                href={`/blog/${p.slug}`}
                fillWidth
                horizontal="between"
              >
                <Row gap="8">{p.title}</Row>
              </ToggleButton>
            ))}
          </Accordion>
        ))}
      </Column>
    );

    // Resources section
    const resourcesSection = (
      <Column gap="1" marginTop="16" paddingLeft="4">
        <Row
          textVariant="label-strong-s"
          onBackground="brand-strong"
          paddingLeft="8"
          paddingY="12"
        >
          Blog Links
        </Row>

        <ResourceLink
          href="/blog/archive"
          icon="archive"
          label="Archive"
          pathname="blog-archive"
        />

        <ResourceLink
          href="/blog/categories"
          icon="category"
          label="Categories"
          pathname="blog-categories"
        />

        <ResourceLink
          href="/blog/tags"
          icon="tag"
          label="Tags"
          pathname="blog-tags"
        />
      </Column>
    );

    return (
      <>
        <Column gap="1" marginTop="16" paddingLeft="4">
          <ResourceLink
            href="/blog"
            icon="pen"
            label="All blogs"
            pathname="blog"
          />
        </Column>
        {renderNavigation(blogNavigation, 0)}
        {monthlyArchive}
        {/* {resourcesSection} */}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.pathname !== nextProps.pathname) {
      return false;
    }

    return prevProps.blogNavigation === nextProps.blogNavigation;
  }
);

BlogSidebarContent.displayName = "SidebarContent";

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  initialNavigation,
  posts,
  ...rest
}) => {
  const [blogSidebarVisible, setBlogSidebarVisible] = useState(false);
  const [blogNavigation, setBlogNavigation] = useState<BlogNavigationItem[]>(
    initialNavigation || []
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMobile) {
      setBlogSidebarVisible(true);
    }
  }, [isMobile]);

  // Load navigation data only once, using global cache
  useEffect(() => {
    // Use initialNavigation if provided
    if (initialNavigation && initialNavigation.length > 0) {
      setBlogNavigation(initialNavigation);
      globalNavigationCache = initialNavigation;
      setHasLoaded(true);
      return;
    }

    // Use global cache if available
    if (globalNavigationCache) {
      setBlogNavigation(globalNavigationCache);
      setHasLoaded(true);
      return;
    }
  }, [initialNavigation, hasLoaded]);

  // Create a stable container that doesn't change
  const containerStyle = useMemo(
    () => ({
      maxHeight: "calc(100vh - var(--static-space-80))",
    }),
    []
  );

  const toggleSidebar = () => {
    setBlogSidebarVisible(!blogSidebarVisible);
  };

  useEffect(() => {
    if (blogSidebarVisible) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position when sidebar is closed
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [blogSidebarVisible]);

  return (
    <>
      <NavIcon
        style={{ position: "fixed", zIndex: 1001 }}
        left="8"
        top="16"
        hide
        m={{ hide: false }}
        onClick={toggleSidebar}
      />
      <Column
        width={blogSidebarVisible ? layout.sidebar.width : 0}
        minWidth={blogSidebarVisible ? layout.sidebar.width : 0}
        position="sticky"
        top="64"
        fitHeight
        gap="2"
        as="nav"
        overflowY="auto"
        paddingRight="8"
        style={containerStyle}
        {...rest}
      >
        {hasLoaded && blogSidebarVisible && (
          <BlogSidebarContent
            key={pathname}
            blogNavigation={blogNavigation}
            pathname={pathname}
            posts={posts}
          />
        )}
      </Column>
    </>
  );
};

const MemoizedBlogSidebar = React.memo(BlogSidebar, (prevProps, nextProps) => {
  return prevProps.initialNavigation === nextProps.initialNavigation;
});

MemoizedBlogSidebar.displayName = "MemoizedBlogSidebar";

export { MemoizedBlogSidebar as BlogSidebar };
