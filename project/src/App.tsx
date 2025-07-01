import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import { AssessmentProvider } from './context/AssessmentContext'

function App() {
  return (
    <AssessmentProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </motion.main>
      </div>
    </AssessmentProvider>
  )
}

export default App