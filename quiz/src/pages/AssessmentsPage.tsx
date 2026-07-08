import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Brain,
  AlertTriangle,
  FileText,
  LineChart,
  Key,
  ChevronRight,
  Lock
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAssessment } from '../contexts/AssessmentContext'

const assessments = [
  {
    id: 'risk-calculator',
    title: 'Cyber Risk Calculator',
    description: 'Assess your personal cybersecurity risk level through a structured questionnaire. Get insights into your current security posture.',
    icon: LineChart,
    path: '/assessments/risk-calculator',
    duration: '5 min',
    questions: 10,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'personality-test',
    title: 'Cyber Personality Test',
    description: 'Discover your cybersecurity personality type. Learn how your habits and attitudes affect your digital security.',
    icon: Brain,
    path: '/assessments/personality-test',
    duration: '8 min',
    questions: 15,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'phishing-test',
    title: 'Would You Fall For It?',
    description: 'Test your ability to identify phishing attempts and online scams through realistic scenarios.',
    icon: AlertTriangle,
    path: '/assessments/phishing-test',
    duration: '6 min',
    questions: 8,
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'myth-busters',
    title: 'Cyber Myth Busters',
    description: 'Challenge common cybersecurity beliefs. Separate fact from fiction with evidence-based answers.',
    icon: FileText,
    path: '/assessments/myth-busters',
    duration: '5 min',
    questions: 10,
    color: 'from-emerald-500 to-emerald-600',
  }
]

export function AssessmentsPage() {
  const { isAssessmentComplete, getTotalScore, results } = useAssessment()
  const totalScore = getTotalScore()
  const completedCount = results.completedAssessments.length

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Security Assessments
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Discover your cybersecurity strengths and areas for improvement through our
            interactive assessments. Each one is designed to be engaging and educational.
          </p>
        </motion.div>
      </div>

      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated" className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-gold-500/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary">
                    Your Progress
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                    {completedCount} of {assessments.length + 1} completed
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-gold-400">
                  {totalScore}%
                </div>
                <div className="text-sm text-gray-500 dark:text-dark-text-muted">Overall Score</div>
              </div>
              <Link to="/report">
                <Button variant="secondary" className="gap-2">
                  View Full Report
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => {
          const Icon = assessment.icon
          const isComplete = isAssessmentComplete(assessment.id)

          return (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card variant="interactive" className="h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${assessment.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                          {assessment.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
                          {assessment.description}
                        </p>
                      </div>
                      {isComplete && (
                        <span className="shrink-0 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                          Complete
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-text-muted">
                        <span>{assessment.duration}</span>
                        <span>{assessment.questions} questions</span>
                      </div>
                      <Link to={assessment.path}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          {isComplete ? 'Retake' : 'Start'}
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gold-500/5 dark:to-gold-500/10 border-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center shadow-card">
                <Key className="w-6 h-6 text-blue-600 dark:text-gold-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary">
                  Password Strength Lab
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Test and improve your passwords
                </p>
              </div>
            </div>
            <Link to="/password-lab">
              <Button className="gap-2">
                Open Lab
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
