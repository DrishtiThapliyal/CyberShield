import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', variant = 'default', padding = 'md', ...props }, ref) => {
    const baseStyles = 'rounded-2xl border transition-all duration-200'

    const variants = {
      default: 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border shadow-card dark:shadow-card-dark',
      elevated: 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border shadow-elevated',
      interactive: 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border shadow-card dark:shadow-card-dark hover:shadow-elevated hover:border-gray-300 dark:hover:border-dark-elevated cursor-pointer'
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
