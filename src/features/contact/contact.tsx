import { ContactForm } from './contact-form'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Profile } from '@/lib/schemas'

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  return (
    <Section
      id="contact"
      title="Get In Touch"
      description="Ready to work together? Let's discuss your next project"
      padding="lg"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <Container size="lg">
        <ContactForm profile={profile} />
      </Container>
    </Section>
  )
}
