import { NextResponse } from 'next/server';
import { firestore } from '@/firebase/admin';

export const GET = async () => {
  const baseUrl = 'https://tutorplan.co';

  // Fetch all public lesson slugs
  const lessonsSnapshot = await firestore.collection('publicLessons').get();
  const lessonUrls = lessonsSnapshot.docs.map((doc) => ({
    loc: `${baseUrl}/${doc.id}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const urls = [
    {
      loc: `${baseUrl}/`,
      changefreq: 'daily',
      priority: '1.0',
    },
    // Include other public URLs as needed
    ...lessonUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `,
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}; 