import Link from "next/link";
import { getBlogPosts } from "@/app/utils/blog";
import { Heading, Text, Column, Row, HeadingNav, Icon } from "@once-ui-system/core";
import { layout } from "@/resources/once-ui.config";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Row>
      <Row>
        <Column
          as="main"
          maxWidth={layout.bloglist.width}
          minWidth={layout.bloglist.minWidth}
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
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <Row
                    gap="m"
                    fillWidth
                    paddingY="s"
                    style={{ cursor: "pointer" }}
                  >
                    <Column gap="4" fillWidth>
                      <Heading as="h2" variant="heading-strong-m">
                        {post.metadata.title}
                      </Heading>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
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
                        loading="lazy"
                      />
                    )}
                  </Row>
                </Link>
              </article>
            ))}
          </Column>
        </Column>
      </Row>
    </Row>
  );
}
