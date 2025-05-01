import type React from "react"
import type { Metadata } from "next"
import { Exo_2 } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import FuturisticBackground3D from "@/components/futuristic-background-3d"
import LiveChat from "@/components/live-chat"
import CookieConsent from "@/components/cookie-consent"
import PerformanceOptimization from "@/components/performance-optimization"
import Analytics from "@/components/analytics"
import { Suspense } from "react"
import Script from "next/script"
import Head from "next/head"

// Importar los componentes sociales individualmente
import { SocialButtonsColumn } from "@/components/social-buttons"
import { FloatingSocialButton } from "@/components/social-buttons"

// Importar los estilos CSS directamente
import "@/components/navigation.css"
import "@/components/social-buttons.css"
import "@/components/hero.css"

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TechNova AI | Soluciones de IA para Retail Hispano",
  description:
    "Transformamos negocios del sector retail hispano con inteligencia artificial, automatización, chatbots, marketing digital, blockchain y ciberseguridad.",
  keywords: "inteligencia artificial, IA, chatbots, marketing digital, ciberseguridad, blockchain, retail hispano",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        {/* Noscript para Meta Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=980549257589348&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </Head>
      <body className={`${exo2.variable} font-exo2`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            {/* Fondo futurista 3D */}
            <FuturisticBackground3D />

            {/* Componentes de redes sociales */}
            <Suspense fallback={null}>
              <SocialButtonsColumn />
              <FloatingSocialButton />
            </Suspense>

            {/* Componentes de accesibilidad y soporte */}
            <LiveChat />
            <CookieConsent />

            {/* Componentes de optimización y análisis */}
            <PerformanceOptimization />
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>

            {children}
          </LanguageProvider>
        </ThemeProvider>

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '980549257589348');
              fbq('track', 'PageView');
            `,
          }}
        />
      </body>
    </html>
  )
}
