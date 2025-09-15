import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'
import { Toaster } from '@/components/ui/toaster'
import { CursorTrail } from '@/components/effects/cursor-trail'
import { ThemeProvider } from '@/lib/theme'

export function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer
          profile={{
            name: 'William C. Loe',
            socials: [
              {
                type: 'github',
                url: 'https://github.com/willloe',
                label: 'GitHub',
              },
              {
                type: 'linkedin',
                url: 'https://www.linkedin.com/in/william-loe',
                label: 'LinkedIn',
              },
              {
                type: 'email',
                url: 'mailto:williamloe2000@gmail.com',
                label: 'Email',
              },
            ],
          }}
        />
        <Toaster />
        <CursorTrail />
      </div>
    </ThemeProvider>
  )
}
