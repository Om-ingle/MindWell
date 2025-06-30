import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Book, 
  Video, 
  Headphones,
  Heart,
  Shield,
  Users,
  ExternalLink,
  Search,
  Filter,
  Star
} from 'lucide-react'

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 free and confidential support for people in distress',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text message',
      available: '24/7'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information service',
      available: '24/7'
    }
  ]

  const resources = [
    {
      id: 1,
      title: 'Mindfulness Meditation Guide',
      description: 'Learn the basics of mindfulness meditation to reduce stress and anxiety',
      category: 'meditation',
      type: 'article',
      rating: 4.8,
      duration: '10 min read',
      icon: Book,
      link: '#'
    },
    {
      id: 2,
      title: 'Cognitive Behavioral Therapy Techniques',
      description: 'Practical CBT exercises you can do at home',
      category: 'therapy',
      type: 'video',
      rating: 4.9,
      duration: '25 min',
      icon: Video,
      link: '#'
    },
    {
      id: 3,
      title: 'Sleep Hygiene Podcast Series',
      description: 'Expert tips for better sleep and mental health',
      category: 'sleep',
      type: 'podcast',
      rating: 4.7,
      duration: '30 min',
      icon: Headphones,
      link: '#'
    },
    {
      id: 4,
      title: 'Anxiety Management Workbook',
      description: 'Comprehensive guide with exercises and worksheets',
      category: 'anxiety',
      type: 'workbook',
      rating: 4.6,
      duration: '2 hour read',
      icon: Book,
      link: '#'
    },
    {
      id: 5,
      title: 'Depression Support Group',
      description: 'Online community for peer support and shared experiences',
      category: 'support',
      type: 'community',
      rating: 4.5,
      duration: 'Ongoing',
      icon: Users,
      link: '#'
    },
    {
      id: 6,
      title: 'Stress Reduction Techniques',
      description: 'Quick and effective methods to manage daily stress',
      category: 'stress',
      type: 'video',
      rating: 4.8,
      duration: '15 min',
      icon: Video,
      link: '#'
    }
  ]

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'therapy', label: 'Therapy' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'stress', label: 'Stress' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'support', label: 'Support Groups' }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700'
      case 'video': return 'bg-red-100 text-red-700'
      case 'podcast': return 'bg-purple-100 text-purple-700'
      case 'workbook': return 'bg-green-100 text-green-700'
      case 'community': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-secondary-100 text-secondary-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Mental Health Resources
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Access professional resources, tools, and support to help you on your mental health journey
          </p>
        </motion.div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-danger-50 border border-danger-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-danger-600 mr-2" />
            <h2 className="text-xl font-semibold text-danger-800">Crisis Support - Available 24/7</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-danger-200">
                <h3 className="font-semibold text-danger-800 mb-2">{resource.name}</h3>
                <p className="text-2xl font-bold text-danger-600 mb-2">{resource.phone}</p>
                <p className="text-sm text-danger-700 mb-2">{resource.description}</p>
                <span className="inline-block bg-danger-100 text-danger-700 px-2 py-1 rounded text-xs font-medium">
                  {resource.available}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input pl-10 pr-8"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="card group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary-100 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <resource.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-secondary-600">{resource.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-secondary-600 mb-4 text-sm">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                  <span className="text-xs text-secondary-500">{resource.duration}</span>
                </div>
                <button className="text-primary-600 hover:text-primary-700 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <div className="p-4 bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Find a Therapist</h3>
            <p className="text-secondary-600 mb-4 text-sm">
              Connect with licensed mental health professionals in your area
            </p>
            <button className="btn-primary w-full">
              Search Therapists
            </button>
          </div>

          <div className="card text-center">
            <div className="p-4 bg-success-100 text-success-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Online Counseling</h3>
            <p className="text-secondary-600 mb-4 text-sm">
              Access professional counseling from the comfort of your home
            </p>
            <button className="btn-success w-full">
              Start Online Session
            </button>
          </div>

          <div className="card text-center">
            <div className="p-4 bg-warning-100 text-warning-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Support Groups</h3>
            <p className="text-secondary-600 mb-4 text-sm">
              Join peer support groups for shared experiences and community
            </p>
            <button className="btn-warning w-full">
              Find Groups
            </button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-secondary-50 border border-secondary-200 rounded-lg p-6 text-center"
        >
          <Shield className="h-8 w-8 text-secondary-600 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-secondary-800 mb-2">Important Note</h4>
          <p className="text-secondary-600 text-sm">
            These resources are for informational purposes only and are not a substitute for professional 
            medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers 
            with any questions you may have regarding a medical condition.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Resources