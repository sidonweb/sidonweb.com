export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Qbox - Anonymous feedback board",
    year: 2024,
    description:
      "It enables anonymous message sharing via links, with a secure dashboard for managing messages. It integrates Gemini API for AI-driven message suggestions, built on Next.js with NextAuth, Mongoose, and a responsive UI using Shadcn, Tailwind CSS, TypeScript, and Zod validation.",
    url: "https://qbox.live/",
  },
  {
    title: "Medium like blogging platform",
    year: 2024,
    description:
      "Blogging platform built with React and Cloudflare Workers, featuring user authentication and blog creation. Used Zod for data validation and TypeScript for type safety. Integrated Prisma with connection pooling for efficient database management and implemented JWT for secure user sessions.",
    url: "https://medium-clone-siddharth-singhs-projects.vercel.app/",
  },
  {
    title: "Bookshelf - Personal book notes app",
    year: 2024,
    description:
      "Built the Book Shelf app with Node.js and Express.js backend, PostgreSQL for tracking read books, and HTML5/CSS3 for the frontend. The platform organizes book notes and ratings, allowing sorting by rating, recency, and title, helping users retain key insights. Showcased CRUD proficiency with PostgreSQL for efficient data management of book notes.",
    url: "https://github.com/sidonweb/BookNotes",
  },
];
