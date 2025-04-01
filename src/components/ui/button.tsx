import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group uppercase tracking-wider',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500 border border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow active:scale-[0.98] border border-primary/10',
        outline: 'border border-primary/30 bg-transparent text-primary shadow-sm hover:bg-primary/5 hover:border-primary/50 hover:shadow active:scale-[0.98]',
        ghost: 'text-primary hover:bg-primary/5 hover:text-primary active:scale-[0.98]',
      },
      size: {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };