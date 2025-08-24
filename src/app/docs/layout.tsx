import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import React from "react";

import classNames from "classnames";

import { baseURL, meta, fonts, effects, style, dataStyle, layout } from "@/resources/once-ui.config";
import { Meta, Schema, Column, Flex, opacity, SpacingToken, Background, Row, HeadingNav, Icon } from "@once-ui-system/core";
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import getNavigation from '../utils/getNavigation';

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
  const navigationItems = getNavigation();
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      direction='column'
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
              theme: style.theme,
              brand: style.brand,
              accent: style.accent,
              neutral: style.neutral,
              solid: style.solid,
              'solid-style': style.solidStyle,
              border: style.border,
              surface: style.surface,
              transition: style.transition,
              scaling: style.scaling,
              'viz-style': dataStyle.variant,
            })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme or use config default
                  const savedTheme = localStorage.getItem('data-theme');
                  // Only override with system preference if explicitly set to 'system'
                  const resolvedTheme = savedTheme ? resolveTheme(savedTheme) : config.theme === 'system' ? resolveTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : config.theme;
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth margin="0" padding="0">
          <Navbar navigationItems={navigationItems} />
          <Row marginTop="64" style={{ height: "calc(100vh - var(--static-space-64) - var(--static-space-12) - (var(--responsive-space-m)*3))" }} horizontal="start">
            <Sidebar
              maxWidth={100}
              style={{ height: "calc(100vh - var(--static-space-64)*2)", borderTop: "0", borderRight: "0" }}
              padding="8"
              marginLeft='128'
              s={{ style: { marginLeft: '0' } }}
              top="64"
              zIndex={9}
              initialNavigation={navigationItems}
            />
            {children}
          </Row>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
