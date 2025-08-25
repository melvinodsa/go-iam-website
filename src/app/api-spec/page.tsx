import { notFound } from "next/navigation";
import { getPages } from "@/app/utils/utils";
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources/once-ui.config";

import { ApiReferenceReact } from '@scalar/api-reference-react'

import '@scalar/api-reference-react/style.css'
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

  return Meta.generate({
    title: 'GO IAM API Documentation',
    description: 'API Documentation for GO IAM',
    baseURL,
    path: `/api-spec`,
    type: "article",
    publishedTime: '2025-08-25',
    image: '/images/og/home.png',
  });
}

export default async function Docs() {
  const slugPath = 'get-started';

  let doc = getPages().find((doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }

  return (
    <body>
      <ApiReferenceReact
        configuration={{
          url: '/goiam.yaml',
        }}
      /></body>
  );
}