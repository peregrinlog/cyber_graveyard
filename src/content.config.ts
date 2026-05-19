import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 定义“赛博墓碑/项目”集合 (projects)
const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		status: z.enum(['terminated', 'abandoned', 'deprecated', 'liquidated', 'delisted']),
		deathDate: z.string(),
		cause: z.string(),
		tech: z.array(z.string()),
		epitaph: z.string(),
		description: z.string().optional(),
		author: z.string().default('守墓人'),
		tags: z.array(z.string()).optional(),
	}),
});

// 2. 定义“通用文档/文章”集合 (pages)
const pagesCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.string().optional(),
		author: z.string().default('守墓人'),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	'projects': projectsCollection,
	'pages': pagesCollection,
};
