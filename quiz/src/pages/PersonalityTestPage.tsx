import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ChevronRight, ChevronLeft, User, Sparkles } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { useAssessment } from '../contexts/AssessmentContext'

interface Question {
  id: string
  question: string
  options: {
    text: string
    type: 'guardian' | 'innovator' | 'skeptic' | 'explorer'
  }[]
}

const questions: Question[] = [
  {
    id: 'approach',
    question: 'When you hear about a new technology trend, what\'s your first instinct?',
    options: [
      { text: 'Research it thoroughly before considering adoption', type: 'guardian' },
      { text: 'Jump in and explore its possibilities immediately', type: 'innovator' },
      { text: 'Question whether it\'s just hype or actually useful', type: 'skeptic' },
      { text: 'Wait and see how it develops before making a decision', type: 'explorer' }
    ]
  },
  {
    id: 'password-creation',
    question: 'How do you typically approach creating new passwords?',
    options: [
      { text: 'Use a password manager with generated passwords', type: 'guardian' },
      { text: 'Create unique phrases or patterns I can remember', type: 'innovator' },
      { text: 'Question whether the account really needs a strong password', type: 'skeptic' },
      { text: 'Modify my standard password slightly for each site', type: 'explorer' }
    ]
  },
  {
    id: 'email-link',
    question: 'You receive an unexpected email with a link from a known service. What do you do?',
    options: [
      { text: 'Verify by going directly to the service\'s website', type: 'guardian' },
      { text: 'Check if the link destination looks legitimate', type: 'explorer' },
      { text: 'Assume it\'s probably a scam and delete it', type: 'skeptic' },
      { text: 'Click if the email looks professionally designed', type: 'innovator' }
    ]
  },
  {
    id: 'sharing',
    question: 'How comfortable are you sharing personal information online?',
    options: [
      { text: 'I minimize what I share and regularly review privacy settings', type: 'guardian' },
      { text: 'I share selectively but enjoy connecting with others', type: 'innovator' },
      { text: 'I\'m skeptical about how companies use my data', type: 'skeptic' },
      { text: 'I share openly but am mindful of context', type: 'explorer' }
    ]
  },
  {
    id: 'software-choice',
    question: 'What factors most influence your choice of software or apps?',
    options: [
      { text: 'Security features and privacy policies', type: 'guardian' },
      { text: 'Features, innovation, and user experience', type: 'innovator' },
      { text: 'Independence, open-source status, and transparency', type: 'skeptic' },
      { text: 'Balance of convenience and reasonable security', type: 'explorer' }
    ]
  },
  {
    id: 'update-response',
    question: 'When your device prompts for a security update, you typically:',
    options: [
      { text: 'Update immediately, understanding the urgency', type: 'guardian' },
      { text: 'Update quickly to get the new features', type: 'innovator' },
      { text: 'Research what the update actually changes first', type: 'skeptic' },
      { text: 'Update when convenient but within a day or two', type: 'explorer' }
    ]
  },
  {
    id: 'social-media',
    question: 'Your approach to social media most closely matches:',
    options: [
      { text: 'Limited engagement with locked-down privacy', type: 'guardian' },
      { text: 'Active sharing to build connections', type: 'innovator' },
      { text: 'Critical observation with minimal personal sharing', type: 'skeptic' },
      { text: 'Casual use with awareness of risks', type: 'explorer' }
    ]
  },
  {
    id: 'advice',
    question: 'A friend asks for help securing their online accounts. You would:',
    options: [
      { text: 'Walk them through enabling 2FA and creating strong passwords', type: 'guardian' },
      { text: 'Show them useful security tools that are easy to use', type: 'innovator' },
      { text: 'Explain why security matters and what to watch out for', type: 'skeptic' },
      { text: 'Share practical tips based on what\'s worked for you', type: 'explorer' }
    ]
  },
  {
    id: 'news-response',
    question: 'When you see news about a major data breach:',
    options: [
      { text: 'Immediately check if you\'re affected and take action', type: 'guardian' },
      { text: 'Stay informed but trust your existing precautions', type: 'innovator' },
      { text: 'Question how it happened and who\'s responsible', type: 'skeptic' },
      { text: 'Monitor the situation and be ready to act if needed', type: 'explorer' }
    ]
  },
  {
    id: 'work-security',
    question: 'At work, your attitude toward security policies is:',
    options: [
      { text: 'I follow them carefully and help others understand why', type: 'guardian' },
      { text: 'I look for ways security and productivity can coexist', type: 'innovator' },
      { text: 'I question if policies actually improve security', type: 'skeptic' },
      { text: 'I adapt to them while finding efficient workarounds', type: 'explorer' }
    ]
  },
  {
    id: 'connected-devices',
    question: 'Your interest in smart home or IoT devices:',
    options: [
      { text: 'I\'m cautious about adding internet-connected devices', type: 'guardian' },
      { text: 'I enjoy new tech and secure it as best I can', type: 'innovator' },
      { text: 'I\'m skeptical about who really benefits from the data', type: 'skeptic' },
      { text: 'I might try them but research security first', type: 'explorer' }
    ]
  },
  {
    id: 'future',
    question: 'How do you feel about the future of cybersecurity?',
    options: [
      { text: 'Optimistic - tools and awareness keep improving', type: 'guardian' },
      { text: 'Excited - new technologies will solve many problems', type: 'innovator' },
      { text: 'Cautious - threats evolve as fast as defenses', type: 'skeptic' },
      { text: 'Curious - it\'s an ongoing learning process', type: 'explorer' }
    ]
  }
]

const personalityDescriptions = {
  guardian: {
    title: 'The Security Guardian',
    subtitle: 'Protector of Digital Realms',
    description: 'You are a natural protector who takes security seriously. You prioritize safety over convenience and help others understand the importance of good security practices. Your vigilance makes you a trusted advisor on security matters.',
    strengths: ['Highly security-conscious', 'Proactive risk management', 'Helps others stay safe'],
    challenges: ['May miss opportunities due to caution', 'Can find convenience conflicts'],
    icon: '🛡️'
  },
  innovator: {
    title: 'The Digital Pioneer',
    subtitle: 'Balancing Progress with Protection',
    description: 'You embrace new technology while maintaining reasonable security practices. You find creative solutions and don\'t let security concerns hold you back from innovation. Your balanced approach helps you grow while staying protected.',
    strengths: ['Adaptable and open to change', 'Finds security-convenience balance', 'Early adopter awareness'],
    challenges: ['Risk of overlooking threats', 'May prioritize features over security'],
    icon: '🚀'
  },
  skeptic: {
    title: 'The Critical Thinker',
    subtitle: 'Questioning the Digital Status Quo',
    description: 'You approach cybersecurity with healthy skepticism, questioning motives and digging deeper than surface-level claims. Your critical thinking helps you and others understand the "why" behind security practices.',
    strengths: ['Questions assumptions', 'Identifies hidden risks', 'Values transparency'],
    challenges: ['May miss legitimate opportunities', 'Can appear overly cautious'],
    icon: '🔍'
  },
  explorer: {
    title: 'The Digital Navigator',
    subtitle: 'Curiously Charting Safe Paths',
    description: 'You take a balanced, pragmatic approach to security. You learn as you go, adapt to new threats, and find ways to stay safe without overly restricting your digital life. Your flexibility serves you well.',
    strengths: ['Adaptable learning style', 'Practical decision-making', 'Balanced perspective'],
    challenges: ['May need more depth in some areas', 'Consistency can vary'],
    icon: '🧭'
  }
}

export function PersonalityTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { updatePersonalityType, markAssessmentComplete } = useAssessment()

  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: type }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const typeCounts = Object.values(newAnswers).reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const dominant = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof personalityDescriptions
      updatePersonalityType(dominant)
      markAssessmentComplete('personality-test')
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

  const getDominantType = () => {
    const typeCounts = Object.values(answers).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof personalityDescriptions
  }

  if (showResults) {
    const type = getDominantType()
    const personality = personalityDescriptions[type]

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card padding="lg" className="text-center overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-gold-500/10 dark:to-gold-600/10" />
              <div className="relative pt-8 pb-6">
                <div className="text-6xl mb-4">{personality.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                  {personality.title}
                </h2>
                <p className="text-lg text-blue-600 dark:text-gold-400 font-medium">
                  {personality.subtitle}
                </p>
              </div>
            </div>

            <div className="px-2 sm:px-6">
              <p className="text-gray-600 dark:text-dark-text-secondary text-lg leading-relaxed mb-8">
                {personality.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-left">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {personality.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-emerald-600 dark:text-emerald-500">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-left">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Growth Areas
                  </h4>
                  <ul className="space-y-1">
                    {personality.challenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-amber-600 dark:text-amber-500">
                        {challenge}
                      </li>
                    ))}
                  </ul>
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
          <Brain className="w-4 h-4" />
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text-primary mb-8 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
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
