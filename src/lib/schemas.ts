import { z } from 'zod'

// Profile schema
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  headline: z.string().min(1, 'Headline is required'),
  summary: z.string().min(1, 'Summary is required'),
  avatar: z.string().url().optional(),
  resume: z.string().url().optional(),
  socials: z.array(
    z.object({
      type: z.enum([
        'github',
        'linkedin',
        'x',
        'email',
        'website',
        'dribbble',
        'behance',
      ]),
      url: z.string().url('Invalid URL'),
      label: z.string().optional(),
    })
  ),
})

// Project schema
export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(1, 'Description is required'),
  tech: z.array(z.string()).min(1, 'At least one technology is required'),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
  links: z.object({
    demo: z.string().url().optional(),
    repo: z.string().url().optional(),
    caseStudy: z.string().url().optional(),
    paper: z.string().url().optional(),
  }),
  images: z.array(z.string().url()).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

// Experience schema
export const experienceSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  type: z.enum(['work', 'education', 'volunteer', 'freelance']).default('work'),
})

// Skill schema
export const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Skill name is required'),
      level: z
        .enum(['beginner', 'intermediate', 'advanced', 'expert'])
        .optional(),
      years: z.number().min(0).optional(),
      description: z.string().optional(),
    })
  ),
})

// Testimonial schema
export const testimonialSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().optional(),
  quote: z.string().min(1, 'Quote is required'),
  avatar: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional(),
  date: z.string().optional(),
})

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
  budget: z
    .enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k+', 'not-sure'])
    .optional(),
  timeline: z
    .enum([
      'asap',
      '1-month',
      '2-3-months',
      '3-6-months',
      '6-months+',
      'flexible',
    ])
    .optional(),
})

// Blog post schema (optional)
export const blogPostSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  publishedAt: z.string().min(1, 'Published date is required'),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  coverImage: z.string().url().optional(),
  readTime: z.number().min(1).optional(),
})

// Type exports
export type Profile = z.infer<typeof profileSchema>
export type Project = z.infer<typeof projectSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Skill = z.infer<typeof skillSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
export type ContactForm = z.infer<typeof contactFormSchema>
export type BlogPost = z.infer<typeof blogPostSchema>

// Validation functions
export function validateProfile(data: unknown): Profile {
  return profileSchema.parse(data)
}

export function validateProject(data: unknown): Project {
  return projectSchema.parse(data)
}

export function validateExperience(data: unknown): Experience {
  return experienceSchema.parse(data)
}

export function validateSkill(data: unknown): Skill {
  return skillSchema.parse(data)
}

export function validateTestimonial(data: unknown): Testimonial {
  return testimonialSchema.parse(data)
}

export function validateContactForm(data: unknown): ContactForm {
  return contactFormSchema.parse(data)
}

export function validateBlogPost(data: unknown): BlogPost {
  return blogPostSchema.parse(data)
}
