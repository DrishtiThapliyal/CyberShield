import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, ChevronRight, ChevronLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { useAssessment } from '../contexts/AssessmentContext'

interface Question {
  id: string
  question: string
  options: {
    text: string
    score: number
  }[]
  category: string
}

const questions: Question[] = [
  {
    id: 'password-habits',
    question: 'How do you typically manage your passwords?',
    options: [
      { text: 'I use a password manager with unique passwords for each account', score: 10 },
      { text: 'I reuse a few passwords across different accounts', score: 5 },
      { text: 'I use the same password for most accounts', score: 1 },
      { text: 'I write them down or store them in notes', score: 2 }
    ],
    category: 'Password Security'
  },
  {
    id: '2fa',
    question: 'Do you have two-factor authentication (2FA) enabled on your important accounts?',
    options: [
      { text: 'Yes, on all accounts that support it', score: 10 },
      { text: 'Yes, on some accounts like email or banking', score: 7 },
      { text: 'I know about it but haven\'t enabled it', score: 3 },
      { text: 'What is two-factor authentication?', score: 0 }
    ],
    category: 'Account Security'
  },
  {
    id: 'software-updates',
    question: 'How do you handle software updates?',
    options: [
      { text: 'I update immediately when updates are available', score: 10 },
      { text: 'I update within a few days of being notified', score: 8 },
      { text: 'I update occasionally when I remember', score: 4 },
      { text: 'I often postpone or skip updates', score: 1 }
    ],
    category: 'System Security'
  },
  {
    id: 'phishing',
    question: 'How confident are you in identifying phishing emails or messages?',
    options: [
      { text: 'Very confident - I can spot them easily', score: 10 },
      { text: 'Fairly confident - I usually recognize them', score: 7 },
      { text: 'Somewhat confident - I might miss some', score: 4 },
      { text: 'Not confident - I often can\'t tell', score: 1 }
    ],
    category: 'Threat Awareness'
  },
  {
    id: 'public-wifi',
    question: 'What do you do when connecting to public WiFi?',
    options: [
      { text: 'I always use a VPN', score: 10 },
      { text: 'I avoid sensitive activities on public WiFi', score: 8 },
      { text: 'I browse normally but avoid banking/shopping', score: 5 },
      { text: 'I don\'t think about it differently', score: 2 }
    ],
    category: 'Network Security'
  },
  {
    id: 'backup',
    question: 'How often do you backup your important data?',
    options: [
      { text: 'Automatic daily backups to cloud and local storage', score: 10 },
      { text: 'Regular weekly backups', score: 8 },
      { text: 'Occasional backups when I remember', score: 4 },
      { text: 'I rarely or never backup my data', score: 1 }
    ],
    category: 'Data Protection'
  },
  {
    id: 'social-media',
    question: 'How do you manage your privacy settings on social media?',
    options: [
      { text: 'I\'ve reviewed and restricted all privacy settings', score: 10 },
      { text: 'I\'ve adjusted some settings', score: 6 },
      { text: 'I use whatever the default settings are', score: 3 },
      { text: 'I don\'t use social media', score: 10 }
    ],
    category: 'Privacy'
  },
  {
    id: 'downloads',
    question: 'When downloading software or files, how do you verify their safety?',
    options: [
      { text: 'I only download from official sources and verify signatures', score: 10 },
      { text: 'I download from official websites only', score: 8 },
      { text: 'I use well-known download sites', score: 5 },
      { text: 'I download from whatever source seems convenient', score: 1 }
    ],
    category: 'Download Safety'
  },
  {
    id: 'device-lock',
    question: 'Is your phone/computer protected with a PIN, password, or biometric lock?',
    options: [
      { text: 'Yes, strong PIN/password and biometric', score: 10 },
      { text: 'Yes, with a standard password or PIN', score: 8 },
      { text: 'Yes, but it\'s a simple or short PIN', score: 4 },
      { text: 'No, my device isn\'t locked', score: 0 }
    ],
    category: 'Device Security'
  },
  {
    id: 'suspicious-activity',
    question: 'What would you do if you noticed suspicious activity on an account?',
    options: [
      { text: 'Immediately change password, enable 2FA, and report it', score: 10 },
      { text: 'Change password and monitor the account', score: 7 },
      { text: 'Keep an eye on it and change password later', score: 4 },
      { text: 'I might not notice or wouldn\'t know what to do', score: 1 }
    ],
    category: 'Response Awareness'
  }
]

export function RiskCalculatorPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { updateRiskScore, markAssessmentComplete } = useAssessment()

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: score }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = Object.values(newAnswers).reduce((a, b) => a + b, 0)
      const maxScore = questions.length * 10
      const percentage = Math.round((totalScore / maxScore) * 100)
      updateRiskScore(percentage)
      markAssessmentComplete('risk-calculator')
      setShowResults(true)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      navigate('/assessments')
    }
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
    const maxScore = questions.length * 10
    return Math.round((totalScore / maxScore) * 100)
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'text-emerald-500', bg: 'bg-emerald-500' }
    if (score >= 60) return { level: 'Moderate Risk', color: 'text-blue-500 dark:text-gold-500', bg: 'bg-blue-500 dark:bg-gold-500' }
    if (score >= 40) return { level: 'Elevated Risk', color: 'text-amber-500', bg: 'bg-amber-500' }
    return { level: 'High Risk', color: 'text-red-500', bg: 'bg-red-500' }
  }

  const score = calculateScore()
  const risk = getRiskLevel(score)

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600 dark:text-gold-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Your Cyber Risk Assessment
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              Based on your answers, here's your cybersecurity risk profile.
            </p>

            <div className="mb-8">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200 dark:text-dark-border"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={440}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={risk.bg.replace('bg-', 'text-')}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${risk.color}`}>{score}%</span>
                </div>
              </div>
              <p className={`text-xl font-semibold ${risk.color}`}>{risk.level}</p>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-surface">
                <h4 className="font-medium text-gray-900 dark:text-dark-text-primary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Strengths
                </h4>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {score >= 70
                    ? 'You have strong cybersecurity habits overall. Keep maintaining these good practices.'
                    : 'You show awareness in several security areas. Building on these strengths will help.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-surface">
                <h4 className="font-medium text-gray-900 dark:text-dark-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Areas to Improve
                </h4>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {score >= 80
                    ? 'Stay vigilant and keep your security knowledge up to date with emerging threats.'
                    : 'Focus on implementing stronger password practices and enabling two-factor authentication.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/assessments" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Back to Assessments
                </Button>
              </Link>
              <Link to="/report" className="flex-1">
                <Button className="w-full gap-2">
                  View Full Report
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted mb-4">
          <LineChart className="w-4 h-4" />
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <Progress value={progress} variant="gold" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card padding="lg">
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-600 dark:text-gold-400">
                {question.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text-primary mt-2">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full p-4 text-left rounded-xl border border-gray-200 dark:border-dark-border hover:border-blue-400 dark:hover:border-gold-500 hover:bg-blue-50 dark:hover:bg-gold-500/5 transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-gray-700 dark:text-dark-text-primary">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <Button variant="ghost" onClick={goBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {currentQuestion === 0 ? 'Back to Assessments' : 'Previous Question'}
        </Button>
      </div>
    </div>
  )
}
