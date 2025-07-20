import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-mallconnect hover:bg-primary/90 hover:shadow-mallconnect-lg active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-mallconnect hover:bg-destructive/90 hover:shadow-mallconnect-lg active:scale-95",
        outline:
          "border-2 border-input bg-background shadow-mallconnect hover:bg-accent hover:text-accent-foreground hover:shadow-mallconnect-lg active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-mallconnect hover:bg-secondary/80 hover:shadow-mallconnect-lg active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
        promotional: "bg-[hsl(var(--promotional))] text-[hsl(var(--promotional-foreground))] shadow-mallconnect hover:bg-[hsl(var(--promotional))]/90 hover:shadow-mallconnect-lg active:scale-95",
        success: "bg-green-500 text-white shadow-mallconnect hover:bg-green-600 hover:shadow-mallconnect-lg active:scale-95",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-10 text-base",
        xl: "h-14 rounded-xl px-12 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
