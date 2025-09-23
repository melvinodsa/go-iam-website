import { notFound } from "next/navigation";
import { getBlogPosts, getAdjacentBlogPosts } from "@/app/utils/blog";
import { CustomMDX } from "@/components/mdx";
import { formatDate } from "@/app/utils/formatDate";
import {
  Column,
  Heading,
  Text,
  Media,
  Row,
  Card,
  Icon,
  Schema,
} from "@once-ui-system/core";
import { layout } from "@/resources/once-ui.config";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const { prevPost, nextPost } = getAdjacentBlogPosts(slug);

  return (
    <Row>
      {/* Main content area (same structure as Docs) */}
      <Row minWidth={layout.blog_content.minWidth}>
        <Column
          as="main"
          maxWidth={layout.blog_content.width}
          gap="l"
          paddingBottom="xl"
          overflow="auto"
          marginLeft="16"
          marginRight="16"
          paddingX="32"
        >
          <Schema
            as="blogPosting"
            title={post.metadata.title}
            description={post.metadata.summary}
            baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
            path={`/blog/${post.slug}`}
            datePublished={post.metadata.date}
            author={{ name: post.metadata.author || "Team" }}
          />

          <Column fillWidth gap="8" vertical="center">
            <Text variant="label-default-l" onBackground="neutral-medium">
              Blog
            </Text>
            <Heading variant="display-strong-s">{post.metadata.title}</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.date)} • {post.metadata.author}
            </Text>
          </Column>

          {post.metadata.image && (
            <Media
              border="neutral-alpha-medium"
              enlarge
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16 / 9"
              radius="m"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          )}

          <Column as="article" fillWidth>
            <CustomMDX source={post.content} />
          </Column>

          {/* Prev / Next navigation */}
          <Row
            gap="16"
            fillWidth
            horizontal="between"
            s={{ direction: "column" }}
          >
            {/* Previous Post */}
            {prevPost && (
              <Row fillWidth s={{ horizontal: "stretch" }}>
                <Row maxWidth={20}>
                  <Card
                    fillWidth
                    border="neutral-alpha-medium"
                    vertical="center"
                    gap="4"
                    href={`/blog/${prevPost.slug}`}
                    radius="l"
                    paddingX="16"
                    marginLeft="16"
                    marginRight="16"
                  >
                    <Icon
                      name="chevronLeft"
                      size="s"
                      onBackground="neutral-weak"
                    />
                    <Column
                      gap="4"
                      vertical="center"
                      paddingX="16"
                      paddingY="12"
                    >
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-weak"
                      >
                        Previous post
                      </Text>
                      <Text
                        onBackground="neutral-strong"
                        variant="heading-strong-m"
                        wrap="balance"
                      >
                        {prevPost.metadata.title}
                      </Text>
                    </Column>
                  </Card>
                </Row>
              </Row>
            )}

            {/* Next Post */}
            {nextPost ? (
              <Row fillWidth horizontal="end" s={{ horizontal: "stretch" }}>
                <Row maxWidth={20}>
                  <Card
                    fillWidth
                    border="neutral-alpha-medium"
                    horizontal="end"
                    vertical="center"
                    gap="4"
                    href={`/blog/${nextPost.slug}`}
                    radius="l"
                    paddingX="16"
                    marginLeft="16"
                    marginRight="16"
                  >
                    <Column
                      horizontal="end"
                      gap="4"
                      vertical="center"
                      paddingX="16"
                      paddingY="12"
                    >
                      <Text
                        variant="label-default-s"
                        onBackground="neutral-weak"
                      >
                        Next post
                      </Text>
                      <Text
                        onBackground="neutral-strong"
                        variant="heading-strong-m"
                        wrap="balance"
                      >
                        {nextPost.metadata.title}
                      </Text>
                    </Column>
                    <Icon
                      name="chevronRight"
                      size="s"
                      onBackground="neutral-weak"
                    />
                  </Card>
                </Row>
              </Row>
            ) : (
              <Row />
            )}
          </Row>
        </Column>
      </Row>

      {/* Sidebar (like Docs, but empty for now) */}
      <Column
        gap="16"
        maxWidth={layout.sideNav.width}
        m={{ hide: true }}
        position="sticky"
        top="80"
        overflow="auto"
        style={{ height: "calc(100vh - var(--static-space-80))" }}
      >
        {/* optional: categories, tags, related posts */}
      </Column>
    </Row>
  );
}
