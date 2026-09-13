export interface Project {
  id: 'advisor' | 'scheduling' | 'notes' | 'memory';
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  url: string;
  visualLabel: string;
}

export interface Note {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  paragraphs: string[];
}

export const site = {
  name: 'Hrishav Sapkota',
  initials: 'hs',
  title: 'Hrishav Sapkota — Projects & Perspectives',
  description:
    'A quieter corner of the internet. Explore Hrishav Sapkota’s software projects, experiments, and future notes on building and learning.',
  github: 'https://github.com/hri-sap',
  repositories: 'https://github.com/hri-sap?tab=repositories',
  hero: {
    eyebrow: 'Personal space / Projects & perspectives',
    lines: ['Building with intent.', 'Exploring with', 'curiosity.'],
    introduction:
      'I’m Hrishav. This is my little corner of the internet — a collection of things I’ve built, ideas I’m exploring, and what comes next.',
  },
  work: {
    title: 'A few things I’ve built.',
    introduction:
      'From everyday tools to the systems underneath them. Different problems, connected by curiosity.',
  },
  writing: {
    title: 'Room for thought.',
    introduction: 'A place for the ideas that don’t fit in a commit message.',
    emptyTitle: 'Some ideas need a little more room.',
    emptyDescription:
      'Nothing published yet. This is where future notes on building, learning, and figuring things out will live.',
  },
  about: {
    titleLine: 'A person behind',
    titleLead: 'the',
    titleEmphasis: 'projects.',
    paragraphs: [
      'I’m Hrishav Sapkota. I build software and explore ideas through code.',
      'My public projects range from a collaborative advising assistant for Howard students to web apps and simulators written in C. This space brings those different threads together.',
      'Not everything needs to be a finished answer. Sometimes a project is simply a good way to ask a better question.',
    ],
    aside: 'Built with care. Always a work in progress.',
  },
  contact: {
    titleLead: 'Follow the',
    titleEmphasis: 'curiosity.',
    description:
      'There’s more code, more experiments, and more to come. Take a look around, or start a conversation on GitHub.',
  },
};

export const projects: Project[] = [
  {
    id: 'advisor',
    number: '01',
    name: 'BisonAdvisor',
    category: 'AI & education · Collaborative project',
    description:
      'Making the next step a little clearer. An undergraduate advising assistant built with a team to help Howard University students explore their course questions through conversation.',
    technologies: ['Python', 'Streamlit', 'OpenAI'],
    url: 'https://github.com/hri-sap/BisonAdvisor',
    visualLabel: 'Course connections',
  },
  {
    id: 'scheduling',
    number: '02',
    name: 'Scheduling Simulator',
    category: 'Systems & algorithms',
    description:
      'A closer look at how work gets done. Exploring CPU scheduling through First Come First Serve, Priority, Shortest Job First, and Round Robin algorithms.',
    technologies: ['C', 'CPU scheduling'],
    url: 'https://github.com/hri-sap/Scheduling-Simulator',
    visualLabel: 'Order meets execution',
  },
  {
    id: 'notes',
    number: '03',
    name: 'Notes App',
    category: 'Everyday tools',
    description:
      'A small web project around a familiar idea: giving notes a place to live. Built with JavaScript and React.',
    technologies: ['JavaScript', 'React'],
    url: 'https://github.com/hri-sap/notesapp',
    visualLabel: 'A little space for ideas',
  },
  {
    id: 'memory',
    number: '04',
    name: 'Memory Management Simulator',
    category: 'Under the hood',
    description:
      'Exploring another layer of computing through a memory management simulation written in C.',
    technologies: ['C', 'Memory management'],
    url: 'https://github.com/hri-sap/Memory-Management-Simulator',
    visualLabel: 'Space, allocated',
  },
];

// Add real writing here; each entry expands inline without leaving the page.
export const notes: Note[] = [];
