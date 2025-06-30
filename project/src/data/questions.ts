export interface Question {
  id: number
  text: string
  category: 'anxiety' | 'depression' | 'stress' | 'wellbeing'
  options: {
    text: string
    value: number
  }[]
}

export const questions: Question[] = [
  // Anxiety Questions
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 2,
    text: "How often have you been unable to stop or control worrying?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 3,
    text: "How often do you worry too much about different things?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 4,
    text: "How often do you have trouble relaxing?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 5,
    text: "How often do you feel afraid that something awful might happen?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },

  // Depression Questions
  {
    id: 6,
    text: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
    category: "depression",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 7,
    text: "How often have you felt down, depressed, or hopeless?",
    category: "depression",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 8,
    text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    category: "depression",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 9,
    text: "How often have you felt tired or had little energy?",
    category: "depression",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 10,
    text: "How often have you had trouble concentrating on things?",
    category: "depression",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },

  // Stress Questions
  {
    id: 11,
    text: "How often have you felt overwhelmed by your responsibilities?",
    category: "stress",
    options: [
      { text: "Never", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Often", value: 3 }
    ]
  },
  {
    id: 12,
    text: "How often do you feel like you can't cope with daily pressures?",
    category: "stress",
    options: [
      { text: "Never", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Often", value: 3 }
    ]
  },
  {
    id: 13,
    text: "How often do you experience physical symptoms of stress (headaches, muscle tension)?",
    category: "stress",
    options: [
      { text: "Never", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Often", value: 3 }
    ]
  },
  {
    id: 14,
    text: "How often do you feel irritable or short-tempered?",
    category: "stress",
    options: [
      { text: "Never", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Often", value: 3 }
    ]
  },
  {
    id: 15,
    text: "How often do you have difficulty making decisions due to stress?",
    category: "stress",
    options: [
      { text: "Never", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Often", value: 3 }
    ]
  },

  // Wellbeing Questions
  {
    id: 16,
    text: "How often do you feel satisfied with your life?",
    category: "wellbeing",
    options: [
      { text: "Always", value: 3 },
      { text: "Often", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "Never", value: 0 }
    ]
  },
  {
    id: 17,
    text: "How often do you feel optimistic about your future?",
    category: "wellbeing",
    options: [
      { text: "Always", value: 3 },
      { text: "Often", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "Never", value: 0 }
    ]
  },
  {
    id: 18,
    text: "How often do you feel connected to others?",
    category: "wellbeing",
    options: [
      { text: "Always", value: 3 },
      { text: "Often", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "Never", value: 0 }
    ]
  },
  {
    id: 19,
    text: "How often do you engage in activities you enjoy?",
    category: "wellbeing",
    options: [
      { text: "Daily", value: 3 },
      { text: "Weekly", value: 2 },
      { text: "Monthly", value: 1 },
      { text: "Rarely", value: 0 }
    ]
  },
  {
    id: 20,
    text: "How often do you feel a sense of purpose in your life?",
    category: "wellbeing",
    options: [
      { text: "Always", value: 3 },
      { text: "Often", value: 2 },
      { text: "Sometimes", value: 1 },
      { text: "Never", value: 0 }
    ]
  }
]