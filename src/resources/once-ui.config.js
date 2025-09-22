// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://go-iam.com";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Go IAM - Modern Identity & Access Management",
    description:
      "API-first, developer-centric Identity and Access Management system built in Go for modern applications. Open source, secure, and scalable.",
    image: "/images/og/home.jpg",
    canonical: baseURL,
    robots: "index,follow",
    alternates: [{ href: baseURL, hrefLang: "en" }],
  },
  docs: {
    path: "/docs",
    title: "Go IAM Documentation - Getting Started",
    description:
      "Comprehensive documentation for Go IAM. Learn how to integrate secure identity and access management into your applications.",
    image: "/images/og/docs.jpg",
    canonical: `${baseURL}/docs`,
    navIcon: "book",
    robots: "index,follow",
    alternates: [{ href: `${baseURL}/docs`, hrefLang: "en" }],
  },
  // roadmap: {
  //   path: "/roadmap",
  //   title: "Go IAM Roadmap",
  //   description:
  //     "Explore the future development plans for Go IAM, including upcoming features and improvements.",
  //   image: "/images/og/roadmap.jpg",
  //   canonical: `${baseURL}/roadmap`,
  //   robots: "index,follow",
  //   alternates: [{ href: `${baseURL}/roadmap`, hrefLang: "en" }],
  // },
};

// default schema data
const schema = {
  logo: "",
  type: "Organization",
  name: "Go IAM",
  description: meta.home.description,
  email: "contact@go-iam.com",
  locale: "en_US",
};

// social links
const social = {
  github: "https://github.com/melvinodsa/go-iam",
  reddit: "https://www.reddit.com/r/GoIAM/",
  docs: `${baseURL}/docs`,
  blog: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
};

const layout = {
  // units are set in REM
  header: {
    width: 200, // max-width of the content inside the header
  },
  body: {
    width: 200, // max-width of the body
  },
  sidebar: {
    width: 17, // width of the sidebar
    collapsible: false, // accordion or static render
  },
  content: {
    width: 60, // width of the main content block
    minWidth: 42,
  },
  blog_content: {
    width: 60, // width of the main content block
    minWidth: 60,
  },
  sideNav: {
    width: 17, // width of the sideNav on document pages
  },
  footer: {
    width: 44, // width of the content inside the footer
  },
  leftSidebar: {
    width: 44, // width of the left sidebar
    collapsible: false, // accordion or static render
  },
};

const routes = {
  "/changelog": true,
  "/roadmap": true,
};

export {
  baseURL,
  fonts,
  style,
  meta,
  schema,
  social,
  effects,
  dataStyle,
  layout,
  routes,
};
