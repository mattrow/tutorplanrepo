// src/utils/slugify.ts

import { firestore } from '@/firebase/admin';

export async function slugify(text: string): Promise<string> {
  let slug = text
    .toString()
    .normalize('NFD')                   // Normalize accents
    .replace(/[\u0300-\u036f]/g, '')    // Remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')        // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');           // Remove leading and trailing hyphens

  // Ensure the slug is unique
  let existingSlug = await firestore.collection('publicLessons').doc(slug).get();
  let counter = 1;
  while (existingSlug.exists) {
    const newSlug = `${slug}-${counter}`;
    existingSlug = await firestore.collection('publicLessons').doc(newSlug).get();
    if (!existingSlug.exists) {
      slug = newSlug;
      break;
    }
    counter++;
  }

  return slug;
}