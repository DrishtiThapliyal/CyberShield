import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  variant?: 'default' | 'gold'
}

export function Progress({ value, max = 100, className = '', showLabel = false, variant = 'default' }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-2 bg-gray-100 dark:bg-dark-elevated rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${variant === 'gold' ? 'bg-gold-500' : 'bg-blue-600 dark:bg-gold-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-text-muted text-right">{Math.round(percentage)}%</p>
      )}
    </div>
  )
}
