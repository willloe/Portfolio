import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { navSlide, mobileMenu } from '@/lib/motion'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  // { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    )
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navSlide}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-morphism-dark border-b border-cyan-400/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Futuristic Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <motion.button
              onClick={() => scrollToSection('#home')}
              className="group relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="gradient-text-cyber text-2xl font-black">WL</div>
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 blur-sm group-hover:opacity-20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.button>
          </motion.div>

          {/* Futuristic Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative rounded-lg px-4 py-2 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10 font-medium text-cyan-400 transition-colors duration-200 hover:text-white">
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    layoutId="nav-bg"
                  />
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenu}
              className="md:hidden"
            >
              <div className="space-y-1 border-t border-border/50 bg-background/95 px-2 pb-3 pt-2 backdrop-blur-md">
                {navigation.map(item => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="border-t border-border/50 pt-4">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    {getThemeIcon()}
                    <span className="ml-2">
                      {theme === 'system'
                        ? 'System'
                        : theme === 'dark'
                          ? 'Dark'
                          : 'Light'}
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
