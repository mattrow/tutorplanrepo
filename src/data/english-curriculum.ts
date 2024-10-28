interface Topic {
    topicName: string;
    topicDescription: string;
    order: number;
    status: "not started" | "in progress" | "completed";
  }
  
  interface LevelCurriculum {
    [key: string]: Topic[];
  }
  
  export const englishCurriculum: LevelCurriculum = {
      'A1': [
          {
            topicName: "The English Alphabet",
            topicDescription: "Learn the pronunciation of each letter; uppercase and lowercase letters.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Basic Greetings and Introductions",
            topicDescription: "Learn common greetings and how to introduce oneself.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Numbers and Counting",
            topicDescription: "Learn numbers 0-20 and practice simple counting exercises.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Days of the Week and Months",
            topicDescription: "Learn days of the week, months of the year, and talking about days and dates.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Colors and Shapes",
            topicDescription: "Learn basic colors and common shapes.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Classroom Objects and Instructions",
            topicDescription: "Learn vocabulary for classroom objects and understanding instructions.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Family and Relationships",
            topicDescription: "Learn family member vocabulary and practice describing family.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Personal Information",
            topicDescription: "Ask and answer questions about personal information; practice filling out forms.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Pronouns and Simple Sentences",
            topicDescription: "Learn subject pronouns and form simple sentences.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "Daily Routines",
            topicDescription: "Learn common verbs and talk about daily activities.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Present Simple Tense",
            topicDescription: "Understand the structure of the present simple tense; form affirmative and negative sentences.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Occupations and Jobs",
            topicDescription: "Learn vocabulary for occupations; describe jobs and workplaces.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Time and Schedules",
            topicDescription: "Tell time and discuss schedules.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Food and Drinks",
            topicDescription: "Learn common food and drink vocabulary; express likes and dislikes.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Shopping and Money",
            topicDescription: "Understand currency and prices; learn shopping phrases.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Describing People and Objects",
            topicDescription: "Use adjectives to describe people and objects.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Prepositions of Place",
            topicDescription: "Learn common prepositions; describe locations of objects.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Weather and Seasons",
            topicDescription: "Learn weather vocabulary; discuss weather conditions.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Modal Verbs: Can and Can't",
            topicDescription: "Express ability and make requests using 'can' and 'can't'.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Transportation",
            topicDescription: "Learn transportation vocabulary; discuss travel methods.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Health and Body",
            topicDescription: "Learn body parts; express ailments and health issues.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Hobbies and Interests",
            topicDescription: "Discuss common hobbies and interests; talk about preferences.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Present Continuous Tense",
            topicDescription: "Learn the present continuous tense to describe actions happening now.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Giving and Receiving Directions",
            topicDescription: "Use directional vocabulary; ask for and give directions.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Making Suggestions and Invitations",
            topicDescription: "Learn phrases to make suggestions and invitations; practice accepting and declining.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "Past Simple Tense",
            topicDescription: "Form and use the past simple tense with regular and irregular verbs.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Future Plans",
            topicDescription: "Use 'going to' to express future plans and intentions.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Comparatives and Superlatives",
            topicDescription: "Form comparatives and superlatives; make comparisons.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Expressions of Frequency",
            topicDescription: "Use adverbs of frequency; discuss habits and routines.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Modal Verbs: Must and Have To",
            topicDescription: "Express obligation and give advice using 'must' and 'have to'.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Asking Questions",
            topicDescription: "Form yes/no and wh- questions in different tenses.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "Conditional Sentences (Type 0 and 1)",
            topicDescription: "Learn conditional sentences to talk about real possibilities.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "Pronunciation Practice",
            topicDescription: "Practice difficult sounds; work on word stress and intonation.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Social Situations",
            topicDescription: "Use polite expressions; practice apologizing and responding.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Review and Practice Sessions",
            topicDescription: "Consolidate learned material; engage in role-playing conversations.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Cultural Aspects",
            topicDescription: "Understand English-speaking cultures; discuss cultural differences.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Reading Comprehension",
            topicDescription: "Read simple texts; answer comprehension questions.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Writing Practice",
            topicDescription: "Construct sentences; write short paragraphs about familiar topics.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Listening Exercises",
            topicDescription: "Practice understanding spoken English through listening activities.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Idioms and Expressions",
            topicDescription: "Learn common idioms; understand usage in context.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Technology and Media",
            topicDescription: "Learn vocabulary related to technology; discuss usage and preferences.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Emotions and Feelings",
            topicDescription: "Express emotions; describe situations and feelings.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Environment and Nature",
            topicDescription: "Learn nature vocabulary; discuss environmental topics.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "At the Restaurant",
            topicDescription: "Order food and drinks; understand menus and restaurant etiquette.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "Emergencies and Safety",
            topicDescription: "Use important phrases for emergencies; understand safety signs and warnings.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Housing and Accommodation",
            topicDescription: "Learn housing vocabulary; describe homes and living situations.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Celebrations and Events",
            topicDescription: "Discuss holidays and special events; plan an event.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Transport Timetables",
            topicDescription: "Read schedules; plan journeys using public transport.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Telephone Conversations",
            topicDescription: "Make phone calls; leave and take messages.",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Comprehensive Review",
            topicDescription: "Review all topics; address difficulties; prepare for the next level.",
            order: 50,
            status: "not started"
          }
        ],
        'A2': [
          {
            topicName: "Review of A2 Level Grammar",
            topicDescription: "Consolidate understanding of key A2 grammar topics.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Past Continuous Tense",
            topicDescription: "Learn the form and usage of the past continuous tense.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Present Perfect Tense",
            topicDescription: "Understand the structure and use of the present perfect tense.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Present Perfect vs Past Simple",
            topicDescription: "Differentiate between the present perfect and past simple tenses.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Future Forms: Will and Going To",
            topicDescription: "Learn future expressions using 'will' and 'going to'.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Future Continuous and Future Perfect",
            topicDescription: "Explore advanced future tenses for ongoing and completed actions.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Modal Verbs of Obligation and Advice",
            topicDescription: "Use 'should', 'must', 'have to', and 'ought to' correctly.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Modal Verbs of Possibility and Probability",
            topicDescription: "Express possibility and probability using 'might', 'may', 'could'.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Passive Voice: Present and Past Simple",
            topicDescription: "Understand and form passive sentences in simple tenses.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "Reported Speech: Statements",
            topicDescription: "Learn how to report statements in indirect speech.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Reported Speech: Questions and Commands",
            topicDescription: "Practice reporting questions and commands.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Zero and First Conditionals",
            topicDescription: "Use conditional sentences to talk about real situations.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Second Conditional",
            topicDescription: "Express unreal or hypothetical situations in the present or future.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Third Conditional",
            topicDescription: "Discuss unreal situations in the past using the third conditional.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Mixed Conditionals",
            topicDescription: "Combine different conditional forms to express complex ideas.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Gerunds and Infinitives",
            topicDescription: "Learn when to use gerunds and infinitives after certain verbs.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Relative Clauses: Defining and Non-defining",
            topicDescription: "Use relative clauses to add information about nouns.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Advanced Comparatives and Superlatives",
            topicDescription: "Explore more complex comparative structures.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Articles: Advanced Usage",
            topicDescription: "Master the use of 'a', 'an', and 'the' in various contexts.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Quantifiers and Determiners",
            topicDescription: "Use quantifiers like 'some', 'any', 'few', 'little' accurately.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Phrasal Verbs: Common Expressions",
            topicDescription: "Learn and practice common phrasal verbs.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Phrasal Verbs: Separable and Inseparable",
            topicDescription: "Understand the difference between separable and inseparable phrasal verbs.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Collocations with Common Verbs",
            topicDescription: "Learn collocations with 'make', 'do', 'take', etc.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Idiomatic Expressions",
            topicDescription: "Expand vocabulary with common idioms and expressions.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Vocabulary Development: Synonyms and Antonyms",
            topicDescription: "Enhance vocabulary by learning synonyms and antonyms.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "Vocabulary for Work and Employment",
            topicDescription: "Learn vocabulary related to jobs and the workplace.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Vocabulary for Travel and Tourism",
            topicDescription: "Discuss travel plans and experiences using appropriate vocabulary.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Vocabulary for Health and Medicine",
            topicDescription: "Talk about health issues and medical topics.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Vocabulary for Technology and Science",
            topicDescription: "Explore terms related to technology and scientific developments.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Vocabulary for Environment and Nature",
            topicDescription: "Discuss environmental issues and nature.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Expressing Opinions and Preferences",
            topicDescription: "Learn phrases to express opinions and preferences politely.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "Agreeing and Disagreeing Politely",
            topicDescription: "Practice language for agreeing and disagreeing in discussions.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "Making Suggestions and Recommendations",
            topicDescription: "Use language structures to make suggestions and give recommendations.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Formal and Informal Language",
            topicDescription: "Differentiate between formal and informal registers.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Writing Formal Emails and Letters",
            topicDescription: "Learn the structure and language of formal correspondence.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Writing Essays and Reports",
            topicDescription: "Develop skills for writing structured essays and reports.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Reading Comprehension Strategies",
            topicDescription: "Enhance reading skills with strategies for understanding texts.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Listening Comprehension Strategies",
            topicDescription: "Improve listening skills with focused practice.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Speaking Skills: Fluency and Pronunciation",
            topicDescription: "Work on fluency and clear pronunciation in spoken English.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Debate and Discussion Skills",
            topicDescription: "Engage in debates; practice expressing and defending viewpoints.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Cultural Awareness and Customs",
            topicDescription: "Explore cultural differences and social norms in English-speaking countries.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Describing Processes and Procedures",
            topicDescription: "Learn to describe processes step by step.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Describing Trends and Data",
            topicDescription: "Use language to describe charts, graphs, and trends.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "Emphasis and Inversion in Sentences",
            topicDescription: "Use inversion for emphasis and stylistic effect.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "Linking Words and Discourse Markers",
            topicDescription: "Connect ideas using conjunctions and discourse markers.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Question Tags",
            topicDescription: "Form and use question tags in conversation.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Emphatic Structures",
            topicDescription: "Use structures like 'What I need is...' for emphasis.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Passive Voice in Other Tenses",
            topicDescription: "Expand passive voice usage to other tenses and structures.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Reported Speech with Modal Verbs",
            topicDescription: "Report speech containing modal verbs accurately.",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Comprehensive Review and B1 Preparation",
            topicDescription: "Review all topics; address difficulties; prepare for B1 level transition.",
            order: 50,
            status: "not started"
          }
        ],
        'B1': [
          {
            topicName: "Review of B1 Level Grammar",
            topicDescription: "Consolidate understanding of key B1 grammar topics.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Advanced Tenses: Past Perfect Simple",
            topicDescription: "Learn the form and usage of the past perfect simple tense.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Advanced Tenses: Past Perfect Continuous",
            topicDescription: "Understand the past perfect continuous tense and its applications.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Future Perfect and Future Perfect Continuous",
            topicDescription: "Explore future tenses for actions completed before a certain time.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Conditionals: Mixed Conditionals",
            topicDescription: "Learn and practice mixed conditional sentences.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Wish and If Only Structures",
            topicDescription: "Express regrets and wishes about the present and past.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Modals of Deduction and Speculation",
            topicDescription: "Use modals to speculate about the present and past.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Advanced Passive Voice",
            topicDescription: "Use passive structures in various tenses and contexts.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Causative Structures",
            topicDescription: "Learn how to use causative verbs like 'have' and 'get'.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "Reported Speech: Advanced Structures",
            topicDescription: "Report statements, questions, and commands with complex tenses.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Relative Clauses: Advanced Usage",
            topicDescription: "Use complex relative clauses and omit relative pronouns.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Inversion for Emphasis",
            topicDescription: "Use inversion structures to add emphasis in sentences.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Gerunds and Infinitives: Advanced Usage",
            topicDescription: "Deepen understanding of gerunds and infinitives in different contexts.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Phrasal Verbs: Advanced",
            topicDescription: "Expand knowledge of complex phrasal verbs and their meanings.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Collocations and Fixed Expressions",
            topicDescription: "Learn common collocations and how to use them naturally.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Idioms and Proverbs",
            topicDescription: "Understand and use idiomatic expressions and proverbs.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Discourse Markers and Connectors",
            topicDescription: "Use discourse markers to organize speech and writing.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Nominalization",
            topicDescription: "Learn how to turn verbs and adjectives into nouns.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Emphatic Structures",
            topicDescription: "Use structures like 'It is/was... who/that...' for emphasis.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Hedging Language",
            topicDescription: "Use hedging expressions to soften statements.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Formal vs Informal Language",
            topicDescription: "Recognize and use appropriate register in different contexts.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Advanced Vocabulary: Synonyms and Antonyms",
            topicDescription: "Expand vocabulary with advanced synonyms and antonyms.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Word Formation",
            topicDescription: "Understand prefixes, suffixes, and root words to expand vocabulary.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Paraphrasing and Summarizing",
            topicDescription: "Learn techniques for rephrasing and condensing information.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Expressing Certainty and Uncertainty",
            topicDescription: "Use phrases to express different levels of certainty.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "Speculating and Deducing",
            topicDescription: "Practice language for making logical conclusions.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Negotiation Skills",
            topicDescription: "Learn phrases and strategies for effective negotiation.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Presentation Skills",
            topicDescription: "Develop skills for organizing and delivering presentations.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Debate and Persuasion",
            topicDescription: "Engage in debates; learn to persuade and argue points effectively.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Writing Formal Reports",
            topicDescription: "Learn the structure and language of formal reports.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Writing Proposals",
            topicDescription: "Understand how to write persuasive proposals.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "Essay Writing: Argumentative Essays",
            topicDescription: "Develop skills for writing structured argumentative essays.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "Complex Sentence Structures",
            topicDescription: "Use a variety of complex sentences to enhance writing and speaking.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Nuances of Modal Verbs",
            topicDescription: "Explore subtle differences in modal verb usage.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Subjunctive Mood",
            topicDescription: "Learn and use the subjunctive mood in English.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Conditionals in Reported Speech",
            topicDescription: "Report conditional sentences accurately.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Advanced Listening Skills",
            topicDescription: "Improve listening comprehension with advanced materials.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Pronunciation: Stress and Intonation",
            topicDescription: "Work on sentence stress, intonation patterns, and rhythm.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Understanding Humor and Sarcasm",
            topicDescription: "Recognize and interpret humor, sarcasm, and irony.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Interpreting Idiomatic Language",
            topicDescription: "Understand idioms and expressions in various contexts.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Cultural References in Language",
            topicDescription: "Explore how culture influences language and expressions.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Media and News Vocabulary",
            topicDescription: "Discuss current events using appropriate vocabulary.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Business English Basics",
            topicDescription: "Learn vocabulary and phrases commonly used in business contexts.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "Email Etiquette",
            topicDescription: "Master the conventions of professional email communication.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "Telephone and Conference Calls",
            topicDescription: "Develop skills for effective telephone communication.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Collaboration and Teamwork Language",
            topicDescription: "Use language that facilitates collaboration and teamwork.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Conflict Resolution Language",
            topicDescription: "Learn phrases and strategies to resolve conflicts diplomatically.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Advanced Reading Comprehension",
            topicDescription: "Analyze complex texts and infer meanings.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Expressing Emotions and Attitudes",
            topicDescription: "Use nuanced language to express a range of emotions and attitudes.",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Comprehensive Review and B2 Preparation",
            topicDescription: "Review all topics; address difficulties; prepare for B2 level transition.",
            order: 50,
            status: "not started"
          }
        ]
      ,// Curriculum topics for B2 level progressing to C1 level
        'B2': [
          {
            topicName: "Review of B2 Level Grammar",
            topicDescription: "Consolidate understanding of key B2 grammar topics.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Advanced Conditionals",
            topicDescription: "Explore mixed conditionals and their nuanced uses.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Inversion After Negative Adverbials",
            topicDescription: "Learn inversion structures for emphasis after negative adverbials.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Advanced Passive Structures",
            topicDescription: "Use complex passive forms, including reporting verbs and infinitives.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Cleft Sentences",
            topicDescription: "Understand and use cleft sentences for emphasis.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Nominalization in Academic Writing",
            topicDescription: "Use nominalization to create formal and academic tones.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Subjunctive Mood and Formal Structures",
            topicDescription: "Learn the subjunctive mood in formal contexts.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Advanced Modals for Past Speculation",
            topicDescription: "Use modals to speculate about past events.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Discourse Markers for Cohesion",
            topicDescription: "Use advanced discourse markers to improve cohesion in speech and writing.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "Ellipsis and Substitution",
            topicDescription: "Learn how to use ellipsis and substitution to avoid repetition.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Emphatic Do",
            topicDescription: "Use 'do', 'does', 'did' for emphasis in affirmative sentences.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Complex Relative Clauses",
            topicDescription: "Master the use of embedded and reduced relative clauses.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Advanced Reported Speech",
            topicDescription: "Report complex statements, questions, and mixed tenses.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Conditional Structures in Reported Speech",
            topicDescription: "Report conditional sentences accurately.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Advanced Phrasal Verbs",
            topicDescription: "Expand knowledge of idiomatic phrasal verbs and their usage.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Idioms and Fixed Expressions",
            topicDescription: "Learn and practice using advanced idiomatic expressions.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Metaphorical Language",
            topicDescription: "Understand and use metaphors and similes in context.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Word Formation: Advanced Prefixes and Suffixes",
            topicDescription: "Deepen vocabulary through advanced word formation techniques.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Collocations with Advanced Vocabulary",
            topicDescription: "Learn strong collocations to enhance language fluency.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Nuances of Similar Words",
            topicDescription: "Differentiate between words with similar meanings but different uses.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Paraphrasing for Clarity and Style",
            topicDescription: "Improve ability to restate information in varied ways.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Advanced Linking Words and Phrases",
            topicDescription: "Use sophisticated connectors to structure arguments and narratives.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Expressing Degrees of Certainty and Doubt",
            topicDescription: "Use nuanced language to express certainty, probability, and doubt.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Hedging and Softening Language",
            topicDescription: "Use hedging to make language more polite and less direct.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Formal and Informal Registers",
            topicDescription: "Switch between formal and informal language appropriately.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "Advanced Pronunciation: Connected Speech",
            topicDescription: "Improve fluency through understanding of connected speech patterns.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Stress and Intonation for Nuance",
            topicDescription: "Use stress and intonation to convey meaning and emotion.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Understanding Accents and Dialects",
            topicDescription: "Improve listening skills with exposure to various English accents.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Advanced Listening Comprehension",
            topicDescription: "Analyze and comprehend complex spoken English in various contexts.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Advanced Reading Comprehension Skills",
            topicDescription: "Interpret and analyze complex written texts and literary works.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Critical Thinking and Argumentation",
            topicDescription: "Develop skills to construct and deconstruct arguments critically.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "Writing Academic Essays",
            topicDescription: "Learn structures and styles for academic essay writing.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "Writing Professional Reports",
            topicDescription: "Develop skills to write formal reports for professional contexts.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Writing Persuasive Texts",
            topicDescription: "Craft compelling persuasive texts using advanced language techniques.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Advanced Presentation Skills",
            topicDescription: "Enhance presentation abilities with advanced language and techniques.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Public Speaking and Rhetoric",
            topicDescription: "Use rhetorical devices to improve public speaking skills.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Debate and Discussion Techniques",
            topicDescription: "Engage in high-level debates; practice defending complex viewpoints.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Intercultural Communication",
            topicDescription: "Navigate and understand cultural differences in communication.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Advanced Negotiation Skills",
            topicDescription: "Master language and strategies for high-level negotiations.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Idiomatic Expressions and Slang",
            topicDescription: "Understand and use idioms and slang in appropriate contexts.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Metaphors and Figurative Language",
            topicDescription: "Use figurative language to enhance expression and creativity.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Discourse Analysis",
            topicDescription: "Analyze language use in different types of discourse.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Pragmatics and Language Functions",
            topicDescription: "Understand how context influences the interpretation of meaning.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "Sociolinguistics",
            topicDescription: "Explore how language varies and changes in social contexts.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "English for Specific Purposes",
            topicDescription: "Learn specialized vocabulary and structures for fields like law, medicine, etc.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Media Literacy",
            topicDescription: "Critically analyze media messages and their language use.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Advanced Grammar Nuances",
            topicDescription: "Delve into the subtle complexities of English grammar.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Collocations and Chunks",
            topicDescription: "Improve fluency by learning common word combinations.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Expressing Subtle Emotions and Attitudes",
            topicDescription: "Use language to express nuanced emotions and attitudes effectively.",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Comprehensive Review and C1 Preparation",
            topicDescription: "Review all topics; address difficulties; prepare for C1 level transition.",
            order: 50,
            status: "not started"
          }
        ],
        // Curriculum topics for C1 level progressing to C2 level
        'C1': [
          {
            topicName: "Review of C1 Level Grammar",
            topicDescription: "Consolidate understanding of key C1 grammar topics.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Advanced Idiomatic Expressions",
            topicDescription: "Learn and practice using complex idioms in context.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Nuances of Meaning in Synonyms",
            topicDescription: "Differentiate between synonyms and understand subtle differences.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Advanced Collocations and Fixed Phrases",
            topicDescription: "Expand vocabulary with advanced collocations and set phrases.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Stylistic Devices in Writing and Speech",
            topicDescription: "Use rhetorical and stylistic devices to enhance communication.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Advanced Discourse Markers",
            topicDescription: "Use sophisticated discourse markers to structure ideas.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Use of Metaphor and Simile",
            topicDescription: "Understand and employ metaphors and similes effectively.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Understanding and Using Irony and Sarcasm",
            topicDescription: "Interpret and use irony and sarcasm appropriately.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Varieties of English: Dialects and Accents",
            topicDescription: "Explore different English dialects and accents globally.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "English Literature: An Overview",
            topicDescription: "Gain an overview of significant works in English literature.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Analysis of Literary Texts",
            topicDescription: "Develop skills to analyze and interpret literary texts.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Academic Writing: Research Papers",
            topicDescription: "Learn to structure and write academic research papers.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Academic Writing: Thesis Statements and Arguments",
            topicDescription: "Craft strong thesis statements and coherent arguments.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Critical Thinking and Argumentation",
            topicDescription: "Enhance critical thinking and logical reasoning skills.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Advanced Listening Skills: Lectures and Presentations",
            topicDescription: "Improve comprehension of complex spoken English.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Advanced Note-Taking Strategies",
            topicDescription: "Develop effective note-taking techniques for complex material.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Advanced Reading Comprehension: Inferential Skills",
            topicDescription: "Enhance ability to infer and interpret implicit meanings.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Advanced Vocabulary: Rare and Specialized Terms",
            topicDescription: "Expand vocabulary with less common and specialized words.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Lexical Semantics and Word Formation",
            topicDescription: "Study meaning in language and advanced word formation.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Pragmatics: Speech Acts and Implicature",
            topicDescription: "Understand how context influences meaning in communication.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Discourse Analysis: Coherence and Cohesion",
            topicDescription: "Analyze texts for coherence and cohesion at discourse level.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Sociolinguistics: Language and Society",
            topicDescription: "Explore the relationship between language and social factors.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Translation and Interpretation Skills",
            topicDescription: "Develop skills in translating and interpreting between languages.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Register and Style in Different Contexts",
            topicDescription: "Adapt language use to different contexts and audiences.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Advanced Pronunciation: Prosody and Rhythm",
            topicDescription: "Refine pronunciation focusing on prosody, stress, and rhythm.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "The Language of Humor",
            topicDescription: "Understand and use humor, jokes, and wordplay effectively.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Intercultural Communication Competence",
            topicDescription: "Develop skills to communicate effectively across cultures.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Rhetoric and Persuasion Techniques",
            topicDescription: "Use rhetorical devices to persuade and influence.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Media Literacy: Critical Analysis of Media",
            topicDescription: "Critically analyze media content and language use.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Debating Skills: Formal Debates",
            topicDescription: "Participate in formal debates; develop argumentation skills.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Presenting Complex Ideas Clearly",
            topicDescription: "Communicate complex ideas effectively to an audience.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "English for Specific Purposes: Legal English",
            topicDescription: "Learn specialized vocabulary and structures used in legal contexts.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "English for Specific Purposes: Medical English",
            topicDescription: "Understand and use medical terminology and communication.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Corpus Linguistics: Using Corpora for Language Learning",
            topicDescription: "Use language corpora to analyze and learn language patterns.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Advanced Grammar: Subtle Uses and Exceptions",
            topicDescription: "Explore rare grammatical structures and exceptions.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Writing Fiction and Creative Writing",
            topicDescription: "Develop creative writing skills in fiction and storytelling.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Editing and Proofreading Skills",
            topicDescription: "Learn techniques for editing and proofreading texts.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Lexical Precision and Connotation",
            topicDescription: "Choose words carefully to convey precise meanings.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Euphemisms and Taboo Language",
            topicDescription: "Understand and use euphemisms and recognize taboo language.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Historical Development of the English Language",
            topicDescription: "Explore the history and evolution of English.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Language Change and Evolution",
            topicDescription: "Understand how and why languages change over time.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Multimodal Communication",
            topicDescription: "Combine verbal and non-verbal cues effectively.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Politeness Strategies and Face Theory",
            topicDescription: "Apply politeness strategies in various communication contexts.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "Critical Discourse Analysis",
            topicDescription: "Analyze texts to reveal underlying ideologies and power relations.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "Phonetics and Phonology: Detailed Study",
            topicDescription: "Study the sounds of English in detail for pronunciation mastery.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Metalinguistic Awareness",
            topicDescription: "Develop awareness of language as a system and its functions.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Advanced Phrasal Verbs and Expressions",
            topicDescription: "Master complex phrasal verbs and idiomatic expressions.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Understanding Jokes, Puns, and Wordplay",
            topicDescription: "Interpret and create humor using language play.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Preparation for Proficiency Exams",
            topicDescription: "Prepare for C2 level proficiency exams (e.g., CPE).",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Comprehensive Review and C2 Preparation",
            topicDescription: "Review all topics; address difficulties; finalize C2 readiness.",
            order: 50,
            status: "not started"
          }
        ],
        // Curriculum topics for C2 level progressing to full fluency
        'C2': [
          {
            topicName: "Review of C2 Level Concepts",
            topicDescription: "Consolidate understanding of key C2 concepts and identify areas for improvement.",
            order: 1,
            status: "not started"
          },
          {
            topicName: "Mastering Regional Accents and Dialects",
            topicDescription: "Explore and practice various English accents and dialects.",
            order: 2,
            status: "not started"
          },
          {
            topicName: "Advanced Colloquialisms and Slang",
            topicDescription: "Learn and use colloquial expressions and slang in context.",
            order: 3,
            status: "not started"
          },
          {
            topicName: "Nuances of Intonation and Stress",
            topicDescription: "Perfect pronunciation with a focus on intonation and stress patterns.",
            order: 4,
            status: "not started"
          },
          {
            topicName: "Subtleties of Humor and Satire",
            topicDescription: "Understand and appreciate different forms of humor and satire.",
            order: 5,
            status: "not started"
          },
          {
            topicName: "Deep Dive into Idiomatic Language",
            topicDescription: "Master the use of complex idioms and phrasal expressions.",
            order: 6,
            status: "not started"
          },
          {
            topicName: "Advanced Pragmatics and Speech Acts",
            topicDescription: "Analyze language use in context; perform advanced speech acts.",
            order: 7,
            status: "not started"
          },
          {
            topicName: "Sociolinguistic Competence",
            topicDescription: "Understand how social factors influence language use.",
            order: 8,
            status: "not started"
          },
          {
            topicName: "Language and Identity",
            topicDescription: "Explore the relationship between language, culture, and identity.",
            order: 9,
            status: "not started"
          },
          {
            topicName: "Advanced Discourse Analysis",
            topicDescription: "Analyze complex texts and spoken discourse for deeper meaning.",
            order: 10,
            status: "not started"
          },
          {
            topicName: "Stylistic Nuances in Literature",
            topicDescription: "Examine stylistic devices used in classic and contemporary literature.",
            order: 11,
            status: "not started"
          },
          {
            topicName: "Creative Writing: Advanced Techniques",
            topicDescription: "Develop a unique writing style using advanced literary techniques.",
            order: 12,
            status: "not started"
          },
          {
            topicName: "Understanding and Creating Poetry",
            topicDescription: "Analyze poetic forms and compose original poetry.",
            order: 13,
            status: "not started"
          },
          {
            topicName: "Advanced Rhetorical Strategies",
            topicDescription: "Master rhetorical devices for persuasive speaking and writing.",
            order: 14,
            status: "not started"
          },
          {
            topicName: "Critical Analysis of Complex Texts",
            topicDescription: "Interpret and critique complex academic and literary texts.",
            order: 15,
            status: "not started"
          },
          {
            topicName: "Philosophical Concepts in Language",
            topicDescription: "Discuss philosophical ideas and their expression in language.",
            order: 16,
            status: "not started"
          },
          {
            topicName: "Advanced Debate and Argumentation",
            topicDescription: "Engage in sophisticated debates on abstract and complex topics.",
            order: 17,
            status: "not started"
          },
          {
            topicName: "Language Evolution and Etymology",
            topicDescription: "Study the history and evolution of words and expressions.",
            order: 18,
            status: "not started"
          },
          {
            topicName: "Cross-Cultural Communication Mastery",
            topicDescription: "Navigate and bridge cultural differences in communication.",
            order: 19,
            status: "not started"
          },
          {
            topicName: "Interpreting Nuanced Emotions and Tones",
            topicDescription: "Recognize and express subtle emotional cues and tones.",
            order: 20,
            status: "not started"
          },
          {
            topicName: "Advanced Listening: Authentic Materials",
            topicDescription: "Comprehend and analyze authentic audio from various sources.",
            order: 21,
            status: "not started"
          },
          {
            topicName: "Mastering Professional Jargon",
            topicDescription: "Learn specialized vocabulary in fields like finance, law, and tech.",
            order: 22,
            status: "not started"
          },
          {
            topicName: "Language Play and Word Games",
            topicDescription: "Engage in wordplay, puns, and linguistic creativity.",
            order: 23,
            status: "not started"
          },
          {
            topicName: "Advanced Translation and Interpretation",
            topicDescription: "Translate complex texts and interpret nuanced meanings.",
            order: 24,
            status: "not started"
          },
          {
            topicName: "Media and Film Analysis",
            topicDescription: "Critically analyze language use in media and films.",
            order: 25,
            status: "not started"
          },
          {
            topicName: "Advanced Academic Writing Skills",
            topicDescription: "Produce high-level academic papers with appropriate style and tone.",
            order: 26,
            status: "not started"
          },
          {
            topicName: "Language and Power Dynamics",
            topicDescription: "Explore how language reflects and influences power structures.",
            order: 27,
            status: "not started"
          },
          {
            topicName: "Exploring Multilingualism",
            topicDescription: "Understand the cognitive and social aspects of multilingualism.",
            order: 28,
            status: "not started"
          },
          {
            topicName: "Language Acquisition Theories",
            topicDescription: "Study theories behind how languages are learned and processed.",
            order: 29,
            status: "not started"
          },
          {
            topicName: "Dialectology: Regional Varieties",
            topicDescription: "Examine regional language variations and their characteristics.",
            order: 30,
            status: "not started"
          },
          {
            topicName: "Advanced Intercultural Pragmatics",
            topicDescription: "Master pragmatic competence across different cultures.",
            order: 31,
            status: "not started"
          },
          {
            topicName: "Language Policy and Planning",
            topicDescription: "Discuss how language policies affect societies and individuals.",
            order: 32,
            status: "not started"
          },
          {
            topicName: "Advanced Phonetics and Phonology",
            topicDescription: "Analyze speech sounds in detail for perfect pronunciation.",
            order: 33,
            status: "not started"
          },
          {
            topicName: "Neologisms and Language Innovation",
            topicDescription: "Explore newly coined words and how language adapts.",
            order: 34,
            status: "not started"
          },
          {
            topicName: "Forensic Linguistics",
            topicDescription: "Understand the role of language analysis in legal contexts.",
            order: 35,
            status: "not started"
          },
          {
            topicName: "Language and Technology",
            topicDescription: "Examine how technology influences language use and communication.",
            order: 36,
            status: "not started"
          },
          {
            topicName: "Advanced Stylistics",
            topicDescription: "Study style in language and its effects on interpretation.",
            order: 37,
            status: "not started"
          },
          {
            topicName: "Lexical Semantics: Deep Analysis",
            topicDescription: "Delve into word meanings and semantic relationships.",
            order: 38,
            status: "not started"
          },
          {
            topicName: "Cognitive Linguistics",
            topicDescription: "Explore the connection between language and cognitive processes.",
            order: 39,
            status: "not started"
          },
          {
            topicName: "Anthropological Linguistics",
            topicDescription: "Study language in the context of culture and human behavior.",
            order: 40,
            status: "not started"
          },
          {
            topicName: "Advanced Grammar: Stylistic Choices",
            topicDescription: "Use grammatical structures to achieve specific stylistic effects.",
            order: 41,
            status: "not started"
          },
          {
            topicName: "Ethnography of Communication",
            topicDescription: "Analyze communication practices within different cultures.",
            order: 42,
            status: "not started"
          },
          {
            topicName: "Discourse and Identity",
            topicDescription: "Examine how discourse shapes and reflects personal and group identities.",
            order: 43,
            status: "not started"
          },
          {
            topicName: "Language Acquisition: Bilingualism",
            topicDescription: "Understand the processes involved in acquiring multiple languages.",
            order: 44,
            status: "not started"
          },
          {
            topicName: "Advanced Metaphorical Language",
            topicDescription: "Master complex metaphors and their use in communication.",
            order: 45,
            status: "not started"
          },
          {
            topicName: "Critical Linguistics",
            topicDescription: "Analyze language critically to uncover hidden meanings and biases.",
            order: 46,
            status: "not started"
          },
          {
            topicName: "Expressing Complex Emotional States",
            topicDescription: "Articulate subtle and complex emotions effectively.",
            order: 47,
            status: "not started"
          },
          {
            topicName: "Language in Virtual Environments",
            topicDescription: "Understand communication dynamics in digital and virtual spaces.",
            order: 48,
            status: "not started"
          },
          {
            topicName: "Language Teaching Methodologies",
            topicDescription: "Explore different approaches to teaching and learning languages.",
            order: 49,
            status: "not started"
          },
          {
            topicName: "Final Review and Fluency Assessment",
            topicDescription: "Assess overall proficiency; identify final areas for improvement.",
            order: 50,
            status: "not started"
          }
        ]
      
      
      };
  
  // Helper function to get topics for a specific level
  export const getTopicsForLevel = (level: string): Topic[] => {
    return englishCurriculum[level] || [];
  };