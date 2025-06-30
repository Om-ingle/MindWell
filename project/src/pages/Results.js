"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const AssessmentContext_1 = require("../context/AssessmentContext");
const recharts_1 = require("recharts");
const Results = () => {
    const { result, resetAssessment } = (0, AssessmentContext_1.useAssessment)();
    if (!result) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <lucide_react_1.Brain className="h-16 w-16 text-primary-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">No Results Found</h2>
          <p className="text-secondary-600 mb-6">Please complete the assessment first.</p>
          <react_router_dom_1.Link to="/assessment" className="btn-primary">
            Take Assessment
          </react_router_dom_1.Link>
        </div>
      </div>);
    }
    const getRiskLevelColor = (level) => {
        switch (level) {
            case 'low': return 'text-success-600 bg-success-100';
            case 'moderate': return 'text-warning-600 bg-warning-100';
            case 'high': return 'text-danger-600 bg-danger-100';
            default: return 'text-secondary-600 bg-secondary-100';
        }
    };
    const getRiskLevelIcon = (level) => {
        switch (level) {
            case 'low': return lucide_react_1.CheckCircle;
            case 'moderate': return lucide_react_1.AlertTriangle;
            case 'high': return lucide_react_1.AlertTriangle;
            default: return lucide_react_1.Shield;
        }
    };
    const chartData = [
        { name: 'Anxiety', value: result.categoryScores.anxiety, color: '#ef4444' },
        { name: 'Depression', value: result.categoryScores.depression, color: '#f59e0b' },
        { name: 'Stress', value: result.categoryScores.stress, color: '#8b5cf6' },
        { name: 'Wellbeing', value: result.categoryScores.wellbeing, color: '#22c55e' }
    ];
    const barData = [
        { category: 'Anxiety', score: result.categoryScores.anxiety },
        { category: 'Depression', score: result.categoryScores.depression },
        { category: 'Stress', score: result.categoryScores.stress },
        { category: 'Wellbeing', score: result.categoryScores.wellbeing }
    ];
    const RiskIcon = getRiskLevelIcon(result.riskLevel);
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <lucide_react_1.CheckCircle className="h-4 w-4"/>
            <span>Assessment Complete</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Your Mental Health Report
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Based on your responses, here's a comprehensive analysis of your mental health status 
            with personalized recommendations.
          </p>
        </framer_motion_1.motion.div>

        {/* Overall Score Card */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="card mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <div className="text-3xl font-bold text-white">
                  {Math.round(result.overallScore)}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2">
                <div className={`p-2 rounded-full ${getRiskLevelColor(result.riskLevel)}`}>
                  <RiskIcon className="h-6 w-6"/>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Overall Mental Health Score
          </h2>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getRiskLevelColor(result.riskLevel)}`}>
            <span className="capitalize">{result.riskLevel} Risk Level</span>
          </div>
          <p className="text-secondary-600 mt-4 max-w-2xl mx-auto">
            Completed on {result.completedAt.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
          </p>
        </framer_motion_1.motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="card">
            <h3 className="text-xl font-semibold text-secondary-900 mb-6">Score Distribution</h3>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.PieChart>
                <recharts_1.Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${Math.round(value)}`}>
                  {chartData.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={entry.color}/>))}
                </recharts_1.Pie>
                <recharts_1.Tooltip />
              </recharts_1.PieChart>
            </recharts_1.ResponsiveContainer>
          </framer_motion_1.motion.div>

          {/* Bar Chart */}
          <framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="card">
            <h3 className="text-xl font-semibold text-secondary-900 mb-6">Category Breakdown</h3>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.BarChart data={barData}>
                <recharts_1.CartesianGrid strokeDasharray="3 3"/>
                <recharts_1.XAxis dataKey="category"/>
                <recharts_1.YAxis domain={[0, 100]}/>
                <recharts_1.Tooltip />
                <recharts_1.Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]}/>
              </recharts_1.BarChart>
            </recharts_1.ResponsiveContainer>
          </framer_motion_1.motion.div>
        </div>

        {/* Category Scores */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(result.categoryScores).map(([category, score], index) => {
            const getScoreColor = (score) => {
                if (score < 30)
                    return 'text-success-600 bg-success-100';
                if (score < 60)
                    return 'text-warning-600 bg-warning-100';
                return 'text-danger-600 bg-danger-100';
            };
            return (<div key={category} className="card text-center">
                <h4 className="text-lg font-semibold text-secondary-900 mb-3 capitalize">
                  {category}
                </h4>
                <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(score)}`}>
                  {Math.round(score)}
                </div>
                <div className="mt-2 text-sm text-secondary-600">
                  {score < 30 ? 'Good' : score < 60 ? 'Moderate' : 'Needs Attention'}
                </div>
              </div>);
        })}
        </framer_motion_1.motion.div>

        {/* Recommendations */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="card mb-8">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center">
            <lucide_react_1.TrendingUp className="h-6 w-6 mr-2 text-primary-600"/>
            Personalized Recommendations
          </h3>
          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (<div key={index} className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
                <lucide_react_1.CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0"/>
                <p className="text-secondary-700">{recommendation}</p>
              </div>))}
          </div>
        </framer_motion_1.motion.div>

        {/* Action Buttons */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <react_router_dom_1.Link to="/dashboard" className="btn-primary">
            <lucide_react_1.Heart className="h-5 w-5 mr-2"/>
            View Dashboard
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/resources" className="btn-secondary">
            <lucide_react_1.ArrowRight className="h-5 w-5 mr-2"/>
            Get Help & Resources
          </react_router_dom_1.Link>
          <button onClick={resetAssessment} className="btn-secondary">
            Retake Assessment
          </button>
        </framer_motion_1.motion.div>

        {/* Disclaimer */}
        <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="bg-warning-50 border border-warning-200 rounded-lg p-6 text-center">
          <lucide_react_1.AlertTriangle className="h-8 w-8 text-warning-600 mx-auto mb-4"/>
          <h4 className="text-lg font-semibold text-warning-800 mb-2">Important Disclaimer</h4>
          <p className="text-warning-700 text-sm">
            This assessment is for informational purposes only and is not a substitute for professional 
            medical advice, diagnosis, or treatment. If you're experiencing severe symptoms or having 
            thoughts of self-harm, please seek immediate professional help or contact a crisis helpline.
          </p>
        </framer_motion_1.motion.div>
      </div>
    </div>);
};
exports.default = Results;
