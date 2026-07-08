import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield,
  Key,
  Brain,
  AlertTriangle,
  FileText,
  ChevronRight,
  Sparkles,
  Target,
  LineChart,
  Lock,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { useAssessment } from '../contexts/AssessmentContext'

const assessments = [
  {
    id: 'risk-calculator',
    title: 'Cyber Risk Calculator',
    description: 'Assess your personal cybersecurity risk level through an interactive questionnaire',
    icon: LineChart,
    path: '/assessments/risk-calculator',
    duration: '5 min',
    color: 'from-blue-500 to-blue-600',
    darkColor: 'from-gold-500 to-gold-600'
  },
  {
    id: 'personality-test',
    title: 'Cyber Personality Test',
    description: 'Discover your cybersecurity personality type and learn how it affects your habits',
    icon: Brain,
    path: '/assessments/personality-test',
    duration: '8 min',
    color: 'from-purple-500 to-purple-600',
    darkColor: 'from-gold-500 to-gold-600'
  },
  {
    id: 'phishing-test',
    title: 'Would You Fall For It?',
    description: 'Test your ability to identify phishing attempts and online scams',
    icon: AlertTriangle,
    path: '/assessments/phishing-test',
    duration: '6 min',
    color: 'from-amber-500 to-amber-600',
    darkColor: 'from-gold-500 to-gold-600'
  },
  {
    id: 'myth-busters',
    title: 'Cyber Myth Busters',
    description: 'Separate fact from fiction in common cybersecurity beliefs',
    icon: FileText,
    path: '/assessments/myth-busters',
    duration: '5 min',
    color: 'from-emerald-500 to-emerald-600',
    darkColor: 'from-gold-500 to-gold-600'
  }
]

const features = [
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Tailored assessments that adapt to your knowledge level and learning pace'
  },
  {
    icon: Sparkles,
    title: 'Interactive Experience',
    description: 'Engaging quizzes and simulations that make learning cybersecurity enjoyable'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data stays yours. We never share or sell your personal information'
  }
]

export function HomePage() {
  const { getTotalScore, isAssessmentComplete, results } = useAssessment()
  const totalScore = getTotalScore()
  const completedCount = results.completedAssessments.length
  const totalAssessments = assessments.length + 1
  const progress = (completedCount / totalAssessments) * 100

  return (
    <div className="space-y-16 pb-8">
      <section className="pt-8 sm:pt-12 lg:pt-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-gold-500/10 text-blue-600 dark:text-gold-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Interactive Cybersecurity Education
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text-primary tracking-tight mb-6">
              Stay Safe Online with{' '}
              <span className="text-blue-600 dark:text-gold-400">Confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Build essential cybersecurity skills through interactive assessments.
              Learn to identify threats, strengthen passwords, and protect your digital life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/assessments">
              <Button size="lg" className="gap-2">
                Start Learning
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/password-lab">
              <Button variant="secondary" size="lg" className="gap-2">
                <Key className="w-4 h-4" />
                Try Password Lab
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {completedCount > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="elevated" className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-2">
                  Your Learning Progress
                </h2>
                <p className="text-gray-600 dark:text-dark-text-secondary">
                  You've completed {completedCount} of {totalAssessments} assessments
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-gold-400">
                    {totalScore}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-dark-text-muted">Overall Score</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Progress value={progress} variant="gold" />
            </div>
          </Card>
        </motion.section>
      )}

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Interactive Assessments
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Choose from our collection of engaging assessments to discover your cybersecurity strengths
            and areas for improvement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Link to={assessment.path}>
                  <Card variant="interactive" className="h-full group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${assessment.color} dark:bg-gradient-to-br dark:${assessment.darkColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white dark:text-dark-bg" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-2">
                      {assessment.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 leading-relaxed">
                      {assessment.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-dark-text-muted">
                        {assessment.duration}
                      </span>
                      {isComplete && (
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          Completed
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="py-8">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-surface dark:to-dark-elevated border-0 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-4 lg:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-gold-500/10 text-blue-700 dark:text-gold-400 text-sm font-medium mb-4">
                <Key className="w-4 h-4" />
                Interactive Tool
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
                Password Strength Lab
              </h2>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-6 leading-relaxed">
                Experiment with different passwords in a safe environment. Learn what makes a password
                strong and get instant feedback on your choices.
              </p>
              <Link to="/password-lab">
                <Button className="gap-2">
                  Open Password Lab
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-center p-8">
              <div className="w-64 h-64 rounded-2xl bg-white dark:bg-dark-card shadow-elevated flex items-center justify-center">
                <Shield className="w-24 h-24 text-blue-600 dark:text-gold-500 opacity-50" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Why Learn With Us?
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Our approach combines educational best practices with engaging design to make
            cybersecurity learning accessible and enjoyable.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-gold-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
