// src/app/[slug]/page.tsx

import { notFound } from 'next/navigation';
import SharedLessonPage from '@/components/SharedLessonView/SharedLessonPage';
import { firestore } from '@/firebase/admin';
import { Lesson } from '@/types/lesson';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  // Fetch the lesson data from the publicLessons collection
  const lessonRef = firestore.collection('publicLessons').doc(slug);
  const lessonDoc = await lessonRef.get();

  if (!lessonDoc.exists) {
    // If the lesson doesn't exist, you can return default metadata or an empty object
    return {};
  }

  const lessonData = lessonDoc.data() as Lesson;

  const topicTitles = lessonData.topics.map((topic) => topic.topicName).join(', ');
  const description = `Explore lessons on ${topicTitles}. Enhance your knowledge with TutorPlan.`;
  const title = lessonData.title || `Lesson ${lessonData.number}`;
  const url = `https://tutorplan.co/${slug}`;

  return {
    title: `${title} | TutorPlan`,
    description: description,
    openGraph: {
      type: 'article',
      url: url,
      title: `${title} | TutorPlan`,
      description: description,
    },
    twitter: {
      card: 'summary',
      title: `${title} | TutorPlan`,
      description: description,
    },
    alternates: {
      canonical: url,
    },
    // Include structured data for SEO
    other: {
      // Note: Next.js doesn't have a direct way to include JSON-LD in metadata.
      // You can include it by adding a script tag in your component below if needed.
    },
  };
}

export default async function PublicLessonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Fetch the lesson data from the publicLessons collection
    const lessonRef = firestore.collection('publicLessons').doc(slug);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return notFound();
    }

    const lessonData = lessonDoc.data() as Lesson;

    return (
      <>
        {/* You can include structured data here if needed */}
        <SharedLessonPage lesson={lessonData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching public lesson:', error);
    return notFound();
  }
}