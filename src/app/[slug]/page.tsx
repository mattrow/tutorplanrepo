// src/app/[slug]/page.tsx

import { notFound } from 'next/navigation';
import SharedLessonPage from '@/components/SharedLessonView/SharedLessonPage';
import { firestore } from '@/firebase/admin';
import { Lesson } from '@/types/lesson';
import Head from 'next/head';

export default async function PublicLessonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Fetch the lesson data from publicLessons collection
    const lessonRef = firestore.collection('publicLessons').doc(slug);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return notFound();
    }

    const lessonData = lessonDoc.data() as Lesson;

    const topicTitles = lessonData.topics.map((topic) => topic.topicName).join(', ');
    const description = `Explore lessons on ${topicTitles}. Enhance your knowledge with TutorPlan.`;
    const title = lessonData.title || `Lesson ${lessonData.number}`;

    const structuredData = {
      "@context": "http://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Organization",
        "name": "TutorPlan"
      },
      "url": `https://tutorplan.co/${slug}`,
      "mainEntityOfPage": `https://tutorplan.co/${slug}`,
      "datePublished": lessonData.createdAt,
      "dateModified": lessonData.updatedAt || lessonData.createdAt,
    };

    return (
      <>
        <Head>
          <title>{title} | TutorPlan</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={`${title} | TutorPlan`} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={`https://tutorplan.co/${slug}`} />
          <meta property="og:type" content="article" />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
          {/* Add more Open Graph tags as needed */}
        </Head>
        <SharedLessonPage lesson={lessonData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching public lesson:', error);
    return notFound();
  }
}