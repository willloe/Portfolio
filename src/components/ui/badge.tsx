import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
      },
      // NEW: soft color tints for pills
      tone: {
        none: '',
        blue: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
        green: 'bg-green-500/15 text-green-300 border-green-400/30',
        purple: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
        orange: 'bg-orange-500/15 text-orange-300 border-orange-400/30',
        emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      },
    },
    defaultVariants: {
      variant: 'default',
      tone: 'none',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, tone }), className)} {...props} />
}

export { badgeVariants }
