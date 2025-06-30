import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useAssessment } from '../context/AssessmentContext'
import { questions } from '../data/questions'

const Assessment = () => {
  const navigate = useNavigate()
  const {
    answers,
    currentQuestion,
    addAnswer,
    nextQuestion,
    previousQuestion,
    completeAssessment,
    setCurrentQuestion
  } = useAssessment()

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1

  useEffect(() => {
    // Load existing answer if available
    const existingAnswer = answers.find(a => a.questionId === currentQ?.id)
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.answer)
    } else {
      setSelectedAnswer(null)
    }
  }, [currentQuestion, answers, currentQ])

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value)
    setShowWarning(false)
  }

  const handleNext = () => {
    if (selectedAnswer === null) {
      setShowWarning(true)
      return
    }

    addAnswer({
      questionId: currentQ.id,
      answer: selectedAnswer,
      category: currentQ.category
    })

    if (isLastQuestion) {
      completeAssessment()
      navigate('/results')
    } else {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      previousQuestion()
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-danger-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Assessment Not Found</h2>
          <p className="text-secondary-600">Please return to the home page and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-secondary-900">Mental Health Assessment</h1>
            <span className="text-sm text-secondary-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2 mt-4">
            {questions.map((_, index) => {
              const isAnswered = answers.some(a => a.questionId === questions[index].id)
              const isCurrent = index === currentQuestion
              
              return (
                <button
                  key={index}
                  onClick={() => handleQuestionJump(index)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
                    isCurrent
                      ? 'bg-primary-600 text-white'
                      : isAnswered
                      ? 'bg-success-100 text-success-700 hover:bg-success-200'
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                >
                  {isAnswered && !isCurrent ? (
                    <CheckCircle className="h-4 w-4 mx-auto" />
                  ) : (
                    index + 1
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card mb-8"
          >
            <div className="mb-6">
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4 capitalize">
                {currentQ.category}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-secondary-900 leading-relaxed">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.value
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-secondary-300'
                    }`}>
                      {selectedAnswer === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {showWarning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg flex items-center space-x-2"
              >
                <AlertCircle className="h-5 w-5 text-warning-600" />
                <span className="text-warning-700">Please select an answer before continuing.</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
            {!isLastQuestion && <ChevronRight className="h-5 w-5 ml-2" />}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-500">
            Your responses are completely confidential and will help us provide personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Assessment