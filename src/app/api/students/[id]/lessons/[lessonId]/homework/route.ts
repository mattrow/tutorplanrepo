// src/app/api/students/[id]/lessons/[lessonId]/homework/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import OpenAI from 'openai';
import fetch from 'node-fetch';

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; lessonId: string } }
) {
  try {
    const studentId = params.id;
    const lessonId = params.lessonId;

    // Authenticate the user
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Fetch the lesson plan
    const studentRef = firestore
      .collection('users')
      .doc(userId)
      .collection('students')
      .doc(studentId);

    const studentDoc = await studentRef.get();
    const studentData = studentDoc.data();

    if (!studentData) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const { currentLevel, language } = studentData;

    const levelRef = studentRef
      .collection('subject')
      .doc(language.toLowerCase())
      .collection('levels')
      .doc(currentLevel);

    const levelDoc = await levelRef.get();
    const levelData = levelDoc.data();

    if (!levelData || !levelData.lessons) {
      return NextResponse.json({ error: 'Lesson plan not found' }, { status: 404 });
    }

    // Find the lesson based on lessonId
    const lesson = levelData.lessons.find((l: any) => l.id === lessonId);

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const topics = lesson.topics;

    if (!topics || topics.length === 0) {
      return NextResponse.json({ error: 'No topics found for this lesson' }, { status: 404 });
    }

    // Generate exercises based on the lesson topics
    const exercises = await generateExercises(topics);

    // Generate the PDF document
    const pdfBytes = await createHomeworkPDF(exercises, lesson.title);

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${lesson.title}-Homework.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating homework:', error);
    return NextResponse.json({ error: 'Failed to generate homework' }, { status: 500 });
  }
}

// Function to generate exercises
async function generateExercises(topics: any[]) {
  // Initialize OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Collect all the promises
  const promises = topics.map(async (topic: any) => {
    // Create a prompt to generate exercises based on the topic
    const prompt = `Based on the following topic title and description, generate 5 diverse exercises for the student to practice. Use the following formats:

1. Fill-in-the-Blank Exercise
2. Multiple-Choice Question
3. Short Answer Question
4. Translation Exercise
5. Error Correction Exercise

Provide the exercises in JSON format with the following keys:

{
  "topicTitle": "${topic.topicName}",
  "exercises": [
    {
      "type": "Fill-in-the-Blank",
      "question": "The question with a blank to fill.",
      "answer": "The correct answer."
    },
    // other exercises
  ]
}

Topic Description:
${topic.topicDescription}
`;

    // OpenAI API call
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a language tutor assistant that generates exercises based on lesson topics. Provide the output strictly in JSON format without any additional text.`,
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
    });

    let content = response.choices[0].message?.content?.trim() ?? '';

    // Parse the JSON content
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse OpenAI response as JSON:', e);
      throw new Error('Failed to parse OpenAI response');
    }

    return parsedContent;
  });

  // Wait for all promises to resolve
  const exercises = await Promise.all(promises);
  return exercises;
}

// Function to create the PDF document
async function createHomeworkPDF(exercises: any[], lessonTitle: string) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Embed fonts (optional)
  const fontBytes = await fetch('https://example.com/path-to-your-font.ttf').then(res =>
    res.arrayBuffer()
  );
  const customFont = await pdfDoc.embedFont(fontBytes);

  // Add cover page
  const coverPage = pdfDoc.addPage();
  coverPage.drawText(`${lessonTitle} - Homework`, {
    x: 50,
    y: coverPage.getHeight() - 100,
    size: 24,
    font: customFont,
    color: rgb(0, 0, 0.8),
  });

  // Add exercises per topic
  exercises.forEach((topicExercises: any) => {
    const page = pdfDoc.addPage();
    let yPosition = page.getHeight() - 50;

    page.drawText(topicExercises.topicTitle, {
      x: 50,
      y: yPosition,
      size: 20,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    yPosition -= 30;

    topicExercises.exercises.forEach((exercise: any, index: number) => {
      const questionText = `${index + 1}. [${exercise.type}] ${exercise.question}`;
      page.drawText(questionText, {
        x: 50,
        y: yPosition,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      // Handle multiple-choice options
      if (exercise.type === 'Multiple-Choice' && exercise.options) {
        exercise.options.forEach((option: string) => {
          page.drawText(`- ${option}`, {
            x: 70,
            y: yPosition,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
          });
          yPosition -= 15;
        });
      }

      yPosition -= 10;

      // Add new page if necessary
      if (yPosition < 50) {
        yPosition = page.getHeight() - 50;
        pdfDoc.addPage();
      }
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}