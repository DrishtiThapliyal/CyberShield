import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <footer className="border-t border-gray-200 dark:border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-dark-text-muted">
              CyberShield Academy - Your journey to cybersecurity awareness
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-dark-text-muted">
              <a href="#" className="hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
