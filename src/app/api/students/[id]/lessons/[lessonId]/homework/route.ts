// src/app/api/students/[id]/lessons/[lessonId]/homework/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, firestore } from '@/firebase/admin';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import OpenAI from 'openai';
import { PDFFont } from 'pdf-lib';

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

    const { firstName, lastName, currentLevel, language } = studentData;

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

    const topics = lesson.topics || [];

    if (!topics || topics.length === 0) {
      return NextResponse.json({ error: 'No topics found for this lesson' }, { status: 404 });
    }

    // Generate exercises based on the lesson topics
    const exercises = await generateExercises(topics, currentLevel, language.toLowerCase(), language);

    // Generate the PDF document
    const pdfBytes = await createHomeworkPDF(exercises, lesson.title);

    // Construct the filename
    const studentFirstName = firstName || 'Student';
    const studentLastNameInitial = lastName ? lastName.charAt(0) : '';
    const lessonNumber = lesson.lessonNumber || '1'; // Default to '1' if undefined
    const topicNames = topics.map((topic: any) => topic.topicName).join(', ');

    // Sanitize filename components (remove invalid characters)
    const sanitize = (str: string) =>
      str.replace(/[\\/?:*"><|]/g, '').replace(/\s+/g, ' ').trim();

    // Log variables for debugging
    console.log('Filename components before sanitization:');
    console.log('studentFirstName:', studentFirstName);
    console.log('studentLastNameInitial:', studentLastNameInitial);
    console.log('lessonNumber:', lessonNumber);
    console.log('topicNames:', topicNames);

    // Construct the filename
    const filename = `${sanitize(studentFirstName)} ${sanitize(
      studentLastNameInitial
    )} - Lesson ${lessonNumber} - ${sanitize(topicNames)} Homework.pdf`;

    console.log('Constructed filename:', filename);

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating homework:', error);
    return NextResponse.json({ error: 'Failed to generate homework' }, { status: 500 });
  }
}

// Function to generate exercises
async function generateExercises(
  topics: any[],
  studentLevel: string,
  studentNativeLanguage: string,
  studentLearningLanguage: string
) {
  // Initialize OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Collect all the promises
  const promises = topics.map(async (topic: any) => {
    // Create a prompt to generate exercises based on the topic
    const prompt = `You are an expert ${studentLearningLanguage} tutor specializing in creating practice exercises for students at the ${studentLevel} level. The student's native language is ${studentNativeLanguage}.

**Instructions:**

- **All explanations and instructions must be in ${studentLearningLanguage}.**
- **Provide translations or brief explanations in ${studentNativeLanguage} where particularly helpful.**
- Generate exercises for the student to practice the topic "**${topic.topicName}**".
- For each of the following exercise types, generate **3 exercises**:
  1. Fill-in-the-Blank Exercises
  2. Multiple-Choice Questions
  3. Short Answer Questions
  4. Translation Exercises
     - **Translate between ${studentNativeLanguage} and ${studentLearningLanguage} only. Do not include any other languages.**
  5. Error Correction Exercises
- Ensure that each exercise is appropriate for a student at the **${studentLevel}** level.
- **Provide clear and complete instructions** for each exercise.
- **Include a hint** for each exercise to help the student.
- **Avoid any interactive elements**; the exercises should be suitable for a PDF document.
- **Use complete sentences** and ensure that content is not cut off.

**Output Format:**

Provide the exercises in **JSON format only**, with the following structure:

{
  "topicTitle": "${topic.topicName}",
  "exercises": [
    {
      "type": "Exercise Type (e.g., Fill-in-the-Blank Exercises)",
      "questions": [
        {
          "id": "Unique identifier for the question",
          "question": "The question text in ${studentLearningLanguage}.",
          "options": ["Option 1", "Option 2", "Option 3"], // Include this field for multiple-choice questions
          "answer": "The correct answer.",
          "hint": "A small hint in ${studentLearningLanguage}, include translation in ${studentNativeLanguage} if helpful."
        },
        // Additional questions...
      ]
    },
    // Additional exercise types...
  ]
}

**Formatting Guidelines:**

- Ensure the JSON is properly formatted and can be parsed.
- Do not include any code fences, comments, or text outside the JSON object.
- For the "question" field:
  - For fill-in-the-blank, indicate blanks with "___".
  - For translation exercises, specify whether to translate from ${studentLearningLanguage} to ${studentNativeLanguage} or vice versa.
- For the "options" field in multiple-choice questions, include plausible distractors.
- For the "hint" field, provide a concise hint to help the student.

**Topic Description:**

${topic.topicDescription}

---

**Only output the JSON object with no additional text.`;

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
      max_tokens: 2500,
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

  // Set custom page size (A4) and margins
  const pageWidth = 595.28;   // A4 width in points
  const pageHeight = 841.89;  // A4 height in points
  const margin = 50;

  // Embed fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Font sizes
  const titleFontSize = 24;
  const subtitleFontSize = 18;
  const exerciseTypeFontSize = 16;
  const bodyFontSize = 12;

  // Add cover page
  let contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;

  // Draw the lesson title on the cover page
  const titleLines = wrapText(
    `${lessonTitle} - Homework`,
    pageWidth - 2 * margin,
    fontBold,
    titleFontSize
  );
  for (const line of titleLines) {
    if (yPosition - titleFontSize < margin) {
      contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }
    contentPage.drawText(line, {
      x: margin,
      y: yPosition,
      size: titleFontSize,
      font: fontBold,
      color: rgb(0, 0, 0.8),
    });
    yPosition -= titleFontSize + 5;
  }

  // Add extra space before content
  yPosition -= 20;

  // Add exercises per topic
  for (const topicExercises of exercises) {
    // Add topic title
    const subtitleLines = wrapText(
      topicExercises.topicTitle,
      pageWidth - 2 * margin,
      fontBold,
      subtitleFontSize
    );
    for (const line of subtitleLines) {
      if (yPosition - subtitleFontSize < margin) {
        contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
      contentPage.drawText(line, {
        x: margin,
        y: yPosition,
        size: subtitleFontSize,
        font: fontBold,
        color: rgb(0, 0, 0.6),
      });
      yPosition -= subtitleFontSize + 5;
    }

    yPosition -= 10; // Add extra space before exercises

    // Iterate over exercise types
    for (const exerciseGroup of topicExercises.exercises) {
      // Add exercise type as subtitle
      const exerciseTypeLines = wrapText(
        exerciseGroup.type,
        pageWidth - 2 * margin,
        fontBold,
        exerciseTypeFontSize
      );
      for (const line of exerciseTypeLines) {
        if (yPosition - exerciseTypeFontSize < margin) {
          contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
        contentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: exerciseTypeFontSize,
          font: fontBold,
          color: rgb(0, 0, 0.4),
        });
        yPosition -= exerciseTypeFontSize + 5;
      }

      yPosition -= 5; // Extra space after exercise type

      // Iterate over questions
      for (let i = 0; i < exerciseGroup.questions.length; i++) {
        const question = exerciseGroup.questions[i];

        // Question number and text
        const questionText = `${i + 1}. ${question.question}`;
        const questionLines = wrapText(
          questionText,
          pageWidth - 2 * margin,
          fontBold,
          bodyFontSize
        );

        for (const line of questionLines) {
          if (yPosition - bodyFontSize < margin) {
            contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
          contentPage.drawText(line, {
            x: margin,
            y: yPosition,
            size: bodyFontSize,
            font: fontBold,
            color: rgb(0, 0, 0),
          });
          yPosition -= bodyFontSize + 2;
        }

        // For multiple-choice options
        if (
          exerciseGroup.type === 'Multiple-Choice Questions' &&
          question.options
        ) {
          for (const option of question.options) {
            const optionText = `- ${option}`;
            const optionLines = wrapText(
              optionText,
              pageWidth - 2 * (margin + 20),
              fontRegular,
              bodyFontSize
            );
            for (const line of optionLines) {
              if (yPosition - bodyFontSize < margin) {
                contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                yPosition = pageHeight - margin;
              }
              contentPage.drawText(line, {
                x: margin + 20,
                y: yPosition,
                size: bodyFontSize,
                font: fontRegular,
                color: rgb(0, 0, 0),
              });
              yPosition -= bodyFontSize + 2;
            }
          }
        }

        // Adjust space for student's answer based on exercise type
        if (exerciseGroup.type === 'Fill-in-the-Blank Exercises') {
          // For fill-in-the-blank, extend the blank in the question text
          // (Already handled in the question text generation)
          // No extra space needed
        } else if (
          exerciseGroup.type === 'Short Answer Questions' ||
          exerciseGroup.type === 'Translation Exercises'
        ) {
          // Provide only one line for answer
          yPosition -= 10; // Space before the line
          if (yPosition - bodyFontSize < margin) {
            contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
          contentPage.drawLine({
            start: { x: margin, y: yPosition },
            end: { x: pageWidth - margin, y: yPosition },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
          yPosition -= bodyFontSize + 5;
        } else if (exerciseGroup.type === 'Error Correction Exercises') {
          // Provide more space for answer (e.g., 2 lines)
          yPosition -= 10; // Space before lines
          for (let lineNum = 0; lineNum < 2; lineNum++) {
            if (yPosition - bodyFontSize < margin) {
              contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
            contentPage.drawLine({
              start: { x: margin, y: yPosition },
              end: { x: pageWidth - margin, y: yPosition },
              thickness: 1,
              color: rgb(0, 0, 0),
            });
            yPosition -= bodyFontSize + 5;
          }
        }

        // Hint
        if (question.hint) {
          const hintText = `Hint: ${question.hint}`;
          const hintLines = wrapText(
            hintText,
            pageWidth - 2 * margin,
            fontRegular,
            bodyFontSize
          );
          for (const line of hintLines) {
            if (yPosition - bodyFontSize < margin) {
              contentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
            contentPage.drawText(line, {
              x: margin,
              y: yPosition,
              size: bodyFontSize,
              font: fontRegular,
              color: rgb(0.5, 0.5, 0.5),
            });
            yPosition -= bodyFontSize + 2;
          }
        }

        yPosition -= 10; // Space between exercises
      }

      yPosition -= 15; // Space between exercise types
    }

    yPosition -= 20; // Space between topics
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Helper function to wrap text
function wrapText(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const lineTest = line + word + ' ';
    const width = font.widthOfTextAtSize(lineTest, fontSize);
    if (width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = lineTest;
    }
  }

  if (line.trim() !== '') {
    lines.push(line.trim());
  }

  return lines;
}