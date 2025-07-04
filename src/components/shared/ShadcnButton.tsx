import * as React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-neutral-50 shadow-sm hover:bg-neutral-800 focus:bg-neutral-800',
        destructive:
          'bg-red-500 text-neutral-50 shadow-xs hover:bg-red-600 focus:bg-red-600',
        outline:
          'border border-neutral-200 bg-white shadow-xs hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-xs hover:bg-neutral-200 focus:bg-neutral-200',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900',
        link: 'text-neutral-900 underline-offset-4 hover:underline focus:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ShadcnButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ShadcnButton.displayName = 'ShadcnButton'

export { buttonVariants, ShadcnButton }
