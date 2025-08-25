import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from "react";

import classNames from "classnames";

import { baseURL, meta, fonts, effects, style, dataStyle, layout } from "@/resources/once-ui.config";
import { Meta, Schema, Column, Flex, opacity, SpacingToken, Background, Row, HeadingNav, Icon } from "@once-ui-system/core";
import { Providers } from '@/components/Providers';

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      lang="en"
      as="html"
      fillWidth
      direction='column'
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <Providers>
        <Analytics />
        <SpeedInsights />
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={meta.home.title}
          description={meta.home.description}
          path={meta.home.path}
        />
        {children}
      </Providers>
    </Flex>
  );
}
