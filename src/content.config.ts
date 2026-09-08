import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    type: z.string().min(1),
    summary: z.string().min(1),
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    stack: z.array(z.string().min(1)).min(1),
    highlights: z.array(z.string().min(1)).min(1),
    challenge: z.string().min(1),
    solution: z.string().min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    repo: z.url().optional(),
    confidential: z.boolean().default(false),
  }),
});

export const collections = { projects };
