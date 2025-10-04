"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Row,
  Badge,
  Logo,
  LetterFx,
  Icon,
  Flex,
  Media,
  GlitchFx,
} from "@once-ui-system/core";
import { social } from "@/resources/once-ui.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DataContext } from "./data";
import { useContext } from "react";

export default function Home() {
  const { navigationItems } = useContext(DataContext);
  return (
    <Column fillWidth style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <Navbar navigationItems={navigationItems} />

      {/* Hero Section */}
      <Column
        fillWidth
        center
        padding="xl"
        style={{ minHeight: "100vh", paddingTop: "120px" }}
      >
        <Column maxWidth="xl" horizontal="center" gap="xl" align="center">
          <Badge
            textVariant="code-default-s"
            border="brand-alpha-medium"
            onBackground="brand-medium"
            vertical="center"
            gap="16"
          >
            <Icon name="shield" size="xs" />
            <Text marginX="4">
              <LetterFx trigger="instant">Open Source IAM Platform</LetterFx>
            </Text>
            <a href="https://awesome-go.com/authentication-and-authorization/" target="_blank" rel="noopener noreferrer">
              <img alt="Mentioned in Awesome Go" src="https://awesome.re/mentioned-badge.svg"></img>
            </a>
          </Badge>

          <Row>
            <GlitchFx fillWidth speed="medium">
              <Row maxWidth={18} height={18}>
                <Media
                  radius="l"
                  src="/images/og/home.png"
                />
              </Row>
            </GlitchFx>
          </Row>



          <Heading
            variant="display-strong-xl"
            marginTop="24"
            align="center"
          >
            Modern Identity & Access Management
            <br />
            <Text onBackground="brand-strong">Built for Developers</Text>
          </Heading>

          <Column maxWidth="l">
            <Text
              variant="heading-default-xl"
              onBackground="neutral-weak"
              wrap="balance"
              align="center"
              marginBottom="32"
            >
              API-first, developer-centric IAM platform built in Go.
              Secure, scalable, and designed for modern applications.
            </Text>
          </Column>

          <Row gap="m" wrap style={{ display: "flex", justifyContent: "center" }}>
            <Button
              href={social.docs}
              data-border="rounded"
              weight="strong"
              prefixIcon="book"
              arrowIcon
              size="l"
            >
              Get Started
            </Button>
            <Button
              href={`/blog/why-go-iam`}
              variant="secondary"
              data-border="rounded"
              prefixIcon="blog"
              size="l"
              target="_blank"
            >
              Why Go IAM
            </Button>
            <Button
              href={social.github}
              variant="secondary"
              data-border="rounded"
              prefixIcon="github"
              size="l"
              target="_blank"
            >
              View on GitHub
            </Button>
            <Button
              href="https://www.onlydust.com/repositories/melvinodsa/go-iam"
              variant="tertiary"
              data-border="rounded"
              prefixIcon="users"
              weight="strong"
              size="l"
              target="_blank"
            >
              Contribute on OnlyDust
            </Button>
          </Row>
        </Column>
      </Column>

      {/* Performance Benchmarks Section */}
      <Column fillWidth padding="xl" horizontal="center" gap="xl" align="center">
        <Column maxWidth="xl" fillWidth gap="xl" vertical="center">
          <Column gap="m" align="center" horizontal="center">
            <Heading variant="display-default-l" align="center">
              <Text onBackground="brand-strong">Lightning Fast</Text> Performance
            </Heading>
            <Text
              variant="heading-default-m"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
            >
              Benchmarked with Vegeta load testing tool
            </Text>
          </Column>

          <Row gap="l" wrap style={{ display: "flex", justifyContent: "center" }}>
            <Column
              maxWidth="xs"
              gap="s"
              padding="l"
              background="neutral-weak"
              radius="l"
              border="neutral-alpha-weak"
              align="center"
            >
              <Text variant="display-strong-s" onBackground="brand-strong">1K</Text>
              <Text variant="label-default-s" onBackground="neutral-medium">RPS</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                Requests per second
              </Text>
            </Column>

            <Column
              maxWidth="xs"
              gap="s"
              padding="l"
              background="neutral-weak"
              radius="l"
              border="neutral-alpha-weak"
              align="center"
            >
              <Text variant="display-strong-s" onBackground="brand-strong">1.7ms</Text>
              <Text variant="label-default-s" onBackground="neutral-medium">P50 Latency</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                Median response time
              </Text>
            </Column>

            <Column
              maxWidth="xs"
              gap="s"
              padding="l"
              background="neutral-weak"
              radius="l"
              border="neutral-alpha-weak"
              align="center"
            >
              <Text variant="display-strong-s" onBackground="brand-strong">100%</Text>
              <Text variant="label-default-s" onBackground="neutral-medium">Success Rate</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                30K requests
              </Text>
            </Column>

            <Column
              maxWidth="xs"
              gap="s"
              padding="l"
              background="neutral-weak"
              radius="l"
              border="neutral-alpha-weak"
              align="center"
            >
              <Text variant="display-strong-s" onBackground="brand-strong">2.6ms</Text>
              <Text variant="label-default-s" onBackground="neutral-medium">P90 Latency</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                90th percentile
              </Text>
            </Column>
          </Row>

          <Column
            gap="m"
            padding="xl"
            background="page"
            radius="l"
            wrap
          >
            <Row gap="m" align="center">
              <Icon name="chartBar" size="m" onBackground="brand-strong" />
              <Heading variant="heading-strong-m">Load Test Results</Heading>
            </Row>

            <Column fillWidth gap="s" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              <Row gap="m" wrap>
                <Text variant="body-default-s" style={{ fontFamily: 'monospace' }}>
                  Requests: <strong>30,000 total</strong> | Rate: <strong>1,000/sec</strong>
                </Text>
              </Row>
              <Row gap="m" wrap>
                <Text variant="body-default-s" style={{ fontFamily: 'monospace' }}>
                  Duration: <strong>30.0s</strong> | Success: <strong>100%</strong>
                </Text>
              </Row>
              <Row gap="m" wrap>
                <Text variant="body-default-s" style={{ fontFamily: 'monospace' }}>
                  Latencies: min <strong>1.0ms</strong> | mean <strong>2.0ms</strong> | max <strong>56.6ms</strong>
                </Text>
              </Row>
            </Column>

            <Text variant="body-default-s" onBackground="neutral-weak">
              * Tested with Vegeta load testing tool on minimum(1GB, 2CPU) hardware configuration
            </Text>
          </Column>
        </Column>
      </Column>

      {/* Features Section */}
      <Column fillWidth padding="xl" background="neutral-weak" horizontal="center" gap="xl" align="center">
        <Column maxWidth="xl" fillWidth gap="xl">
          <Column gap="m" align="center">
            <Heading variant="display-default-l" align="center">
              Why Choose Go IAM?
            </Heading>
            <Column fillWidth>
              <Text
                variant="heading-default-m"
                onBackground="neutral-weak"
                align="center"
              >
                Built with modern development practices and enterprise security in mind
              </Text>
            </Column>
          </Column>

          <Row gap="l" wrap style={{ display: "flex", justifyContent: "center" }}>
            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="code" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">API-First Design</Heading>
              <Text onBackground="neutral-weak">
                RESTful APIs with comprehensive OpenAPI documentation.
                Easy integration with any application or service.
              </Text>
            </Column>

            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="zap" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">High Performance</Heading>
              <Text onBackground="neutral-weak">
                Built in Go for superior performance and low resource usage.
                Handle thousands of authentication requests per second.
              </Text>
            </Column>

            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="shield" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">Enterprise Security</Heading>
              <Text onBackground="neutral-weak">
                JWT tokens, and role-based access control.
                Security best practices built-in.
              </Text>
            </Column>

            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="layers" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">Developer Friendly</Heading>
              <Text onBackground="neutral-weak">
                Clean configuration, comprehensive docs, and SDKs for popular languages.
                Get up and running in minutes.
              </Text>
            </Column>

            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="deployment" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">Easy Deployment</Heading>
              <Text onBackground="neutral-weak">
                Single binary deployment, Docker support, and cloud-native design.
                Deploy anywhere with minimal setup.
              </Text>
            </Column>

            <Column
              maxWidth="s"
              gap="m"
              padding="l"
              background="page"
              radius="l"
              border="neutral-alpha-weak"
            >
              <Icon name="github" size="l" onBackground="brand-strong" />
              <Heading variant="heading-strong-l">Open Source</Heading>
              <Text onBackground="neutral-weak">
                Fully open source with active community.
                No vendor lock-in, full transparency and customization.
              </Text>
            </Column>
          </Row>
        </Column>
      </Column>

      {/* CTA Section */}
      <Column fillWidth center padding="xl">
        <Column maxWidth="l" gap="l" align="center">
          <Heading variant="display-default-l" align="center">
            Ready to Secure Your Applications?
          </Heading>
          <Text
            variant="heading-default-m"
            onBackground="neutral-weak"
            align="center"
          >
            Join developers who trust Go IAM for their identity and access management needs
          </Text>
          <Row gap="m" wrap style={{ display: "flex", justifyContent: "center" }}>
            <Button
              href={social.docs}
              data-border="rounded"
              weight="strong"
              prefixIcon="book"
              arrowIcon
              size="l"
            >
              Read Documentation
            </Button>
          </Row>
        </Column>
      </Column>

      {/* Footer */}
      <Footer />
    </Column>
  );
}
