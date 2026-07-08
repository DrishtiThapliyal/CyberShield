import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 dark:bg-dark-elevated text-gray-700 dark:text-dark-text-secondary',
    success: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    gold: 'bg-gold-500/10 text-gold-600 dark:text-gold-400'
  }

  return (
    <motion.span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}

interface StatusIndicatorProps {
  status: 'success' | 'error' | 'warning' | 'neutral'
  text?: string
}

export function StatusIndicator({ status, text }: StatusIndicatorProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    neutral: <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-dark-text-muted" />
  }

  const colors = {
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    neutral: 'text-gray-500 dark:text-dark-text-muted'
  }

  return (
    <div className="flex items-center gap-2">
      {icons[status]}
      {text && <span className={`text-sm ${colors[status]}`}>{text}</span>}
    </div>
  )
}
