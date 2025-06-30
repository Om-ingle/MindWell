"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const Home = () => {
    const features = [
        {
            icon: lucide_react_1.Brain,
            title: 'Scientific Assessment',
            description: 'Evidence-based questionnaires validated by mental health professionals'
        },
        {
            icon: lucide_react_1.Shield,
            title: 'Privacy First',
            description: 'Your data is secure and private. We never share your personal information'
        },
        {
            icon: lucide_react_1.Heart,
            title: 'Personalized Insights',
            description: 'Get tailored recommendations based on your unique mental health profile'
        },
        {
            icon: lucide_react_1.Users,
            title: 'Professional Resources',
            description: 'Connect with qualified mental health professionals when you need support'
        }
    ];
    const benefits = [
        'Understand your mental health patterns',
        'Track your progress over time',
        'Get personalized coping strategies',
        'Access professional resources',
        'Maintain complete privacy and control'
    ];
    return (<div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <lucide_react_1.Star className="h-4 w-4"/>
                <span>Trusted by thousands of users</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
                Your Mental Health
                <span className="text-primary-600 block">Matters</span>
              </h1>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
                Take control of your mental wellbeing with our comprehensive, science-based assessment tool. 
                Get personalized insights and professional recommendations in just 10 minutes.
              </p>
            </framer_motion_1.motion.div>

            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <react_router_dom_1.Link to="/assessment" className="btn-primary text-lg px-8 py-4 group">
                Start Assessment
                <lucide_react_1.ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/resources" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </react_router_dom_1.Link>
            </framer_motion_1.motion.div>

            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-secondary-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">10 min</div>
                    <div className="text-secondary-600">Quick Assessment</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-success-600 mb-2">100%</div>
                    <div className="text-secondary-600">Private & Secure</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-warning-600 mb-2">24/7</div>
                    <div className="text-secondary-600">Available Support</div>
                  </div>
                </div>
              </div>
            </framer_motion_1.motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose MindWell?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge psychology with user-friendly design to provide 
              you with the most accurate and helpful mental health insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (<framer_motion_1.motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="card text-center group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-8 w-8"/>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </framer_motion_1.motion.div>))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Take the First Step Towards Better Mental Health
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Our comprehensive assessment helps you understand your mental health status 
                and provides actionable insights for improvement.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (<framer_motion_1.motion.li key={benefit} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-center space-x-3">
                    <lucide_react_1.CheckCircle className="h-6 w-6 text-success-600 flex-shrink-0"/>
                    <span className="text-secondary-700">{benefit}</span>
                  </framer_motion_1.motion.li>))}
              </ul>
            </framer_motion_1.motion.div>

            <framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
                <p className="text-primary-100 mb-6">
                  Join thousands of people who have taken control of their mental health journey.
                </p>
                <react_router_dom_1.Link to="/assessment" className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors group">
                  Start Your Assessment
                  <lucide_react_1.ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                </react_router_dom_1.Link>
              </div>
            </framer_motion_1.motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Your Mental Health Journey Starts Here
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Take the first step towards understanding and improving your mental wellbeing. 
              Our assessment is completely free, private, and takes just 10 minutes.
            </p>
            <react_router_dom_1.Link to="/assessment" className="btn-primary text-lg px-8 py-4 group">
              Begin Assessment Now
              <lucide_react_1.ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
            </react_router_dom_1.Link>
          </framer_motion_1.motion.div>
        </div>
      </section>
    </div>);
};
exports.default = Home;
