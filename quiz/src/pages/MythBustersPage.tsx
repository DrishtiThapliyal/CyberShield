import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight, ChevronLeft, Check, X, Lightbulb } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { useAssessment } from '../contexts/AssessmentContext'

interface Question {
  id: string
  myth: string
  isTrue: boolean
  explanation: string
  fact: string
}

const questions: Question[] = [
  {
    id: 'password-complexity',
    myth: 'Complex passwords with random characters are always more secure.',
    isTrue: false,
    explanation: 'Length matters more than complexity. A longer passphrase like "correct horse battery staple" is often more secure than a short complex password like "Tr0ub4dor&3" and easier to remember.',
    fact: 'Password length is more important than complexity. Long passphrases can be both stronger and more memorable.'
  },
  {
    id: 'infection-signs',
    myth: 'You\'ll know if your computer is infected with malware.',
    isTrue: false,
    explanation: 'Modern malware is designed to be invisible. It can run silently in the background, stealing data or using your resources without obvious symptoms like slowdowns or pop-ups.',
    fact: 'Modern malware often runs silently. Regular security scans and updates are essential regardless of how your system "feels".'
  },
  {
    id: 'mac-immune',
    myth: 'Macs don\'t get viruses or malware.',
    isTrue: false,
    explanation: 'While historically less targeted, Macs are not immune to malware. As their popularity has grown, so have threats targeting macOS. Mac-specific malware exists and can be dangerous.',
    fact: 'Macs can and do get malware. They benefit from security features but require the same vigilance as any computer.'
  },
  {
    id: 'https-safe',
    myth: 'HTTPS websites are always safe to use.',
    isTrue: false,
    explanation: 'HTTPS only means the connection is encrypted - it doesn\'t guarantee the site is legitimate. Scammers also use HTTPS for phishing sites. The lock icon means secure connection, not safe content.',
    fact: 'HTTPS guarantees encrypted connection, not legitimacy. Always verify the actual site and content, not just the lock icon.'
  },
  {
    id: 'personal-data',
    myth: 'I have nothing worth stealing, so hackers won\'t target me.',
    isTrue: false,
    explanation: 'Everyone has value to hackers: your identity, computing resources, email for spam, or as a stepping stone to others. Automated attacks don\'t discriminate - they target any accessible system.',
    fact: 'Every person and device has value to attackers. Automated attacks target anyone vulnerable, regardless of perceived importance.'
  },
  {
    id: 'password-change',
    myth: 'You should change your passwords frequently for security.',
    isTrue: false,
    explanation: 'Regular mandatory password changes often lead to weaker passwords (Password1, Password2...). Only change passwords if there\'s been a breach or you suspect compromise.',
    fact: 'Strong, unique passwords that you don\'t reuse are better than frequent changes. Change passwords when breaches occur, not on arbitrary schedules.'
  },
  {
    id: 'private-browsing',
    myth: 'Private/Incognito browsing makes you anonymous online.',
    isTrue: false,
    explanation: 'Private mode only prevents your browser from storing history locally. Your ISP, websites, and network administrators can still see your activity. It doesn\'t hide your identity or location.',
    fact: 'Private browsing only hides local history. Your ISP, websites, and network can still track you. Use tools like VPNs for actual privacy.'
  },
  {
    id: 'wifi-password',
    myth: 'A strong WiFi password makes your network completely secure.',
    isTrue: false,
    explanation: 'A strong password is just one layer. Router vulnerabilities, default settings, WPS vulnerabilities, and other factors can still expose your network. Regular updates and configuration matter.',
    fact: 'Strong passwords help but don\'t guarantee security. Keep router firmware updated, disable WPS, and use modern WPA3 if available.'
  },
  {
    id: 'phone-numbers',
    myth: 'Two-factor authentication using SMS is perfectly secure.',
    isTrue: false,
    explanation: 'While better than nothing, SMS-based 2FA can be intercepted through SIM-swapping attacks or SS7 vulnerabilities. Authenticator apps or hardware keys provide stronger protection.',
    fact: 'SMS 2FA is a good start, but authenticator apps or hardware keys offer stronger protection against sophisticated attacks.'
  },
  {
    id: 'update-risk',
    myth: 'Software updates can introduce new bugs, so it\'s safer to wait.',
    isTrue: false,
    explanation: 'Security updates address known vulnerabilities. Waiting leaves you exposed to attacks. Major bugs are rare and typically fixed quickly. The security risk of not updating far outweighs update risks.',
    fact: 'The risk of vulnerabilities outweighs potential update issues. Update promptly, especially for security patches.'
  }
]

export function MythBustersPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { updateMythBustersScore, markAssessmentComplete } = useAssessment()

  const handleAnswer = (answer: boolean) => {
    const current = questions[currentQuestion]
    const isCorrect = answer === current.isTrue
    setAnswers({ ...answers, [current.id]: isCorrect })
    setSelectedAnswer(answer)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setShowExplanation(false)
    setSelectedAnswer(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const score = calculateScore()
      updateMythBustersScore(score)
      markAssessmentComplete('myth-busters')
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    const allAnswers = { ...answers }
    if (selectedAnswer !== null) {
      const current = questions[currentQuestion]
      allAnswers[current.id] = selectedAnswer === current.isTrue
    }
    const correct = Object.values(allAnswers).filter(Boolean).length
    return Math.round((correct / questions.length) * 100)
  }

  if (showResults) {
    const correctCount = Object.values(answers).filter(Boolean).length
    const finalScore = Math.round((correctCount / questions.length) * 100)

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-blue-600 dark:text-gold-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Myth Busting Complete!
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              You correctly identified {correctCount} out of {questions.length} myths.
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
                    animate={{ strokeDashoffset: 440 - (440 * finalScore) / 100 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={finalScore >= 60 ? 'text-emerald-500' : 'text-amber-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${finalScore >= 60 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {finalScore}%
                  </span>
                </div>
              </div>
              <p className={`text-xl font-semibold ${finalScore >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {finalScore >= 80 ? 'Myth Buster Expert!' : finalScore >= 60 ? 'Good Fact-Checking Skills!' : 'Keep Learning!'}
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/assessments" className="flex-1">
                <Button variant="secondary" className="w-full">Back to Assessments</Button>
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
  const isCorrect = selectedAnswer === question.isTrue

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted mb-4">
          <FileText className="w-4 h-4" />
          Myth {currentQuestion + 1} of {questions.length}
        </div>
        <Progress value={progress} variant="gold" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card padding="lg">
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-600 dark:text-gold-400">
                Is this statement true or false?
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text-primary mt-3 leading-relaxed">
                "{question.myth}"
              </h2>
            </div>

            {!showExplanation ? (
              <div className="flex gap-4">
                <motion.button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-200 dark:border-dark-border hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all text-gray-700 dark:text-dark-text-primary font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  TRUE
                </motion.button>
                <motion.button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-200 dark:border-dark-border hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all text-gray-700 dark:text-dark-text-primary font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  FALSE
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={`p-4 rounded-xl mb-4 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`font-medium ${
                      isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isCorrect ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'
                  }`}>
                    This statement is <strong>{question.isTrue ? 'TRUE' : 'FALSE'}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-gold-500/5 border border-blue-200 dark:border-gold-500/20 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-gold-500" />
                    <span className="font-medium text-blue-700 dark:text-gold-400">The Facts</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-dark-text-secondary mb-2">
                    {question.explanation}
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-gold-400">
                    {question.fact}
                  </p>
                </div>

                <Button onClick={nextQuestion} className="w-full gap-2">
                  {currentQuestion < questions.length - 1 ? 'Next Myth' : 'See Results'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <Button variant="ghost" onClick={() => navigate('/assessments')} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Exit Quiz
        </Button>
      </div>
    </div>
  )
}
