"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
}

export default function SEO({
  title = "TechNova AI | Soluciones de IA para Retail Hispano",
  description = "Transformamos negocios del sector retail hispano con inteligencia artificial, automatización, chatbots, marketing digital, blockchain y ciberseguridad.",
  keywords = "inteligencia artificial, IA, chatbots, marketing digital, ciberseguridad, blockchain, retail hispano, tecnología, automatización",
  ogImage = "/images/ai-smart-og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}: SEOProps) {
  const router = useRouter()
  const canonicalUrl = `https://aismarttech.com${router.asPath === "/" ? "" : router.asPath}`

  return (
    <Head>
      {/* Metaetiquetas básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Metaetiquetas adicionales */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}
