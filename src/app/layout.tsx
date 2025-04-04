import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import './global.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import IMG from '../../public/images/slmgm.jpg'

const inter = Inter({ subsets: ['latin'] })

const meta = {
  title: 'Emunah',
  description: 'Conteúdo Católico',
  image: IMG.src,
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : WEBSITE_HOST_URL,
  ),
  title: {
    default: meta.title,
    template: '%s | Emunah',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'pt-BR',
    type: 'website',
    images: meta.image,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={cn('flex min-h-[100svh] flex-col gap-4', inter.className)}
      >
        <ThemeProvider attribute="class" defaultTheme="">
          <header className="sticky top-0 z-10 border-b bg-background">
            <Container>
              <div className="flex items-center justify-between py-4">
                <Navigation />
                <ThemeSwitch />
              </div>
            </Container>
          </header>
          <main className="flex-1">
            <Container>{children}</Container>
          </main>
          <footer className="pb-6 pt-6">
            <Container>
              <p className="text-center">
                ©Emunah {new Date().getFullYear()}. Alguns direitos reservados
              </p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
