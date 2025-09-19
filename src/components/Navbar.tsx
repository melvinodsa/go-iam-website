"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Fade, Flex, Logo, NavIcon, Row, Kbar, useTheme, Column } from "@once-ui-system/core";
import { layout, routes, social } from "@/resources/once-ui.config";
import { NavigationItem } from "./Sidebar";

function Navbar({ navigationItems }: { navigationItems: NavigationItem[] }) {
    const [isMac, setIsMac] = useState(false);
    const pathname = usePathname();
    const isDocsPage = pathname.startsWith('/docs');

    useEffect(() => {
        setIsMac(navigator.userAgent.toLowerCase().indexOf('mac') !== -1);
    }, []);


    // Function to convert navigation items to Kbar items recursively
    const convertToKbarItems = (items: NavigationItem[]) => {
        const kbarItems: any[] = [];

        items.forEach((item) => {
            if (item.children) {
                // This is a section/category
                // Add children items with this section name
                const childItems = convertToKbarItems(item.children);
                childItems.forEach(child => {
                    child.section = item.title;
                });
                kbarItems.push(...childItems);
            } else {
                const correctedSlug = item.slug.replace(/^src\\content\\/, '').replace(/\\/g, '/');

                const defaultKeywords = `${item.title.toLowerCase()}, docs, documentation`;
                const keywords = item.keywords || defaultKeywords;

                kbarItems.push({
                    id: correctedSlug,
                    name: item.label || item.title,
                    section: "Documentation",
                    shortcut: [],
                    keywords: keywords,
                    href: `/docs/${correctedSlug}`,
                    icon: item.navIcon || "book",
                });
            }
        });

        return kbarItems;
    };

    const docsItems = convertToKbarItems(navigationItems);
    const { theme, setTheme } = useTheme();

    const navigationKbarItems = [
        {
            id: "home",
            name: "Home",
            section: "Navigation",
            shortcut: [],
            keywords: "home, landing page",
            href: "/",
            icon: "home",
        }
    ];

    // if (routes['/changelog']) {
    //     navigationKbarItems.push({
    //         id: "changelog",
    //         name: "Changelog",
    //         section: "Navigation",
    //         shortcut: [],
    //         keywords: "changelog, changelog page",
    //         href: "/changelog",
    //         icon: "changelog",
    //     });
    // }

    // if (routes['/roadmap']) {
    //     navigationKbarItems.push({
    //         id: "roadmap",
    //         name: "Roadmap",
    //         section: "Navigation",
    //         shortcut: [],
    //         keywords: "roadmap, roadmap page",
    //         href: "/roadmap",
    //         icon: "roadmap",
    //     });
    // }

    const kbar = [
        ...navigationKbarItems,
        ...docsItems,
        {
            id: "theme-toggle",
            name: theme === 'dark' ? "Light mode" : "Dark mode",
            section: "Theme",
            shortcut: [],
            keywords: "light mode, dark mode, theme, toggle, switch, appearance",
            perform: () => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            },
            icon: theme === 'dark' ? "light" : "dark",
        },
    ];



    return (
        <>
            <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" paddingY="12" paddingX="l">
                <Column maxWidth={layout.header.width} vertical="center" horizontal="between" gap="l" style={{
                    position: "fixed",
                    top: '20px',
                    zIndex: 1000,
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Row fillWidth vertical="center" horizontal="center" gap="8">
                        <Logo className="dark-flex" wordmark="/trademarks/wordmark-dark.svg" size="s" href="/" />
                        <Logo className="light-flex" wordmark="/trademarks/wordmark-light.svg" size="s" href="/" />
                    </Row>
                    {isDocsPage && <Kbar items={kbar} radius="full" background="neutral-alpha-weak">
                        <Button data-border="rounded" size="s" variant="tertiary" weight="default">
                            <Row vertical="center" gap="16" style={{ marginLeft: '-0.5rem' }} paddingRight="8">
                                <Row background="neutral-alpha-medium" paddingX="8" paddingY="4" radius="full" data-scaling="90" textVariant="body-default-xs" onBackground="neutral-medium">{isMac ? 'Cmd' : 'Ctrl'} k</Row>
                                Search docs...
                            </Row>
                        </Button>
                    </Kbar>}
                    <Row gap="m" style={{ display: "flex", alignItems: "center" }}>
                        <Button
                            href={social.docs}
                            prefixIcon="book"
                            variant="secondary"
                            size="s"
                        >
                            Docs
                        </Button>
                        <Button
                            href={social.reddit}
                            variant="tertiary"
                            size="s"
                            prefixIcon="reddit"
                            target="_blank"
                        >
                            Reddit Community
                        </Button>
                        <Button
                            href={social.github}
                            variant="tertiary"
                            size="s"
                            prefixIcon="github"
                            target="_blank"
                        >
                            GitHub
                        </Button>
                    </Row>
                </Column>
            </Flex>
        </>
    );
};


export default Navbar;