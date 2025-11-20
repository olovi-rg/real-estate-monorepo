import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!, // e.g. '2023-05-02'
  useCdn: false, // false = always latest content
  token: process.env.SANITY_API_READ_TOKEN, // keep undefined for public reads
});
