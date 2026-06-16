import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAssessment } from '../../contexts/AssessmentContext'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/assessments', label: 'Assessments' },
  { path: '/password-lab', label: 'Password Lab' },
  { path: '/report', label: 'Your Report' }
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { getTotalScore, results } = useAssessment()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-dark-border bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-gold-500 dark:to-gold-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white dark:text-dark-bg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                CyberShield Academy
              </h1>
              <p className="text-xs text-gray-500 dark:text-dark-text-muted -mt-0.5">
                Security Education Platform
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-100 dark:bg-dark-elevated text-gray-900 dark:text-dark-text-primary'
                    : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-surface'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {results.completedAssessments.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-dark-surface">
                <span className="text-sm text-gray-600 dark:text-dark-text-muted">Score:</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-gold-400">
                  {getTotalScore()}%
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-elevated transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-gold-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-elevated transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-dark-text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-dark-text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-dark-border"
          >
            <nav className="px-4 py-4 space-y-2 bg-white dark:bg-dark-surface">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 dark:bg-gold-500/10 text-blue-600 dark:text-gold-400'
                      : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-elevated'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
