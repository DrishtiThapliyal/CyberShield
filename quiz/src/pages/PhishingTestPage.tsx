import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { AlertTriangle, ChevronRight, X, Check, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { useAssessment } from '../contexts/AssessmentContext'

interface Scenario {
  id: string
  title: string
  content: string
  isSuspicious: boolean
  explanation: string
  indicators?: string[]
}

const scenarios: Scenario[] = [
  {
    id: 'email-1',
    title: 'Banking Email',
    content: `From: Security Team <support@bank-secure-verify.com>
Subject: Urgent: Your account will be suspended

Dear Valued Customer,

We have detected unusual activity on your account. To prevent suspension, please verify your identity immediately by clicking the link below:

[VERIFY YOUR ACCOUNT NOW]

If you do not verify within 24 hours, your account will be permanently locked.

Best regards,
Security Team`,
    isSuspicious: true,
    explanation: 'This email contains multiple red flags indicating a phishing attempt.',
    indicators: [
      'Suspicious sender domain (bank-secure-verify.com instead of actual bank domain)',
      'Creates urgency with time pressure',
      'Generic greeting instead of your name',
      'Asks you to click a link to verify'
    ]
  },
  {
    id: 'email-2',
    title: 'Work Email',
    content: `From: Sarah Johnson <sarah.johnson@company.com>
Subject: Meeting notes from today

Hi team,

Here are the notes from today's planning meeting:

1. Project timeline confirmed for Q2
2. Budget approved for new software
3. Next steps assigned (see attached document)

Let me know if you have any questions.

Sarah`,
    isSuspicious: false,
    explanation: 'This appears to be a legitimate internal email. It uses proper company email format, has specific, relevant content for a work context, and doesn\'t create urgency or ask for credentials.'
  },
  {
    id: 'sms-1',
    title: 'Delivery SMS',
    content: `From: +1-555-0123

FX: Your package could not be delivered. Please update your address info at: bit.ly/delivery-update

Reply STOP to opt out.`,
    isSuspicious: true,
    explanation: 'This SMS contains typical smishing (SMS phishing) characteristics.',
    indicators: [
      'Unknown/unusual phone number',
      'Generic "package" reference without details',
      'Shortened URL hides actual destination',
      'Vague context about which delivery service'
    ]
  },
  {
    id: 'email-3',
    title: 'LinkedIn Notification',
    content: `From: LinkedIn <messages-noreply@linkedin.com>
Subject: John Smith sent you a message

Hi [Your Name],

You have a new message from John Smith.

"Hi there! I came across your profile and was impressed by your experience. I'd love to connect and discuss a potential opportunity at our company. Are you open to a quick chat?"

Click here to view and reply to this message:
https://www.linkedin.com/messaging/thread/...

Best,
The LinkedIn Team`,
    isSuspicious: false,
    explanation: 'This appears legitimate. Check if it matches actual LinkedIn notifications in your account. The URL structure should match LinkedIn\'s official domain. Always verify by logging into LinkedIn directly rather than clicking email links.'
  },
  {
    id: 'email-4',
    title: 'Password Reset',
    content: `From: Microsoft <no-reply@microsoft.com>
Subject: Password reset request

We received a request to reset your Microsoft account password. If you made this request, click the button below:

[Reset Password]

If you didn't request a password reset, you can safely ignore this email. Your password won't be changed.

This link will expire in 24 hours.

Thanks,
The Microsoft account team`,
    isSuspicious: false,
    explanation: 'This appears to be a legitimate password reset email. However, always verify: 1) Check the actual sender domain carefully, 2) Consider if you actually requested a reset, 3) When in doubt, go directly to the site instead of clicking.'
  },
  {
    id: 'call-1',
    title: 'Tech Support Call',
    content: `Phone Call:
"Hello, this is Alex calling from the Microsoft Technical Support department. We've detected that your computer is infected with viruses and is sending error reports to our servers.

I can help you fix this right now. I'll need you to go to your computer, download a remote support tool, and I'll clean it up for you.

Can you go to www.quick-support-tech.com and enter code 4829?"`,
    isSuspicious: true,
    explanation: 'This is a classic tech support scam. Microsoft never makes unsolicited calls.',
    indicators: [
      'Unsolicited call about computer problems',
      'Microsoft doesn\'t make unsolicited support calls',
      'Asking to download remote access software',
      'Suspicious support website URL'
    ]
  },
  {
    id: 'email-5',
    title: 'CEO Request',
    content: `From: CEO Name <ceo.name123@gmail.com>
Subject: Urgent Request

Hi [Your Name],

I need you to handle something immediately. Please purchase 5 Amazon gift cards, $200 each. I need them for client appreciation gifts.

Send me the gift card codes as soon as you have them. I'm in meetings all day so won't be able to discuss by phone.

CEO Name
CEO, Company Name`,
    isSuspicious: true,
    explanation: 'This is a Business Email Compromise (BEC) scam, a common corporate fraud technique.',
    indicators: [
      'CEO using a personal Gmail address',
      'Creates extreme urgency',
      'Unusual request for gift cards',
      'Provides excuse to avoid verification call',
      'Classic BEC (Business Email Compromise) pattern'
    ]
  },
  {
    id: 'text-1',
    title: 'Friend Message',
    content: `Text message from friend's number:

"Hey! It's Mike. I got a new number. Can you do me a favor? I'm trying to access my social media but don't have phone service right now. Can you send me the verification code that comes to my account? I'll explain later, it's an emergency."`,
    isSuspicious: true,
    explanation: 'This is a common social engineering attack for account takeover.',
    indicators: [
      'New number without verification',
      'Asks for account verification code',
      'Creates urgency ("emergency")',
      'Common account takeover technique'
    ]
  }
]

export function PhishingTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { updatePhishingScore, markAssessmentComplete } = useAssessment()

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-25, 25])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0])

  const handleSwipe = (isTrust: boolean) => {
    const current = scenarios[currentIndex]
    const correct = isTrust !== current.isSuspicious
    setAnswers({ ...answers, [current.id]: correct })
    setLastAnswer(correct)
    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
      if (currentIndex < scenarios.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        const score = calculateFinalScore({ ...answers, [current.id]: correct })
        updatePhishingScore(score)
        markAssessmentComplete('phishing-test')
        setShowResults(true)
      }
    }, 1500)
  }

  const calculateFinalScore = (finalAnswers: Record<string, boolean>) => {
    const correct = Object.values(finalAnswers).filter(Boolean).length
    return Math.round((correct / scenarios.length) * 100)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      handleSwipe(true)
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe(false)
    }
  }

  if (showResults) {
    const score = calculateFinalScore(answers)
    const correctCount = Object.values(answers).filter(Boolean).length

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Phishing Assessment Complete
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              You correctly identified {correctCount} out of {scenarios.length} scenarios.
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
                    className={score >= 60 ? 'text-emerald-500' : 'text-amber-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${score >= 60 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {score}%
                  </span>
                </div>
              </div>
              <p className={`text-xl font-semibold ${score >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {score >= 80 ? 'Excellent Threat Detection!' : score >= 60 ? 'Good Awareness' : 'Room for Improvement'}
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

  const progress = ((currentIndex + 1) / scenarios.length) * 100
  const current = scenarios[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted mb-4">
          <AlertTriangle className="w-4 h-4" />
          Scenario {currentIndex + 1} of {scenarios.length}
        </div>
        <Progress value={progress} variant="gold" />
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-dark-text-secondary">
          Swipe right to trust, left if suspicious
        </p>
      </div>

      <div className="relative h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {!showFeedback && (
            <motion.div
              key={current.id}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute w-full cursor-grab active:cursor-grabbing"
            >
              <Card padding="lg" className="select-none">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-gold-500/10 text-blue-600 dark:text-gold-400 text-sm font-medium">
                    {current.title}
                  </span>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-dark-text-primary font-mono bg-gray-50 dark:bg-dark-surface p-4 rounded-xl">
                  {current.content}
                </pre>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFeedback && lastAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card
                padding="lg"
                className={`w-full text-center ${
                  lastAnswer
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  lastAnswer ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-red-100 dark:bg-red-900/40'
                }`}>
                  {lastAnswer ? (
                    <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  lastAnswer ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                }`}>
                  {lastAnswer ? 'Correct!' : 'Not quite'}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-4">
                  {current.isSuspicious
                    ? 'This scenario contained suspicious elements.'
                    : 'This scenario appears to be legitimate.'}
                </p>
                {current.indicators && (
                  <ul className="text-left space-y-1">
                    {current.indicators.map((indicator, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-dark-text-secondary flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                )}
                {!current.indicators && current.explanation && (
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                    {current.explanation}
                  </p>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe(false)}
          className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          aria-label="Mark as suspicious"
        >
          <ThumbsDown className="w-8 h-8" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe(true)}
          className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          aria-label="Mark as trusted"
        >
          <ThumbsUp className="w-8 h-8" />
        </motion.button>
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={() => navigate('/assessments')} className="gap-2">
          Exit Assessment
        </Button>
      </div>
    </div>
  )
}
