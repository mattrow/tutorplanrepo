interface Topic {
  topicName: string;
  topicDescription: string;
  order: number;
  status: "not started" | "in progress" | "completed";
  type: "communication" | "vocabulary" | "grammar";
}

interface LevelCurriculum {
  [key: string]: Topic[];
}

export const portugueseCurriculum: LevelCurriculum = {
  'A1': [
    {
      topicName: "The Portuguese Alphabet and Pronunciation",
      topicDescription: "Learn the pronunciation of each letter; understand unique Portuguese sounds.",
      order: 1,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Basic Greetings and Introductions",
      topicDescription: "Learn common greetings and how to introduce oneself in Portuguese.",
      order: 2,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Numbers 0-100",
      topicDescription: "Learn how to count from zero to one hundred in Portuguese.",
      order: 3,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Days of the Week and Months",
      topicDescription: "Familiarize yourself with the days of the week and months of the year.",
      order: 4,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Basic Sentence Structure",
      topicDescription: "Understand the subject-verb-object order in Portuguese sentences.",
      order: 5,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Definite and Indefinite Articles",
      topicDescription: "Learn how to use 'o', 'a', 'um', 'uma' and their plural forms.",
      order: 6,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Gender and Number Agreement",
      topicDescription: "Understand how adjectives agree in gender and number with nouns.",
      order: 7,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Common Nouns",
      topicDescription: "Expand your vocabulary with everyday nouns.",
      order: 8,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Personal Pronouns",
      topicDescription: "Learn subject pronouns like 'eu', 'tu', 'ele', 'ela'.",
      order: 9,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Present Tense of Regular -AR Verbs",
      topicDescription: "Conjugate regular verbs ending in -AR in the present tense.",
      order: 10,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Present Tense of Regular -ER and -IR Verbs",
      topicDescription: "Conjugate regular verbs ending in -ER and -IR in the present tense.",
      order: 11,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "The Verbs 'Ser' and 'Estar'",
      topicDescription: "Learn the differences and uses of 'ser' and 'estar' (to be).",
      order: 12,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "The Verb 'Ter'",
      topicDescription: "Understand how to use the verb 'ter' (to have).",
      order: 13,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Possessive Adjectives",
      topicDescription: "Learn how to express possession (meu, sua, nosso, etc.).",
      order: 14,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Describing People and Objects",
      topicDescription: "Use adjectives to describe physical appearance and characteristics.",
      order: 15,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Colors and Shapes",
      topicDescription: "Expand your vocabulary with colors and basic shapes.",
      order: 16,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Family Vocabulary",
      topicDescription: "Learn words related to family members.",
      order: 17,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Asking Questions",
      topicDescription: "Formulate questions using interrogative words like 'quem', 'o que', 'onde'.",
      order: 18,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Telling Time",
      topicDescription: "Learn how to ask for and tell the time.",
      order: 19,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Daily Routines",
      topicDescription: "Discuss common daily activities and routines.",
      order: 20,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Basic Prepositions",
      topicDescription: "Use prepositions like 'em', 'de', 'para' in sentences.",
      order: 21,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Directions and Locations",
      topicDescription: "Learn how to give and understand directions.",
      order: 22,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Food and Drink Vocabulary",
      topicDescription: "Expand your vocabulary with common foods and beverages.",
      order: 23,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Ordering at a Restaurant",
      topicDescription: "Practice phrases for ordering food and drinks.",
      order: 24,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Likes and Dislikes",
      topicDescription: "Use verbs like 'gostar' to talk about preferences.",
      order: 25,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "The Verb 'Ir' (to go)",
      topicDescription: "Learn how to conjugate and use 'ir' in sentences.",
      order: 26,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Future with 'Ir' + Infinitive",
      topicDescription: "Express future actions using 'ir' + infinitive verb.",
      order: 27,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Weather and Seasons",
      topicDescription: "Discuss the weather and different seasons.",
      order: 28,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Hobbies and Leisure Activities",
      topicDescription: "Talk about hobbies and how you spend free time.",
      order: 29,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Preferences",
      topicDescription: "Use phrases to express preferences and make choices.",
      order: 30,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Modal Verbs: 'Poder', 'Querer', 'Dever'",
      topicDescription: "Learn how to use modal verbs to express ability, desire, and obligation.",
      order: 31,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Shopping Vocabulary",
      topicDescription: "Familiarize yourself with terms used in shopping contexts.",
      order: 32,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "At the Market",
      topicDescription: "Practice dialogues and phrases used when shopping at a market.",
      order: 33,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Past Tense: 'Pretérito Perfeito' of Regular Verbs",
      topicDescription: "Learn to conjugate regular verbs in the simple past tense.",
      order: 34,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Describing Past Events",
      topicDescription: "Talk about actions and events that happened in the past.",
      order: 35,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Occupations and Professions",
      topicDescription: "Expand your vocabulary with common jobs and professions.",
      order: 36,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Talking about Work and Studies",
      topicDescription: "Discuss your job, studies, and related activities.",
      order: 37,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "The Verb 'Fazer' (to do/make)",
      topicDescription: "Learn how to conjugate and use 'fazer' in various contexts.",
      order: 38,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Reflexive Verbs",
      topicDescription: "Understand how to use reflexive verbs in daily routines.",
      order: 39,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Health and Body Vocabulary",
      topicDescription: "Learn words related to health, body parts, and visiting a doctor.",
      order: 40,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Making Appointments",
      topicDescription: "Practice setting up appointments over the phone or in person.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Comparative and Superlative Forms",
      topicDescription: "Learn how to compare objects and people.",
      order: 42,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Opinions",
      topicDescription: "Use phrases to share your thoughts and opinions.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "The Verb 'Haver'",
      topicDescription: "Understand the uses of 'haver' in different contexts.",
      order: 44,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Necessity and Obligation",
      topicDescription: "Use expressions like 'ter que' and 'precisar de' to indicate necessity.",
      order: 45,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Transportation Vocabulary",
      topicDescription: "Learn terms related to different modes of transportation.",
      order: 46,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Travel and Vacation Plans",
      topicDescription: "Discuss future travel plans and destinations.",
      order: 47,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Invitations and Arrangements",
      topicDescription: "Practice inviting someone and making plans.",
      order: 48,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Basic Conjunctions and Connectors",
      topicDescription: "Use conjunctions like 'e', 'mas', 'ou' to connect ideas.",
      order: 49,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Review and Practice",
      topicDescription: "Consolidate your learning with review exercises and practice.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ],
  'A2': [
    {
      topicName: "Review of A1 Grammar and Vocabulary",
      topicDescription: "Consolidate previous knowledge before progressing to new material.",
      order: 1,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Past Tense: Pretérito Imperfeito",
      topicDescription: "Learn to conjugate verbs in the imperfect past tense and understand its uses.",
      order: 2,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Contrast Between Pretérito Perfeito and Imperfeito",
      topicDescription: "Understand the differences and uses of the two past tenses.",
      order: 3,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Irregular Verbs in Past Tense",
      topicDescription: "Learn common irregular verbs in the past tenses.",
      order: 4,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Talking About Past Events and Experiences",
      topicDescription: "Practice discussing past activities and life events.",
      order: 5,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Direct Object Pronouns",
      topicDescription: "Learn how to use 'me', 'te', 'o', 'a', 'nos', 'vos', 'os', 'as' in sentences.",
      order: 6,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Indirect Object Pronouns",
      topicDescription: "Understand and use indirect object pronouns like 'me', 'te', 'lhe', 'nos', 'vos', 'lhes'.",
      order: 7,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Combined Object Pronouns",
      topicDescription: "Learn how to use direct and indirect object pronouns together.",
      order: 8,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Separable and Inseparable Verbs",
      topicDescription: "Understand how pronouns attach to verbs in different tenses.",
      order: 9,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Feelings and Emotions",
      topicDescription: "Learn vocabulary and phrases to express emotions.",
      order: 10,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Reciprocal Verbs",
      topicDescription: "Understand verbs that express mutual actions.",
      order: 11,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Present Progressive Tense",
      topicDescription: "Learn to use 'estar' + gerund to describe ongoing actions.",
      order: 12,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Gerund and Past Participle Forms",
      topicDescription: "Understand how to form and use gerunds and past participles.",
      order: 13,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Future Intentions with 'Futuro do Presente'",
      topicDescription: "Learn the simple future tense and its conjugations.",
      order: 14,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Irregular Verbs in the Future Tense",
      topicDescription: "Study irregular verb forms in the future tense.",
      order: 15,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Making Predictions and Plans",
      topicDescription: "Practice discussing future events and making predictions.",
      order: 16,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Conditional Actions with 'Futuro do Pretérito'",
      topicDescription: "Learn the conditional tense to express hypothetical situations.",
      order: 17,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Giving Advice and Suggestions",
      topicDescription: "Use conditional forms to give advice or make polite suggestions.",
      order: 18,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Relative Pronouns",
      topicDescription: "Learn how to use 'que', 'quem', 'onde' to connect clauses.",
      order: 19,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Complex Sentence Structures",
      topicDescription: "Practice building more complex sentences using subordinate clauses.",
      order: 20,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Reported Speech",
      topicDescription: "Learn how to report what someone else has said.",
      order: 21,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Opinions and Preferences",
      topicDescription: "Use advanced phrases to share and discuss opinions.",
      order: 22,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Adverbs of Manner, Time, and Place",
      topicDescription: "Expand your use of adverbs to add detail to sentences.",
      order: 23,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Probability and Possibility",
      topicDescription: "Use phrases and modal verbs to talk about likelihood.",
      order: 24,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Impersonal Verbs and Expressions",
      topicDescription: "Learn how to use impersonal structures like 'é necessário', 'há'.",
      order: 25,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "The Subjunctive Mood: Present Subjunctive",
      topicDescription: "Introduction to the present subjunctive mood and its uses.",
      order: 26,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Triggers for the Subjunctive Mood",
      topicDescription: "Learn phrases and verbs that require the subjunctive.",
      order: 27,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Desires, Doubts, and Uncertainties",
      topicDescription: "Use the subjunctive to express subjective feelings.",
      order: 28,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Commands and Imperative Mood",
      topicDescription: "Learn how to give orders and make requests.",
      order: 29,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Polite Requests and Suggestions",
      topicDescription: "Practice making polite requests using conditional and subjunctive.",
      order: 30,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Formal vs. Informal Language",
      topicDescription: "Understand the differences in register and when to use each.",
      order: 31,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressions of Time and Sequencing",
      topicDescription: "Use connectors to sequence events and tell stories.",
      order: 32,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Idiomatic Expressions",
      topicDescription: "Learn common idioms and expressions used in daily language.",
      order: 33,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Describing Physical Appearance and Personality in Detail",
      topicDescription: "Expand vocabulary to give detailed descriptions of people.",
      order: 34,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Health and Medical Emergencies",
      topicDescription: "Learn how to discuss health issues and emergencies.",
      order: 35,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Emotions and Reactions",
      topicDescription: "Use advanced vocabulary to express feelings and reactions.",
      order: 36,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Comparatives and Superlatives with Irregular Forms",
      topicDescription: "Learn irregular comparative and superlative adjectives.",
      order: 37,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Passive Voice",
      topicDescription: "Understand how to form and use the passive voice in Portuguese.",
      order: 38,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Media and Communication Vocabulary",
      topicDescription: "Learn terms related to newspapers, television, and the internet.",
      order: 39,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Cause and Effect",
      topicDescription: "Use conjunctions and phrases to explain reasons and results.",
      order: 40,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Cultural Aspects of Portuguese-speaking Countries",
      topicDescription: "Explore traditions, holidays, and customs.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Environment and Sustainability Vocabulary",
      topicDescription: "Discuss environmental issues and solutions.",
      order: 42,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Opinions on Social Issues",
      topicDescription: "Engage in discussions about current events and societal topics.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Future Perfect Tense",
      topicDescription: "Learn how to express actions that will have been completed in the future.",
      order: 44,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Conditional Perfect Tense",
      topicDescription: "Discuss hypothetical situations in the past.",
      order: 45,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Regrets and Wishes",
      topicDescription: "Use appropriate tenses and structures to express regret and desires.",
      order: 46,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Indirect Speech",
      topicDescription: "Learn to report statements, questions, and commands indirectly.",
      order: 47,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Prepositions and Conjunctions",
      topicDescription: "Expand knowledge of complex prepositions and connectors.",
      order: 48,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Job Applications and Interviews",
      topicDescription: "Practice language used in professional contexts.",
      order: 49,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Review and Final Practice",
      topicDescription: "Consolidate A2 material with comprehensive exercises.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ],
  'B1': [
    {
      topicName: "Review of A2 Grammar and Vocabulary",
      topicDescription: "Reinforce previous knowledge to prepare for B1 topics.",
      order: 1,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Uses of the Subjunctive Mood",
      topicDescription: "Explore complex uses of the subjunctive in different contexts.",
      order: 2,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Past Subjunctive",
      topicDescription: "Learn to form and use the past subjunctive in sentences.",
      order: 3,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Sequence of Tenses with the Subjunctive",
      topicDescription: "Understand how to sequence tenses correctly when using the subjunctive.",
      order: 4,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Doubts and Uncertainties in the Past",
      topicDescription: "Use past subjunctive forms to express past doubts and uncertainties.",
      order: 5,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Imperfect and Pluperfect Subjunctive",
      topicDescription: "Learn the forms and uses of the imperfect and pluperfect subjunctive.",
      order: 6,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Conditional Sentences (If-clauses)",
      topicDescription: "Understand and use conditional sentences of different types.",
      order: 7,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Hypothetical Situations",
      topicDescription: "Practice discussing hypothetical scenarios and their outcomes.",
      order: 8,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Reflexive Verbs and Pronouns",
      topicDescription: "Deepen understanding of reflexive constructions and their nuances.",
      order: 9,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Causative Constructions",
      topicDescription: "Learn how to express causation using verbs like 'fazer' and 'deixar'.",
      order: 10,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Passive Voice with 'Ser' and 'Estar'",
      topicDescription: "Differentiate between passive constructions using 'ser' and 'estar'.",
      order: 11,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Vocabulary: Abstract Nouns",
      topicDescription: "Expand vocabulary with abstract nouns related to concepts and ideas.",
      order: 12,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Discussing Current Events",
      topicDescription: "Engage in conversations about news, politics, and global issues.",
      order: 13,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Art and Culture Vocabulary",
      topicDescription: "Learn terms related to art, literature, music, and cultural activities.",
      order: 14,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Opinions with Supporting Arguments",
      topicDescription: "Practice giving opinions and backing them up with reasons.",
      order: 15,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Indirect Questions",
      topicDescription: "Learn how to form and use indirect questions in conversations.",
      order: 16,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Reported Speech in Past Tenses",
      topicDescription: "Master reporting speech that was originally in past tenses.",
      order: 17,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Cause, Purpose, and Concession",
      topicDescription: "Use conjunctions and phrases to express complex relationships.",
      order: 18,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Narrative Tenses and Storytelling",
      topicDescription: "Practice using various past tenses to tell stories effectively.",
      order: 19,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Adjectives and Adverbs",
      topicDescription: "Enhance descriptions with advanced adjectives and adverbs.",
      order: 20,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Prefixes and Suffixes",
      topicDescription: "Learn common prefixes and suffixes to expand vocabulary.",
      order: 21,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Collocations and Fixed Expressions",
      topicDescription: "Understand and use common word combinations.",
      order: 22,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Certainty and Uncertainty",
      topicDescription: "Use modal verbs and phrases to express degrees of certainty.",
      order: 23,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Emphatic Structures",
      topicDescription: "Learn how to emphasize certain parts of a sentence.",
      order: 24,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Business and Finance Vocabulary",
      topicDescription: "Familiarize yourself with terms used in business contexts.",
      order: 25,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Writing Formal Letters and Emails",
      topicDescription: "Practice composing professional correspondence.",
      order: 26,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Prepositional Phrases",
      topicDescription: "Learn complex prepositional phrases to enhance speech and writing.",
      order: 27,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Phrasal Verbs and Idioms",
      topicDescription: "Study common phrasal verbs and idiomatic expressions.",
      order: 28,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Expressing Agreement and Disagreement",
      topicDescription: "Learn phrases to agree or disagree politely and assertively.",
      order: 29,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Conjunctions and Linking Words",
      topicDescription: "Use advanced connectors to improve cohesion in speech and writing.",
      order: 30,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Media and Technology Vocabulary",
      topicDescription: "Discuss topics related to technology, social media, and innovation.",
      order: 31,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Health and Wellness Discussions",
      topicDescription: "Engage in conversations about health, lifestyle, and well-being.",
      order: 32,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Emphasis and Contrast",
      topicDescription: "Learn structures to highlight or contrast information.",
      order: 33,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Legal and Political Terminology",
      topicDescription: "Acquire vocabulary related to law and politics.",
      order: 34,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Debate and Argumentation Skills",
      topicDescription: "Develop skills to participate in debates and structured arguments.",
      order: 35,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Emotions and Subtleties",
      topicDescription: "Use nuanced language to convey complex emotions.",
      order: 36,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Use of 'Ser' and 'Estar'",
      topicDescription: "Deepen understanding of 'ser' and 'estar' in various contexts.",
      order: 37,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Nuances of Modal Verbs",
      topicDescription: "Explore subtle differences in modal verb usage.",
      order: 38,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Dialectal Variations in Portuguese",
      topicDescription: "Learn about differences between European and Brazilian Portuguese.",
      order: 39,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Listening Comprehension",
      topicDescription: "Improve listening skills with complex audio materials.",
      order: 40,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Writing Essays and Reports",
      topicDescription: "Practice structuring and writing longer texts.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Cause and Effect in Writing",
      topicDescription: "Use advanced structures to explain reasons and consequences.",
      order: 42,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Discussing Literature and Film",
      topicDescription: "Engage in discussions about books and movies.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Grammar Review",
      topicDescription: "Reinforce and practice complex grammatical structures.",
      order: 44,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Public Speaking and Presentations",
      topicDescription: "Develop skills for speaking confidently in public.",
      order: 45,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Intercultural Communication",
      topicDescription: "Learn about cultural norms and how they affect communication.",
      order: 46,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Negotiation and Persuasion Techniques",
      topicDescription: "Practice language used in negotiations and persuasive contexts.",
      order: 47,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Slang and Colloquial Language",
      topicDescription: "Understand and use informal language appropriately.",
      order: 48,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Final Project Presentation",
      topicDescription: "Prepare and deliver a presentation on a chosen topic.",
      order: 49,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Comprehensive Review and Assessment",
      topicDescription: "Review all B1 material and assess progress.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ],
  'B2': [
    {
      topicName: "Review of B1 Grammar and Vocabulary",
      topicDescription: "Consolidate B1 knowledge to prepare for B2 material.",
      order: 1,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Subjunctive Mood: Future Subjunctive",
      topicDescription: "Learn the forms and uses of the future subjunctive in complex sentences.",
      order: 2,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Uses of Infinitives and Gerunds",
      topicDescription: "Deepen understanding of infinitive and gerund forms in various contexts.",
      order: 3,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Nuances of Tense and Aspect",
      topicDescription: "Explore subtle differences between tenses and aspects in Portuguese.",
      order: 4,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Conditional Sentences",
      topicDescription: "Learn to form complex conditional sentences and hypothetical scenarios.",
      order: 5,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Concession, Contrast, and Purpose",
      topicDescription: "Use advanced conjunctions to express complex relationships between ideas.",
      order: 6,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Reported Speech with Multiple Tenses",
      topicDescription: "Master reported speech involving various tenses and moods.",
      order: 7,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Cleft Sentences and Emphasis",
      topicDescription: "Learn to restructure sentences for emphasis using cleft constructions.",
      order: 8,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Relative Clauses and Pronouns in Depth",
      topicDescription: "Explore complex relative clauses and advanced pronoun usage.",
      order: 9,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Use of Conjunctions and Connectors",
      topicDescription: "Enhance cohesion in speech and writing with advanced connectors.",
      order: 10,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Passive Voice in Complex Structures",
      topicDescription: "Use passive voice in various tenses and complex sentence structures.",
      order: 11,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Modal Verbs and Expressions",
      topicDescription: "Express nuances of ability, permission, obligation, and probability.",
      order: 12,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Hypotheses and Speculations",
      topicDescription: "Use appropriate structures to discuss hypothetical situations.",
      order: 13,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Use of Prepositions",
      topicDescription: "Master complex prepositional phrases and their correct usage.",
      order: 14,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Colloquial Expressions and Slang",
      topicDescription: "Understand and appropriately use informal language and slang.",
      order: 15,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Idioms and Proverbs",
      topicDescription: "Learn common idiomatic expressions and proverbs.",
      order: 16,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Regional Variations in Portuguese",
      topicDescription: "Explore differences between European, Brazilian, and African Portuguese.",
      order: 17,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Formal and Informal Registers",
      topicDescription: "Understand how to adjust language according to context and audience.",
      order: 18,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Business Portuguese: Terminology and Practices",
      topicDescription: "Learn vocabulary and expressions used in professional settings.",
      order: 19,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Academic Portuguese: Writing and Comprehension",
      topicDescription: "Develop skills for reading and writing academic texts.",
      order: 20,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Legal Terminology and Concepts",
      topicDescription: "Familiarize yourself with basic legal terms and expressions.",
      order: 21,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Medical Portuguese: Terms and Communication",
      topicDescription: "Learn vocabulary related to healthcare and medical discussions.",
      order: 22,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Scientific and Technical Vocabulary",
      topicDescription: "Expand vocabulary in scientific and technical fields.",
      order: 23,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Journalism and Media Language",
      topicDescription: "Understand the style and vocabulary used in news and media.",
      order: 24,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Analyzing Literary Texts",
      topicDescription: "Develop skills to analyze and discuss literature.",
      order: 25,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Film and Cinematography Terminology",
      topicDescription: "Learn terms related to film and discuss cinematic works.",
      order: 26,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Discussing Art and Culture in Depth",
      topicDescription: "Engage in advanced discussions about art and cultural topics.",
      order: 27,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Environmental Issues and Vocabulary",
      topicDescription: "Discuss environmental topics and sustainability.",
      order: 28,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Social Issues and Debates",
      topicDescription: "Engage in debates about social issues and current events.",
      order: 29,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Opinions with Nuance",
      topicDescription: "Learn to express complex opinions and subtle distinctions.",
      order: 30,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Persuasion Techniques and Rhetoric",
      topicDescription: "Develop language skills for persuasion and effective argumentation.",
      order: 31,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Listening Comprehension: Native Speed",
      topicDescription: "Improve comprehension of native speakers at natural speed.",
      order: 32,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Humor, Irony, and Sarcasm",
      topicDescription: "Learn to recognize and use humor and irony in communication.",
      order: 33,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Negotiation Skills in Portuguese",
      topicDescription: "Practice language used in negotiations and reaching agreements.",
      order: 34,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Writing Formal Reports and Proposals",
      topicDescription: "Develop skills for writing professional documents.",
      order: 35,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Oral Presentations and Public Speaking",
      topicDescription: "Improve public speaking skills in Portuguese.",
      order: 36,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Pronunciation and Intonation",
      topicDescription: "Refine pronunciation and learn the nuances of intonation.",
      order: 37,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding and Using Figures of Speech",
      topicDescription: "Explore metaphors, similes, and other rhetorical devices.",
      order: 38,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Advanced Reading Comprehension: Complex Texts",
      topicDescription: "Practice reading and understanding advanced texts.",
      order: 39,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Strategies for Understanding Unknown Vocabulary",
      topicDescription: "Learn techniques to deduce meanings from context.",
      order: 40,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Translation Techniques",
      topicDescription: "Develop skills for translating between Portuguese and your native language.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Cross-Cultural Communication",
      topicDescription: "Understand cultural differences and their impact on communication.",
      order: 42,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Current Events and News Analysis",
      topicDescription: "Analyze and discuss recent news articles and broadcasts.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Portuguese Literature: Key Authors and Works",
      topicDescription: "Explore significant authors and their contributions to literature.",
      order: 44,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Preparing for Language Proficiency Exams",
      topicDescription: "Learn strategies and practice for standardized language tests.",
      order: 45,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Writing Essays and Dissertations",
      topicDescription: "Develop advanced writing skills for longer compositions.",
      order: 46,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Critical Thinking and Argumentation",
      topicDescription: "Enhance ability to construct and deconstruct arguments.",
      order: 47,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Complex Sentence Structures and Syntax",
      topicDescription: "Master advanced syntactic constructions.",
      order: 48,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Language of Advertising and Marketing",
      topicDescription: "Learn vocabulary and techniques used in marketing contexts.",
      order: 49,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Comprehensive Review and Assessment",
      topicDescription: "Review all B2 material and assess progress.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ],
  'C1': [
    {
      topicName: "Review of B2 Grammar and Vocabulary",
      topicDescription: "Consolidate B2 knowledge to prepare for C1 material.",
      order: 1,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Subjunctive Mood: Pluperfect Subjunctive",
      topicDescription: "Learn the forms and uses of the pluperfect subjunctive in complex sentences.",
      order: 2,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Conditional Structures",
      topicDescription: "Master complex conditional sentences and mixed conditionals.",
      order: 3,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Inversion and Emphatic Structures",
      topicDescription: "Use inversion and other emphatic devices for stylistic effect.",
      order: 4,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Nuances of Modal Verbs and Expressions",
      topicDescription: "Explore subtle meanings and uses of modal verbs in different contexts.",
      order: 5,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Subtle Differences in Meaning",
      topicDescription: "Learn to distinguish and convey subtle shades of meaning.",
      order: 6,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Idiomatic Expressions and Phrasal Verbs",
      topicDescription: "Deepen understanding of idioms and phrasal verbs used in advanced contexts.",
      order: 7,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Advanced Vocabulary: Collocations and Word Families",
      topicDescription: "Expand vocabulary with advanced collocations and related words.",
      order: 8,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Register and Style in Different Contexts",
      topicDescription: "Adjust language appropriately for formal, informal, and neutral contexts.",
      order: 9,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Nuances of Synonyms and Antonyms",
      topicDescription: "Learn subtle differences between similar words and their appropriate use.",
      order: 10,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Advanced Reading Comprehension: Literary Texts",
      topicDescription: "Analyze and interpret complex literary works.",
      order: 11,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Critical Analysis and Interpretation",
      topicDescription: "Develop skills to critically analyze texts and arguments.",
      order: 12,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Writing Skills: Essays and Reports",
      topicDescription: "Master writing coherent and cohesive essays and reports.",
      order: 13,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Discourse Markers and Cohesive Devices",
      topicDescription: "Use advanced discourse markers to improve text cohesion.",
      order: 14,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Listening Comprehension: Diverse Accents",
      topicDescription: "Understand spoken Portuguese from different regions and accents.",
      order: 15,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Nuances of Pronunciation and Intonation",
      topicDescription: "Refine pronunciation to express subtle meanings through intonation.",
      order: 16,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Hypothetical and Unreal Situations",
      topicDescription: "Use advanced grammatical structures to discuss hypothetical scenarios.",
      order: 17,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Metaphorical Language and Symbolism",
      topicDescription: "Understand and use metaphors and symbols in communication.",
      order: 18,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting Humor and Irony",
      topicDescription: "Develop skills to recognize and produce humor and irony.",
      order: 19,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Argumentation and Debate",
      topicDescription: "Engage in sophisticated debates, presenting and defending complex ideas.",
      order: 20,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Cultural References and Intertextuality",
      topicDescription: "Recognize and use cultural references in communication.",
      order: 21,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Grammar: Subjunctive in Set Phrases",
      topicDescription: "Learn fixed expressions that require the subjunctive mood.",
      order: 22,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Stylistic Devices in Writing",
      topicDescription: "Use rhetorical and stylistic devices to enhance writing.",
      order: 23,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Translation and Interpretation Skills",
      topicDescription: "Develop skills for translating and interpreting complex texts.",
      order: 24,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Sociolects and Register Variation",
      topicDescription: "Understand language variations based on social factors.",
      order: 25,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Analyzing Speeches and Discourses",
      topicDescription: "Study and critique speeches for content and delivery.",
      order: 26,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Certainty and Doubt with Subtlety",
      topicDescription: "Use language to express varying degrees of certainty and doubt.",
      order: 27,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Complex Sentence Structures and Syntax",
      topicDescription: "Master advanced sentence constructions for clarity and style.",
      order: 28,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Collocations and Fixed Expressions",
      topicDescription: "Expand knowledge of collocations and idiomatic phrases.",
      order: 29,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Professional and Academic Presentations",
      topicDescription: "Prepare and deliver high-level presentations.",
      order: 30,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Nuanced Emotions and Attitudes",
      topicDescription: "Use language to convey complex emotions and attitudes.",
      order: 31,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Use of Passive Voice",
      topicDescription: "Employ passive constructions for stylistic and functional purposes.",
      order: 32,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Legal and Formal Language Structures",
      topicDescription: "Understand and use language typical of legal and formal documents.",
      order: 33,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Dialectal Expressions and Regionalisms",
      topicDescription: "Recognize and use regional expressions appropriately.",
      order: 34,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Critical Discussions on Ethical Issues",
      topicDescription: "Engage in discussions on ethics, using appropriate language.",
      order: 35,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing and Interpreting Sarcasm",
      topicDescription: "Understand and appropriately use sarcasm in communication.",
      order: 36,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Discourse Analysis",
      topicDescription: "Analyze spoken and written discourse for structure and meaning.",
      order: 37,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Subtle Persuasion Techniques",
      topicDescription: "Learn language techniques for subtle and effective persuasion.",
      order: 38,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Complex Ideas Clearly",
      topicDescription: "Develop skills to articulate complex thoughts with clarity.",
      order: 39,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Negotiation Skills",
      topicDescription: "Master language used in high-level negotiations.",
      order: 40,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Implicit Meanings",
      topicDescription: "Learn to read between the lines and understand implied messages.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Pragmatics",
      topicDescription: "Study language use in context and its practical implications.",
      order: 42,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Language Change and Historical Linguistics",
      topicDescription: "Explore the evolution of Portuguese and its current trends.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Stylistic Variations in Different Text Types",
      topicDescription: "Adapt language style to suit various genres and audiences.",
      order: 44,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Language and Identity",
      topicDescription: "Examine how language reflects and shapes identity.",
      order: 45,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Error Analysis",
      topicDescription: "Identify and correct subtle errors in advanced language use.",
      order: 46,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Preparation for Proficiency Exams (C1 Level)",
      topicDescription: "Strategies and practice for C1 level language proficiency exams.",
      order: 47,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting and Producing Complex Texts",
      topicDescription: "Work with complex texts, both in comprehension and production.",
      order: 48,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Language for Specific Purposes",
      topicDescription: "Tailor language use for specific fields such as law, medicine, or business.",
      order: 49,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Comprehensive Review and Mastery",
      topicDescription: "Review all C1 material and prepare for advanced proficiency.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ],
  'C2': [
    {
      topicName: "Mastery of All Verb Tenses and Moods",
      topicDescription: "Achieve complete command over all verb tenses and moods, including rare and literary forms.",
      order: 1,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Nuanced Use of Subjunctive and Conditional",
      topicDescription: "Employ the subjunctive and conditional moods with subtlety and precision in complex contexts.",
      order: 2,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Advanced Syntax and Sentence Structures",
      topicDescription: "Manipulate complex sentence structures for stylistic and rhetorical effect.",
      order: 3,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Idiomatic and Colloquial Expressions",
      topicDescription: "Master a wide range of idiomatic expressions and colloquialisms used by native speakers.",
      order: 4,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Stylistic Nuances and Register Shifts",
      topicDescription: "Adjust language style and register effortlessly according to context and audience.",
      order: 5,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Cultural References and Intertextuality",
      topicDescription: "Understand and use cultural references, allusions, and intertextual elements.",
      order: 6,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Pragmatics and Discourse Strategies",
      topicDescription: "Navigate complex pragmatic aspects of communication, including implicature and politeness strategies.",
      order: 7,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Subtle Expression of Attitudes and Emotions",
      topicDescription: "Convey nuanced attitudes and emotions through tone, word choice, and rhetorical devices.",
      order: 8,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastery of Figurative Language",
      topicDescription: "Use metaphors, similes, irony, and other figurative language with native-like proficiency.",
      order: 9,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting and Using Humor",
      topicDescription: "Understand and create humor, including puns, wordplay, and cultural jokes.",
      order: 10,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Lexical Knowledge",
      topicDescription: "Possess an extensive vocabulary, including specialized and rare terms.",
      order: 11,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Specialized Terminology in Various Fields",
      topicDescription: "Master terminology in fields like law, medicine, science, and technology.",
      order: 12,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Literary Analysis and Criticism",
      topicDescription: "Analyze and critique complex literary texts and styles.",
      order: 13,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Writing Styles",
      topicDescription: "Produce clear, well-structured, and sophisticated texts in various styles and genres.",
      order: 14,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Academic and Professional Discourse",
      topicDescription: "Participate effectively in high-level academic and professional discussions.",
      order: 15,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting Nuanced Arguments",
      topicDescription: "Understand and analyze complex arguments and abstract concepts.",
      order: 16,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Expressing Complex Ideas Spontaneously",
      topicDescription: "Articulate complex ideas fluently and spontaneously without searching for expressions.",
      order: 17,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastery of Regional Variations",
      topicDescription: "Understand and use regional dialects and accents as appropriate.",
      order: 18,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Listening: Fast Speech and Overlapping Talk",
      topicDescription: "Comprehend fast-paced speech and conversations with overlapping dialogue.",
      order: 19,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Intercultural Competence",
      topicDescription: "Navigate intercultural communication with deep understanding of cultural nuances.",
      order: 20,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastery of Non-Verbal Communication",
      topicDescription: "Interpret and use body language and non-verbal cues effectively.",
      order: 21,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Translation Skills",
      topicDescription: "Translate complex texts accurately, capturing subtleties and stylistic nuances.",
      order: 22,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Simultaneous Interpretation",
      topicDescription: "Develop skills for real-time interpretation between Portuguese and your native language.",
      order: 23,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Critical Evaluation of Media",
      topicDescription: "Analyze and critique media content critically and thoughtfully.",
      order: 24,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Creating Persuasive and Impactful Messages",
      topicDescription: "Craft messages that persuade and impact audiences effectively.",
      order: 25,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Negotiating Complex Situations",
      topicDescription: "Handle negotiations involving subtle nuances and high stakes.",
      order: 26,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Public Speaking",
      topicDescription: "Deliver speeches and presentations with confidence and rhetorical finesse.",
      order: 27,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Obscure and Archaic Language",
      topicDescription: "Comprehend and appreciate older forms of Portuguese in literature and historical texts.",
      order: 28,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Sophisticated Use of Connectors and Cohesive Devices",
      topicDescription: "Employ a wide range of connectors to create highly cohesive discourse.",
      order: 29,
      status: "not started",
      type: "grammar"
    },
    {
      topicName: "Expressing Fine Shades of Meaning",
      topicDescription: "Distinguish and express subtle differences in meaning confidently.",
      order: 30,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding and Using Euphemisms",
      topicDescription: "Appropriately use euphemisms in sensitive or formal contexts.",
      order: 31,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastery of All Pronunciation Nuances",
      topicDescription: "Achieve near-native pronunciation, including intonation and rhythm.",
      order: 32,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting Literary and Poetic Language",
      topicDescription: "Understand and appreciate poetry and literary stylistic devices.",
      order: 33,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Participating in Intellectual Discussions",
      topicDescription: "Engage in high-level intellectual debates and discussions on complex topics.",
      order: 34,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Writing Creative and Imaginative Texts",
      topicDescription: "Compose stories, poems, or other creative texts with stylistic flair.",
      order: 35,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Implicit Cultural Norms",
      topicDescription: "Navigate implicit cultural expectations and social norms seamlessly.",
      order: 36,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Error Correction and Self-Monitoring",
      topicDescription: "Automatically notice and correct subtle errors in your own speech and writing.",
      order: 37,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Analyzing and Producing Academic Papers",
      topicDescription: "Read and write scholarly articles with appropriate academic conventions.",
      order: 38,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Specialized Lectures and Seminars",
      topicDescription: "Comprehend complex spoken information in academic or professional settings.",
      order: 39,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastering Nuances of Formal and Informal Speech",
      topicDescription: "Switch effortlessly between formal and informal registers as appropriate.",
      order: 40,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Participating in High-Level Professional Interactions",
      topicDescription: "Conduct business and professional interactions with native-level proficiency.",
      order: 41,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Understanding Humor in Different Cultures",
      topicDescription: "Appreciate and participate in humor across different Portuguese-speaking cultures.",
      order: 42,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Exploring Philosophical Texts",
      topicDescription: "Read and discuss complex philosophical works in Portuguese.",
      order: 43,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Interpreting and Using Symbolism",
      topicDescription: "Understand and employ symbolism in various forms of communication.",
      order: 44,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Advanced Lexical Relationships",
      topicDescription: "Master synonyms, antonyms, homonyms, and nuances in meaning.",
      order: 45,
      status: "not started",
      type: "vocabulary"
    },
    {
      topicName: "Participating in Cultural and Social Events",
      topicDescription: "Engage fully in social and cultural activities, understanding all nuances.",
      order: 46,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Adapting Language Use for Effect",
      topicDescription: "Modify language deliberately for humor, irony, or rhetorical effect.",
      order: 47,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Mastery of All Aspects of Language",
      topicDescription: "Demonstrate complete and effortless command of Portuguese in any context.",
      order: 48,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Final Comprehensive Assessment",
      topicDescription: "Assess overall proficiency at a near-native level across all skills.",
      order: 49,
      status: "not started",
      type: "communication"
    },
    {
      topicName: "Lifelong Learning Strategies",
      topicDescription: "Develop strategies to maintain and enhance language proficiency independently.",
      order: 50,
      status: "not started",
      type: "communication"
    }
  ]
};