"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const AssessmentContext_1 = require("../context/AssessmentContext");
const questions_1 = require("../data/questions");
const Assessment = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { answers, currentQuestion, addAnswer, nextQuestion, previousQuestion, completeAssessment, setCurrentQuestion } = (0, AssessmentContext_1.useAssessment)();
    const [selectedAnswer, setSelectedAnswer] = (0, react_1.useState)(null);
    const [showWarning, setShowWarning] = (0, react_1.useState)(false);
    const currentQ = questions_1.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions_1.questions.length) * 100;
    const isLastQuestion = currentQuestion === questions_1.questions.length - 1;
    (0, react_1.useEffect)(() => {
        // Load existing answer if available
        const existingAnswer = answers.find(a => a.questionId === (currentQ === null || currentQ === void 0 ? void 0 : currentQ.id));
        if (existingAnswer) {
            setSelectedAnswer(existingAnswer.answer);
        }
        else {
            setSelectedAnswer(null);
        }
    }, [currentQuestion, answers, currentQ]);
    const handleAnswerSelect = (value) => {
        setSelectedAnswer(value);
        setShowWarning(false);
    };
    const handleNext = () => {
        if (selectedAnswer === null) {
            setShowWarning(true);
            return;
        }
        addAnswer({
            questionId: currentQ.id,
            answer: selectedAnswer,
            category: currentQ.category
        });
        if (isLastQuestion) {
            completeAssessment();
            navigate('/results');
        }
        else {
            nextQuestion();
        }
    };
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            previousQuestion();
        }
    };
    const handleQuestionJump = (questionIndex) => {
        setCurrentQuestion(questionIndex);
    };
    if (!currentQ) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <lucide_react_1.AlertCircle className="h-16 w-16 text-danger-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Assessment Not Found</h2>
          <p className="text-secondary-600">Please return to the home page and try again.</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-secondary-900">Mental Health Assessment</h1>
            <span className="text-sm text-secondary-600">
              Question {currentQuestion + 1} of {questions_1.questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <framer_motion_1.motion.div className="bg-primary-600 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}/>
          </div>
          
          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2 mt-4">
            {questions_1.questions.map((_, index) => {
            const isAnswered = answers.some(a => a.questionId === questions_1.questions[index].id);
            const isCurrent = index === currentQuestion;
            return (<button key={index} onClick={() => handleQuestionJump(index)} className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${isCurrent
                    ? 'bg-primary-600 text-white'
                    : isAnswered
                        ? 'bg-success-100 text-success-700 hover:bg-success-200'
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}>
                  {isAnswered && !isCurrent ? (<lucide_react_1.CheckCircle className="h-4 w-4 mx-auto"/>) : (index + 1)}
                </button>);
        })}
          </div>
        </div>

        {/* Question Card */}
        <framer_motion_1.AnimatePresence mode="wait">
          <framer_motion_1.motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="card mb-8">
            <div className="mb-6">
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4 capitalize">
                {currentQ.category}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-secondary-900 leading-relaxed">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (<framer_motion_1.motion.button key={index} onClick={() => handleAnswerSelect(option.value)} className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-primary-25'}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswer === option.value
                ? 'border-primary-500 bg-primary-500'
                : 'border-secondary-300'}`}>
                      {selectedAnswer === option.value && (<div className="w-2 h-2 bg-white rounded-full"/>)}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </framer_motion_1.motion.button>))}
            </div>

            {showWarning && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg flex items-center space-x-2">
                <lucide_react_1.AlertCircle className="h-5 w-5 text-warning-600"/>
                <span className="text-warning-700">Please select an answer before continuing.</span>
              </framer_motion_1.motion.div>)}
          </framer_motion_1.motion.div>
        </framer_motion_1.AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button onClick={handlePrevious} disabled={currentQuestion === 0} className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed">
            <lucide_react_1.ChevronLeft className="h-5 w-5 mr-2"/>
            Previous
          </button>

          <button onClick={handleNext} className="btn-primary">
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
            {!isLastQuestion && <lucide_react_1.ChevronRight className="h-5 w-5 ml-2"/>}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-500">
            Your responses are completely confidential and will help us provide personalized recommendations.
          </p>
        </div>
      </div>
    </div>);
};
exports.default = Assessment;
