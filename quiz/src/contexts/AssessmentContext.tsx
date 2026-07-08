import { createContext, useContext, useState, ReactNode } from 'react'

interface AssessmentResults {
  riskScore: number | null
  personalityType: string | null
  mythBustersScore: number | null
  passwordStrength: number | null
  phishingScore: number | null
  completedAssessments: string[]
}

interface AssessmentContextType {
  results: AssessmentResults
  updateRiskScore: (score: number) => void
  updatePersonalityType: (type: string) => void
  updateMythBustersScore: (score: number) => void
  updatePasswordStrength: (strength: number) => void
  updatePhishingScore: (score: number) => void
  markAssessmentComplete: (assessment: string) => void
  getTotalScore: () => number
  isAssessmentComplete: (assessment: string) => boolean
  resetResults: () => void
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

const initialResults: AssessmentResults = {
  riskScore: null,
  personalityType: null,
  mythBustersScore: null,
  passwordStrength: null,
  phishingScore: null,
  completedAssessments: []
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<AssessmentResults>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('assessmentResults')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return initialResults
        }
      }
    }
    return initialResults
  })

  const saveResults = (newResults: AssessmentResults) => {
    setResults(newResults)
    localStorage.setItem('assessmentResults', JSON.stringify(newResults))
  }

  const updateRiskScore = (score: number) => {
    saveResults({ ...results, riskScore: score })
  }

  const updatePersonalityType = (type: string) => {
    saveResults({ ...results, personalityType: type })
  }

  const updateMythBustersScore = (score: number) => {
    saveResults({ ...results, mythBustersScore: score })
  }

  const updatePasswordStrength = (strength: number) => {
    saveResults({ ...results, passwordStrength: strength })
  }

  const updatePhishingScore = (score: number) => {
    saveResults({ ...results, phishingScore: score })
  }

  const markAssessmentComplete = (assessment: string) => {
    if (!results.completedAssessments.includes(assessment)) {
      saveResults({
        ...results,
        completedAssessments: [...results.completedAssessments, assessment]
      })
    }
  }

  const getTotalScore = () => {
    const scores = [
      results.riskScore,
      results.mythBustersScore,
      results.passwordStrength,
      results.phishingScore
    ].filter(s => s !== null) as number[]
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const isAssessmentComplete = (assessment: string) => {
    return results.completedAssessments.includes(assessment)
  }

  const resetResults = () => {
    saveResults(initialResults)
  }

  return (
    <AssessmentContext.Provider value={{
      results,
      updateRiskScore,
      updatePersonalityType,
      updateMythBustersScore,
      updatePasswordStrength,
      updatePhishingScore,
      markAssessmentComplete,
      getTotalScore,
      isAssessmentComplete,
      resetResults
    }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
