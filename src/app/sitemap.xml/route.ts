import { NextResponse } from 'next/server';

export const GET = async () => {
  const baseUrl = 'https://tutorplan.co';

  const urls = [
    {
      loc: `${baseUrl}/`,
      changefreq: 'daily',
      priority: '1.0',
    },
    // Include other public URLs as needed
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