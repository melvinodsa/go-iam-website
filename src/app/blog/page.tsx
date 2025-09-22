import Link from "next/link";
import { getBlogPosts } from "@/app/utils/blog";
import { Heading, Text, Column, Row } from "@once-ui-system/core";
import { layout } from "@/resources/once-ui.config";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Row>
      <Row>
        <Column
          as="main"
          maxWidth={layout.content.width}
          gap="l"
          paddingBottom="xl"
          overflow="auto"
          marginLeft="16"
          marginRight="16"
        >
          <Column fillWidth gap="8">
            <Heading variant="display-strong-s">Blog</Heading>
          </Column>
          <Column gap="m">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Row
                  gap="m"
                  fillWidth
                  paddingY="s"
                  style={{ cursor: "pointer" }}
                >
                  <Column gap="4" fillWidth>
                    <Heading variant="heading-strong-m">
                      {post.metadata.title}
                    </Heading>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {new Date(post.metadata.date).toLocaleDateString()}
                    </Text>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-medium"
                    >
                      {post.metadata.summary}
                    </Text>
                  </Column>
                  {post.metadata.image && (
                    <img
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      style={{
                        width: "80px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Row>
              </Link>
            ))}
          </Column>
        </Column>
      </Row>

      <Column
        gap="16"
        maxWidth={layout.sideNav.width}
        m={{ hide: true }}
        position="sticky"
        top="80"
        overflow="auto"
        style={{ height: "calc(100vh - var(--static-space-80))" }}
      >
        {/* Could include a "Categories" or "On this page" section */}
      </Column>
    </Row>
  );
}
