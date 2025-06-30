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
exports.AssessmentProvider = exports.useAssessment = void 0;
const react_1 = __importStar(require("react"));
const AssessmentContext = (0, react_1.createContext)(undefined);
const useAssessment = () => {
    const context = (0, react_1.useContext)(AssessmentContext);
    if (!context) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
};
exports.useAssessment = useAssessment;
const AssessmentProvider = ({ children }) => {
    const [answers, setAnswers] = (0, react_1.useState)([]);
    const [currentQuestion, setCurrentQuestion] = (0, react_1.useState)(0);
    const [isCompleted, setIsCompleted] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const addAnswer = (answer) => {
        setAnswers(prev => {
            const existing = prev.findIndex(a => a.questionId === answer.questionId);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = answer;
                return updated;
            }
            return [...prev, answer];
        });
    };
    const nextQuestion = () => {
        setCurrentQuestion(prev => prev + 1);
    };
    const previousQuestion = () => {
        setCurrentQuestion(prev => Math.max(0, prev - 1));
    };
    const calculateResult = () => {
        const categoryTotals = {
            anxiety: 0,
            depression: 0,
            stress: 0,
            wellbeing: 0
        };
        const categoryCounts = {
            anxiety: 0,
            depression: 0,
            stress: 0,
            wellbeing: 0
        };
        answers.forEach(answer => {
            const category = answer.category;
            categoryTotals[category] += answer.answer;
            categoryCounts[category]++;
        });
        const categoryScores = {
            anxiety: categoryCounts.anxiety > 0 ? (categoryTotals.anxiety / categoryCounts.anxiety) * 20 : 0,
            depression: categoryCounts.depression > 0 ? (categoryTotals.depression / categoryCounts.depression) * 20 : 0,
            stress: categoryCounts.stress > 0 ? (categoryTotals.stress / categoryCounts.stress) * 20 : 0,
            wellbeing: categoryCounts.wellbeing > 0 ? (categoryTotals.wellbeing / categoryCounts.wellbeing) * 20 : 0
        };
        const overallScore = (categoryScores.anxiety + categoryScores.depression + categoryScores.stress + (100 - categoryScores.wellbeing)) / 4;
        let riskLevel = 'low';
        if (overallScore > 70)
            riskLevel = 'high';
        else if (overallScore > 40)
            riskLevel = 'moderate';
        const recommendations = generateRecommendations(categoryScores, riskLevel);
        return {
            overallScore,
            categoryScores,
            recommendations,
            riskLevel,
            completedAt: new Date()
        };
    };
    const generateRecommendations = (scores, riskLevel) => {
        const recommendations = [];
        if (scores.anxiety > 60) {
            recommendations.push('Consider practicing deep breathing exercises and mindfulness meditation');
            recommendations.push('Try progressive muscle relaxation techniques');
        }
        if (scores.depression > 60) {
            recommendations.push('Engage in regular physical activity, even light walking');
            recommendations.push('Maintain social connections and seek support from friends or family');
        }
        if (scores.stress > 60) {
            recommendations.push('Implement time management strategies and prioritize tasks');
            recommendations.push('Take regular breaks and practice stress-reduction techniques');
        }
        if (scores.wellbeing < 40) {
            recommendations.push('Focus on activities that bring you joy and fulfillment');
            recommendations.push('Establish a consistent sleep schedule and healthy routine');
        }
        if (riskLevel === 'high') {
            recommendations.push('Consider speaking with a mental health professional');
            recommendations.push('Reach out to a crisis helpline if you need immediate support');
        }
        if (recommendations.length === 0) {
            recommendations.push('Continue maintaining your positive mental health habits');
            recommendations.push('Stay connected with supportive relationships');
        }
        return recommendations;
    };
    const completeAssessment = () => {
        const assessmentResult = calculateResult();
        setResult(assessmentResult);
        setIsCompleted(true);
    };
    const resetAssessment = () => {
        setAnswers([]);
        setCurrentQuestion(0);
        setIsCompleted(false);
        setResult(null);
    };
    return (<AssessmentContext.Provider value={{
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
        }}>
      {children}
    </AssessmentContext.Provider>);
};
exports.AssessmentProvider = AssessmentProvider;
