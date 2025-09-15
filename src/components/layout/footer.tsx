import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/lib/motion'

interface FooterProps {
  profile: {
    name: string
    socials: Array<{
      type: string
      url: string
      label: string
    }>
  }
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  website: ExternalLink,
  x: ExternalLink,
  dribbble: ExternalLink,
  behance: ExternalLink,
}

export function Footer({ profile }: FooterProps) {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="border-t border-border/50 bg-muted/30"
    >
      <div className="container-custom">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {/* Brand */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                {profile.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Full-stack developer passionate about creating digital
                experiences that matter.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </h4>
              <nav className="space-y-2">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Contact', href: '#contact' },
                ].map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Connect
              </h4>
              <div className="flex space-x-4">
                {profile.socials.map(social => {
                  const Icon =
                    socialIcons[social.type as keyof typeof socialIcons] ||
                    ExternalLink
                  return (
                    <Button
                      key={social.type}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-10 w-10"
                      aria-label={social.label}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-border/50 pt-8 md:flex-row md:space-y-0"
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a
                href="/privacy"
                className="transition-colors hover:text-primary"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="transition-colors hover:text-primary">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
