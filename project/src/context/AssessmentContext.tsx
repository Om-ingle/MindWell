import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface AssessmentAnswer {
  questionId: number
  answer: number
  category: string
}

export interface AssessmentResult {
  overallScore: number
  categoryScores: {
    anxiety: number
    depression: number
    stress: number
    wellbeing: number
  }
  recommendations: string[]
  riskLevel: 'low' | 'moderate' | 'high'
  completedAt: Date
}

interface AssessmentContextType {
  answers: AssessmentAnswer[]
  currentQuestion: number
  isCompleted: boolean
  result: AssessmentResult | null
  addAnswer: (answer: AssessmentAnswer) => void
  nextQuestion: () => void
  previousQuestion: () => void
  completeAssessment: () => void
  resetAssessment: () => void
  setCurrentQuestion: (question: number) => void
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export const useAssessment = () => {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}

interface AssessmentProviderProps {
  children: ReactNode
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const addAnswer = (answer: AssessmentAnswer) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === answer.questionId)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = answer
        return updated
      }
      return [...prev, answer]
    })
  }

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1)
  }

  const previousQuestion = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1))
  }

  const calculateResult = (): AssessmentResult => {
    const categoryTotals = {
      anxiety: 0,
      depression: 0,
      stress: 0,
      wellbeing: 0
    }

    const categoryCounts = {
      anxiety: 0,
      depression: 0,
      stress: 0,
      wellbeing: 0
    }

    answers.forEach(answer => {
      const category = answer.category as keyof typeof categoryTotals
      categoryTotals[category] += answer.answer
      categoryCounts[category]++
    })

    const categoryScores = {
      anxiety: categoryCounts.anxiety > 0 ? (categoryTotals.anxiety / categoryCounts.anxiety) * 20 : 0,
      depression: categoryCounts.depression > 0 ? (categoryTotals.depression / categoryCounts.depression) * 20 : 0,
      stress: categoryCounts.stress > 0 ? (categoryTotals.stress / categoryCounts.stress) * 20 : 0,
      wellbeing: categoryCounts.wellbeing > 0 ? (categoryTotals.wellbeing / categoryCounts.wellbeing) * 20 : 0
    }

    const overallScore = (categoryScores.anxiety + categoryScores.depression + categoryScores.stress + (100 - categoryScores.wellbeing)) / 4

    let riskLevel: 'low' | 'moderate' | 'high' = 'low'
    if (overallScore > 70) riskLevel = 'high'
    else if (overallScore > 40) riskLevel = 'moderate'

    const recommendations = generateRecommendations(categoryScores, riskLevel)

    return {
      overallScore,
      categoryScores,
      recommendations,
      riskLevel,
      completedAt: new Date()
    }
  }

  const generateRecommendations = (scores: any, riskLevel: string): string[] => {
    const recommendations = []

    if (scores.anxiety > 60) {
      recommendations.push('Consider practicing deep breathing exercises and mindfulness meditation')
      recommendations.push('Try progressive muscle relaxation techniques')
    }

    if (scores.depression > 60) {
      recommendations.push('Engage in regular physical activity, even light walking')
      recommendations.push('Maintain social connections and seek support from friends or family')
    }

    if (scores.stress > 60) {
      recommendations.push('Implement time management strategies and prioritize tasks')
      recommendations.push('Take regular breaks and practice stress-reduction techniques')
    }

    if (scores.wellbeing < 40) {
      recommendations.push('Focus on activities that bring you joy and fulfillment')
      recommendations.push('Establish a consistent sleep schedule and healthy routine')
    }

    if (riskLevel === 'high') {
      recommendations.push('Consider speaking with a mental health professional')
      recommendations.push('Reach out to a crisis helpline if you need immediate support')
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining your positive mental health habits')
      recommendations.push('Stay connected with supportive relationships')
    }

    return recommendations
  }

  const completeAssessment = () => {
    const assessmentResult = calculateResult()
    setResult(assessmentResult)
    setIsCompleted(true)
  }

  const resetAssessment = () => {
    setAnswers([])
    setCurrentQuestion(0)
    setIsCompleted(false)
    setResult(null)
  }

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        currentQuestion,
        isCompleted,
        result,
        addAnswer,
        nextQuestion,
        previousQuestion,
        completeAssessment,
        resetAssessment,
        setCurrentQuestion
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}