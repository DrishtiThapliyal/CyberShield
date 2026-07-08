import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Shield,
  Key,
  Brain,
  AlertTriangle,
  LineChart,
  ChevronRight,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  RefreshCcw
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAssessment } from '../contexts/AssessmentContext'

const assessmentDetails = [
  {
    id: 'risk-calculator',
    title: 'Cyber Risk Calculator',
    icon: LineChart,
    path: '/assessments/risk-calculator',
    description: 'Measures your security habits and practices'
  },
  {
    id: 'phishing-test',
    title: 'Phishing Detection',
    icon: AlertTriangle,
    path: '/assessments/phishing-test',
    description: 'Tests ability to identify threats'
  },
  {
    id: 'myth-busters',
    title: 'Security Knowledge',
    icon: FileText,
    path: '/assessments/myth-busters',
    description: 'Assesses cybersecurity understanding'
  },
  {
    id: 'password-lab',
    title: 'Password Strength',
    icon: Key,
    path: '/assessments/password-lab',
    description: 'Evaluates password creation skills'
  }
]

const recommendations = [
  { priority: 'high', text: 'Enable two-factor authentication on all important accounts', category: 'Account Security' },
  { priority: 'high', text: 'Use a password manager to generate unique passwords', category: 'Password Security' },
  { priority: 'medium', text: 'Review and update privacy settings on social media', category: 'Privacy' },
  { priority: 'medium', text: 'Set up automatic software updates on all devices', category: 'System Security' },
  { priority: 'low', text: 'Consider using a VPN on public WiFi networks', category: 'Network Security' }
]

function ScoreRing({ score, label, size = 'md', color }: {
  score: number | null
  label: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const actualScore = score ?? 0

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(actualScore), 100)
    return () => clearTimeout(timer)
  }, [actualScore])

  const dimensions = {
    sm: { size: 80, strokeWidth: 8, fontSize: 'text-lg' },
    md: { size: 120, strokeWidth: 10, fontSize: 'text-2xl' },
    lg: { size: 160, strokeWidth: 12, fontSize: 'text-4xl' }
  }

  const { size: ringSize, strokeWidth, fontSize } = dimensions[size]
  const radius = (ringSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  const getColor = () => {
    if (color) return color
    if (actualScore >= 80) return 'text-emerald-500'
    if (actualScore >= 60) return 'text-blue-500 dark:text-gold-500'
    if (actualScore >= 40) return 'text-amber-500'
    return 'text-red-500'
  }

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <svg
          width={ringSize}
          height={ringSize}
          className="transform -rotate-90"
        >
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-dark-border"
          />
          <motion.circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={getColor()}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${fontSize} ${getColor()}`}>
            {animatedScore}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">{label}</p>
    </div>
  )
}

export function ReportPage() {
  const {
    results,
    getTotalScore,
    isAssessmentComplete,
    resetResults
  } = useAssessment()

  const totalScore = getTotalScore()
  const completedCount = results.completedAssessments.length

  const hasCompletedAny = completedCount > 0

  if (!hasCompletedAny) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-gray-400 dark:text-dark-text-muted" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              No Assessments Completed
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              Complete some assessments to generate your personalized security report.
            </p>
            <Link to="/assessments">
              <Button className="gap-2">
                Start Assessments
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    )
  }

  const getOverallLevel = () => {
    if (totalScore >= 80) return { level: 'Excellent', color: 'text-emerald-500', description: 'Outstanding cybersecurity awareness!' }
    if (totalScore >= 60) return { level: 'Good', color: 'text-blue-500 dark:text-gold-500', description: 'Solid security foundation.' }
    if (totalScore >= 40) return { level: 'Fair', color: 'text-amber-500', description: 'Room for improvement.' }
    return { level: 'Needs Work', color: 'text-red-500', description: 'Focus on building security habits.' }
  }

  const overall = getOverallLevel()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-gold-500/10 text-blue-600 dark:text-gold-400 text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Personal Security Report
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Your Cybersecurity Profile
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary max-w-xl mx-auto">
            A comprehensive overview of your cybersecurity strengths and personalized recommendations.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <ScoreRing score={totalScore} label="Overall Score" size="lg" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <h2 className={`text-2xl font-bold ${overall.color}`}>
                  {overall.level}
                </h2>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(totalScore / 20)
                          ? 'text-gold-500 fill-gold-500'
                          : 'text-gray-300 dark:text-dark-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                {overall.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                Based on {completedCount} completed assessment{completedCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-gold-500" />
            Assessment Breakdown
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessmentDetails.map((detail, index) => {
              const Icon = detail.icon
              const score = detail.id === 'risk-calculator' ? results.riskScore
                : detail.id === 'phishing-test' ? results.phishingScore
                : detail.id === 'myth-busters' ? results.mythBustersScore
                : results.passwordStrength
              const isComplete = isAssessmentComplete(detail.id)

              return (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link to={detail.path}>
                    <Card
                      variant="interactive"
                      padding="md"
                      className={`h-full ${!isComplete ? 'opacity-60' : ''}`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                          isComplete
                            ? 'bg-blue-50 dark:bg-gold-500/10'
                            : 'bg-gray-100 dark:bg-dark-surface'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isComplete
                              ? 'text-blue-600 dark:text-gold-500'
                              : 'text-gray-400 dark:text-dark-text-muted'
                          }`} />
                        </div>

                        {isComplete && score !== null ? (
                          <ScoreRing score={score} label="" size="sm" />
                        ) : (
                          <div className="w-20 h-20 flex items-center justify-center">
                            <span className="text-sm text-gray-400 dark:text-dark-text-muted">
                              Not completed
                            </span>
                          </div>
                        )}

                        <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-dark-text-primary">
                          {detail.title}
                        </h4>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {results.personalityType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card padding="lg" className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gold-500/5 dark:to-gold-600/5 border-0">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center shadow-card dark:shadow-card-dark">
                <Brain className="w-7 h-7 text-purple-600 dark:text-gold-500" />
              </div>
              <div>
                <span className="text-sm text-purple-600 dark:text-gold-400 font-medium">
                  Cyber Personality
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-1">
                  {results.personalityType === 'guardian' && 'The Security Guardian'}
                  {results.personalityType === 'innovator' && 'The Digital Pioneer'}
                  {results.personalityType === 'skeptic' && 'The Critical Thinker'}
                  {results.personalityType === 'explorer' && 'The Digital Navigator'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {results.personalityType === 'guardian' && 'Protector of digital realms'}
                  {results.personalityType === 'innovator' && 'Balancing progress with protection'}
                  {results.personalityType === 'skeptic' && 'Questioning the digital status quo'}
                  {results.personalityType === 'explorer' && 'Curiously charting safe paths'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-gold-500" />
            Security Recommendations
          </h3>

          <div className="space-y-4">
            {recommendations.slice(0, 5).map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  rec.priority === 'high'
                    ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20'
                    : rec.priority === 'medium'
                    ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/20'
                    : 'bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-dark-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    rec.priority === 'high'
                      ? 'bg-red-200 dark:bg-red-900/30'
                      : rec.priority === 'medium'
                      ? 'bg-amber-200 dark:bg-amber-900/30'
                      : 'bg-gray-200 dark:bg-dark-border'
                  }`}>
                    <CheckCircle className={`w-4 h-4 ${
                      rec.priority === 'high'
                        ? 'text-red-600 dark:text-red-400'
                        : rec.priority === 'medium'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-500 dark:text-dark-text-muted'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-dark-text-primary">
                      {rec.text}
                    </p>
                    <span className={`text-xs font-medium ${
                      rec.priority === 'high'
                        ? 'text-red-600 dark:text-red-400'
                        : rec.priority === 'medium'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-500 dark:text-dark-text-muted'
                    }`}>
                      {rec.category} - {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-6 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-gold-500" />
            Improvement Roadmap
          </h3>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-border" />
            <div className="space-y-6">
              {[
                { name: 'Start with the basics', desc: 'Complete all available assessments', complete: completedCount >= 4 },
                { name: 'Strengthen passwords', desc: 'Use unique, complex passwords for all accounts', complete: (results.passwordStrength ?? 0) >= 70 },
                { name: 'Enable 2FA', desc: 'Turn on two-factor authentication everywhere possible', complete: false },
                { name: 'Stay informed', desc: 'Keep up with security news and best practices', complete: false }
              ].map((step, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.complete
                      ? 'bg-emerald-500'
                      : 'bg-gray-200 dark:bg-dark-border'
                  }`}>
                    {step.complete ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-dark-text-muted">{i + 1}</span>
                    )}
                  </div>
                  <h4 className={`font-medium ${step.complete ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-dark-text-primary'}`}>
                    {step.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/assessments" className="flex-1">
            <Button variant="secondary" className="w-full gap-2">
              Back to Assessments
            </Button>
          </Link>
          <Button
            variant="danger"
            className="flex-1 gap-2"
            onClick={() => {
              if (confirm('Are you sure you want to reset all your progress?')) {
                resetResults()
              }
            }}
          >
            <RefreshCcw className="w-4 h-4" />
            Reset Progress
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
