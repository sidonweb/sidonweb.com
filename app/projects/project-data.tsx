export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
  imgurl: string;
}

export const projects: Project[] = [
  {
    title: "Qbox - Anonymous feedback board",
    year: 2024,
    description:
      "Open source web application to send/receive anonymous feedback/messages built using NextJS, NextAuth, Mongoose(MOngo DB), Tailwind CSS & more.",
    url: "https://qbox.live/",
    imgurl: "/photos/qbox.gif"
  },
  {
    title: "Medium like blogging platform",
    year: 2024,
    description:
      "Blogging platform featuring CRUD operations for Blogs. Built with React and Cloudflare Workers, used Zod for data validation. Integrated Prisma with connection pooling for efficient database management and implemented JWT for secure user sessions.",
    url: "https://medium-clone-siddharth-singhs-projects.vercel.app/",
    imgurl: "/photos/mediumclone.gif"
  },
  {
    title: "Bookshelf - Personal book notes app",
    year: 2024,
    description:
      "Developed the Book Shelf app with a Node.js and Express.js backend, PostgreSQL for tracking books, and HTML/CSS frontend. It organizes book notes and ratings, allowing sorting by rating, recency, and title, showcasing CRUD proficiency and efficient data management.",
    url: "https://github.com/sidonweb/BookNotes",
    imgurl: "/photos/booknotes.gif"
  },
];
