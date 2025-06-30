import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  Brain, 
  Heart, 
  Target, 
  Award,
  Plus,
  BarChart3,
  Clock,
  Smile
} from 'lucide-react'
import { useAssessment } from '../context/AssessmentContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const Dashboard = () => {
  const { result } = useAssessment()
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  // Mock data for demonstration
  const mockProgressData = [
    { date: '2024-01-01', anxiety: 65, depression: 45, stress: 70, wellbeing: 60 },
    { date: '2024-01-08', anxiety: 60, depression: 40, stress: 65, wellbeing: 65 },
    { date: '2024-01-15', anxiety: 55, depression: 35, stress: 60, wellbeing: 70 },
    { date: '2024-01-22', anxiety: 50, depression: 30, stress: 55, wellbeing: 75 },
    { date: '2024-01-29', anxiety: 45, depression: 25, stress: 50, wellbeing: 80 },
  ]

  const mockGoals = [
    { id: 1, title: 'Daily Meditation', progress: 75, target: 30, unit: 'days' },
    { id: 2, title: 'Exercise Sessions', progress: 60, target: 20, unit: 'sessions' },
    { id: 3, title: 'Sleep Quality', progress: 85, target: 8, unit: 'hours avg' },
    { id: 4, title: 'Mood Tracking', progress: 90, target: 30, unit: 'days' },
  ]

  const mockActivities = [
    { id: 1, type: 'meditation', title: 'Morning Meditation', duration: 15, completed: true, date: '2024-01-29' },
    { id: 2, type: 'exercise', title: 'Evening Walk', duration: 30, completed: true, date: '2024-01-29' },
    { id: 3, type: 'journaling', title: 'Gratitude Journal', duration: 10, completed: false, date: '2024-01-29' },
    { id: 4, type: 'breathing', title: 'Breathing Exercise', duration: 5, completed: true, date: '2024-01-28' },
  ]

  const stats = [
    {
      title: 'Current Streak',
      value: '12 days',
      icon: Award,
      color: 'text-success-600 bg-success-100'
    },
    {
      title: 'Total Sessions',
      value: '47',
      icon: Target,
      color: 'text-primary-600 bg-primary-100'
    },
    {
      title: 'Avg. Mood',
      value: '7.2/10',
      icon: Smile,
      color: 'text-warning-600 bg-warning-100'
    },
    {
      title: 'Time Invested',
      value: '23.5h',
      icon: Clock,
      color: 'text-purple-600 bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                Mental Health Dashboard
              </h1>
              <p className="text-secondary-600">
                Track your progress and maintain your mental wellbeing journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="input text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Log Activity
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary-600" />
              Progress Over Time
            </h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Anxiety</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Depression</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Stress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Wellbeing</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="anxiety" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="depression" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="stress" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="wellbeing" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Goals Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-primary-600" />
              Monthly Goals
            </h2>
            <div className="space-y-6">
              {mockGoals.map((goal) => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-secondary-900">{goal.title}</span>
                    <span className="text-sm text-secondary-600">
                      {Math.round((goal.progress / 100) * goal.target)}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <motion.div
                      className="bg-primary-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-primary-600" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.completed ? 'bg-success-500' : 'bg-secondary-300'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">{activity.title}</p>
                    <p className="text-sm text-secondary-600">
                      {activity.duration} min • {activity.date}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    activity.completed 
                      ? 'bg-success-100 text-success-700' 
                      : 'bg-warning-100 text-warning-700'
                  }`}>
                    {activity.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Current Assessment Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center">
              <Brain className="h-6 w-6 mr-2 text-primary-600" />
              Latest Assessment Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(result.categoryScores).map(([category, score]) => (
                <div key={category} className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {Math.round(score)}
                  </div>
                  <div className="text-sm text-secondary-600 capitalize">{category}</div>
                  <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                <strong>Risk Level:</strong> {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} • 
                <strong> Completed:</strong> {result.completedAt.toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard