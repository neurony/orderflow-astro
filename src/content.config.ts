import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    category: z.string().optional(),
    image: z.string().optional(),
    author: z
      .object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().optional(),
      })
      .optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    avatar: z.string().optional(),
  }),
});

export const collections = { articles, testimonials };
