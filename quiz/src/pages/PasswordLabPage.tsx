import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Check, AlertCircle, Shield, Eye, EyeOff } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAssessment } from '../contexts/AssessmentContext'

interface Requirement {
  id: string
  text: string
  test: (password: string) => boolean
  met: boolean
}

const initialRequirements: Requirement[] = [
  {
    id: 'uppercase',
    text: 'Your password must contain at least one uppercase letter.',
    test: (p) => /[A-Z]/.test(p),
    met: false
  },
  {
    id: 'special',
    text: 'Your password must include at least one special character (! @ # etc.).',
    test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p),
    met: false
  },
  {
    id: 'length',
    text: 'Your password must be at least 8 characters long.',
    test: (p) => p.length >= 8,
    met: false
  },
  {
    id: 'golden',
    text: 'Your password must include the golden ratio constant (1.618) to match our premium theme.',
    test: (p) => p.includes('1.618'),
    met: false
  }
]

export function PasswordLabPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [requirements, setRequirements] = useState(initialRequirements)
  const [strength, setStrength] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { updatePasswordStrength, markAssessmentComplete } = useAssessment()

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.test(password)
    }))
    setRequirements(updatedRequirements)

    const metCount = updatedRequirements.filter(r => r.met).length
    const baseStrength = (metCount / requirements.length) * 60

    let bonusStrength = 0
    if (password.length > 12) bonusStrength += 10
    if (/[0-9]/.test(password)) bonusStrength += 10
    if (password.length > 16) bonusStrength += 10
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) bonusStrength += 10

    const totalStrength = Math.min(100, baseStrength + bonusStrength)
    setStrength(totalStrength)
  }, [password])

  const handleSubmit = () => {
    if (strength >= 60) {
      updatePasswordStrength(strength)
      markAssessmentComplete('password-lab')
      setHasSubmitted(true)
    }
  }

  const getStrengthColor = () => {
    if (strength < 30) return 'text-red-500'
    if (strength < 60) return 'text-amber-500'
    if (strength < 80) return 'text-blue-500 dark:text-gold-500'
    return 'text-emerald-500'
  }

  const getStrengthLabel = () => {
    if (strength < 30) return 'Weak'
    if (strength < 60) return 'Fair'
    if (strength < 80) return 'Good'
    return 'Strong'
  }

  const allRequirementsMet = requirements.every(r => r.met)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-gold-500/10 text-blue-600 dark:text-gold-400 text-sm font-medium mb-4">
            <Key className="w-4 h-4" />
            Interactive Lab
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Password Strength Lab
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Learn what makes a password secure by experimenting in a safe environment.
            Test different combinations and see instant feedback.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="lg">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">
                  Enter a password to test
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password here..."
                    className="w-full px-4 py-4 pr-12 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gold-500 focus:border-transparent text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-muted transition-all duration-200 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-dark-text-secondary transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                    Strength
                  </span>
                  <span className={`text-sm font-semibold ${getStrengthColor()}`}>
                    {getStrengthLabel()} - {Math.round(strength)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-dark-elevated rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      strength < 30
                        ? 'bg-red-500'
                        : strength < 60
                        ? 'bg-amber-500'
                        : strength < 80
                        ? 'bg-blue-500 dark:bg-gold-500'
                        : 'bg-emerald-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${strength}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence>
                {hasSubmitted && allRequirementsMet && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="font-medium text-emerald-700 dark:text-emerald-400">
                          Great job!
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-500">
                          You've created a strong password that meets all requirements.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleSubmit}
                disabled={!allRequirementsMet}
                className="w-full gap-2"
              >
                <Shield className="w-4 h-4" />
                Submit Password
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card padding="lg" className="h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-gold-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                Password Requirements
              </h2>
            </div>

            <div className="space-y-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    req.met
                      ? 'bg-emerald-50 dark:bg-emerald-900/10'
                      : password.length > 0
                      ? 'bg-gray-50 dark:bg-dark-elevated'
                      : 'bg-gray-50 dark:bg-dark-surface'
                  }`}
                >
                  <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    req.met
                      ? 'bg-emerald-500'
                      : password.length > 0
                      ? 'bg-gray-300 dark:bg-dark-text-muted'
                      : 'bg-gray-200 dark:bg-dark-border'
                  }`}>
                    {req.met ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-dark-text-muted" />
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    req.met
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-dark-text-secondary'
                  }`}>
                    {req.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
              <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                Tip: Meeting all basic requirements gives you 60% strength.
                Additional complexity like numbers and longer length increases your score.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-dark-border">
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-dark-text-muted">
              This lab runs entirely in your browser. We never store or transmit your password.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
