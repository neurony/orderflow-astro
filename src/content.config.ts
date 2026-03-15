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
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    updatedDate: z.string().optional(),
    funnel: z.enum(['TOFU', 'MOFU', 'BOFU']).optional(),
    primaryKeyword: z.string().optional(),
    schemaType: z.enum(['Article', 'FAQPage']).optional(),
    contentType: z.enum(['blog', 'pillar', 'educational']).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
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

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
    ogType: z.enum(['website', 'article']).optional(),
    noindex: z.boolean().optional(),
    schemaType: z.enum(['SoftwareApplication', 'Article', 'FAQPage']).optional(),
    pubDate: z.string().optional(),
    updatedDate: z.string().optional(),
    funnel: z.enum(['TOFU', 'MOFU', 'BOFU']).optional(),
    primaryKeyword: z.string().optional(),
    author: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
    pubDate: z.string().optional(),
    updatedDate: z.string().optional(),
    clientName: z.string().optional(),
    clientRole: z.string().optional(),
    clientCompany: z.string().optional(),
    industry: z.string().optional(),
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    funnel: z.enum(['TOFU', 'MOFU', 'BOFU']).optional(),
    primaryKeyword: z.string().optional(),
    author: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { articles, testimonials, pages, caseStudies };
