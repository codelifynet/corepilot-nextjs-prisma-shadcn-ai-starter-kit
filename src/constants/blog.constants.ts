export const blogPosts = [
	{
		id: 1,
		title: "Getting Started with Next.js 14 and TypeScript",
		excerpt:
			"Learn how to build modern web applications with the latest Next.js features and TypeScript integration.",
		author: "Alex Johnson",
		date: "2024-01-15",
		readTime: "5 min read",
		category: "Development",
		image: "lucide:code",
		tags: ["Next.js", "TypeScript", "React"],
	},
	{
		id: 2,
		title: "Building Scalable APIs with Prisma and PostgreSQL",
		excerpt:
			"Discover best practices for creating robust database schemas and efficient API endpoints.",
		author: "Sarah Chen",
		date: "2024-01-12",
		readTime: "8 min read",
		category: "Backend",
		image: "lucide:database",
		tags: ["Prisma", "PostgreSQL", "API"],
	},
	{
		id: 3,
		title: "Modern UI Design Principles for Web Applications",
		excerpt:
			"Explore the latest trends in user interface design and how to implement them effectively.",
		author: "Mike Rodriguez",
		date: "2024-01-10",
		readTime: "6 min read",
		category: "Design",
		image: "lucide:palette",
		tags: ["UI/UX", "Design", "Frontend"],
	},
	{
		id: 4,
		title: "Optimizing Performance in React Applications",
		excerpt:
			"Learn advanced techniques to make your React apps faster and more efficient.",
		author: "Alex Johnson",
		date: "2024-01-08",
		readTime: "7 min read",
		category: "Performance",
		image: "lucide:zap",
		tags: ["React", "Performance", "Optimization"],
	},
	{
		id: 5,
		title: "Authentication and Security Best Practices",
		excerpt:
			"Implement secure authentication systems and protect your applications from common vulnerabilities.",
		author: "Sarah Chen",
		date: "2024-01-05",
		readTime: "10 min read",
		category: "Security",
		image: "lucide:shield",
		tags: ["Security", "Authentication", "Best Practices"],
	},
	{
		id: 6,
		title: "Deploying Applications with Docker and Kubernetes",
		excerpt:
			"Master containerization and orchestration for scalable application deployment.",
		author: "Mike Rodriguez",
		date: "2024-01-03",
		readTime: "12 min read",
		category: "DevOps",
		image: "lucide:container",
		tags: ["Docker", "Kubernetes", "DevOps"],
	},
];

export const categories = [
	"All",
	"Development",
	"Backend",
	"Design",
	"Performance",
	"Security",
	"DevOps",
];

// Mock blog post detail data
export const blogPost = {
	id: 1,
	title: "Getting Started with Next.js 14 and TypeScript",
	content: `
    <h2>Introduction</h2>
    <p>Next.js 14 brings exciting new features and improvements that make building modern web applications even more enjoyable. In this comprehensive guide, we'll explore how to set up a new project with TypeScript and take advantage of the latest features.</p>
    
    <h2>Setting Up Your Project</h2>
    <p>To get started with Next.js 14 and TypeScript, you'll need to create a new project. The easiest way is to use the create-next-app command:</p>
    
    <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
    
    <p>This command will create a new Next.js project with TypeScript, Tailwind CSS, and ESLint pre-configured.</p>
    
    <h2>Key Features in Next.js 14</h2>
    <p>Next.js 14 introduces several powerful features:</p>
    
    <ul>
      <li><strong>Server Actions:</strong> Simplified server-side form handling</li>
      <li><strong>Partial Prerendering:</strong> Improved performance with selective rendering</li>
      <li><strong>Enhanced App Router:</strong> Better routing capabilities</li>
      <li><strong>Improved Developer Experience:</strong> Faster builds and better error messages</li>
    </ul>
    
    <h2>TypeScript Integration</h2>
    <p>TypeScript integration in Next.js 14 is seamless. The framework automatically detects TypeScript files and provides excellent type safety out of the box.</p>
    
    <h2>Conclusion</h2>
    <p>Next.js 14 with TypeScript provides an excellent foundation for building modern web applications. The combination of powerful features and type safety makes it an ideal choice for developers.</p>
  `,
	author: "Alex Johnson",
	date: "2024-01-15",
	readTime: "5 min read",
	category: "Development",
	image: "lucide:code",
	tags: ["Next.js", "TypeScript", "React"],
};

// Mock related posts
export const relatedPosts = [
	{
		id: 2,
		title: "Building Scalable APIs with Prisma",
		excerpt: "Learn how to create robust database schemas.",
		image: "lucide:database",
		readTime: "8 min read",
	},
	{
		id: 3,
		title: "Modern UI Design Principles",
		excerpt: "Explore the latest trends in user interface design.",
		image: "lucide:palette",
		readTime: "6 min read",
	},
	{
		id: 4,
		title: "React Performance Optimization",
		excerpt: "Advanced techniques to make your React apps faster.",
		image: "lucide:zap",
		readTime: "7 min read",
	},
];

// Mock comments data
export const initialComments = [
	{
		id: 1,
		author: "John Doe",
		content:
			"Great article! This really helped me understand Next.js 14 better.",
		date: "2024-01-16",
		avatar: "lucide:user",
		replies: [
			{
				id: 11,
				author: "Alex Johnson",
				content: "Thanks John! Glad it was helpful.",
				date: "2024-01-16",
				avatar: "lucide:user",
			},
		],
	},
	{
		id: 2,
		author: "Sarah Smith",
		content:
			"The TypeScript integration section was particularly useful. Looking forward to more content like this!",
		date: "2024-01-17",
		avatar: "lucide:user",
		replies: [],
	},
];
