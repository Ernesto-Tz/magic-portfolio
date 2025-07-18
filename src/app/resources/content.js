const person = {
  firstName: "Ernesto",
  lastName: "Tzompantzi",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Frontend Developer",
  avatar: "/images/portfolio-avatar-bw.jpg",
  email: "ivan.tzompantzi96@gmail.com",
  location: "Europe/Budapest", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Spanish"], // optional: Leave the array empty if you don't want to display languages
  skills: [ // This will appear on HOME, ABOUT and the projects define in which project description it appears, the project name has to equal its slug
    { title:'TypeScript', src: "/trademark/typescript.svg", href: 'https://www.typescriptlang.org/', projects: ['german-oneshop','czech-mobile-app']}, 
    { title:'JavaScript', src: "/trademark/javascript.svg", href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
    { title:'React', src: "/trademark/react.svg", href: 'https://react.dev/', projects: ['german-oneshop','czech-mobile-app']},
    { title:'GitHub', src: "/trademark/github-blue.svg", href: 'https://docs.github.com/', projects: ['czech-mobile-app']},
    { title:'Nextjs', src: "/trademark/nextjs-fill.svg", href: 'https://nextjs.org/docs', projects: ['german-oneshop']},
    { title:'React Native', src: "/trademark/react-native.svg", href: 'https://reactnative.dev/', projects: ['czech-mobile-app']},
    { title:'Vue', src: "/trademark/vue.svg", href: 'https://v2.vuejs.org/v2/guide/'},
    { title:'HTML', src: "/trademark/html-5.svg", href: 'https://html.spec.whatwg.org/'},
    { title:'CSS', src: "/trademark/css-3.svg", href: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
    { title:'Docker', src: "/trademark/docker.svg", href: 'https://docs.docker.com/', projects: ['german-oneshop']},
    { title:'Figma', src: "/trademark/figma.svg", href: 'https://help.figma.com/', projects: ['german-oneshop','czech-mobile-app']},
    { title:'Contentful', src: "/trademark/contentful.svg",  href: 'https://www.contentful.com/developers/docs/', projects: ['german-oneshop']},
    { title:'Jest', src: "/trademark/jest.svg", href: 'https://jestjs.io/docs/getting-started'},
    { title:'Storybook', src: "/trademark/storybook.svg",  href: 'https://storybook.js.org/docs', projects: ['german-oneshop']},
    { title:'Jira', src: "/trademark/jira.svg",  href: 'https://www.atlassian.com/software/jira/guides/getting-started/introduction#what-is-jira-software'},
  ]
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Ernesto-Tz",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ernesto-tzompantzi-0739a5179/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Welcome to my website!<br/>My name is Ernesto,</>,
  featured: {
    display: true,
    title: <>Currently working on: <strong className="ml-4">Vodafone Germany Webshop 🛒</strong></>,
    href: "/work/german-oneshop",
  },
  subline: (
    <>
      I am a frontend developer passionate about crafting projects, tackling challenges and blending my creativity with technical skills.
    </>
  ),
  projectsSectionTitle: "Latest Projects",
  blogSectionTitle: "Recent from the blog",
};

const about = {
  path: "/about",
  label: "About",
  title: `More about me 😎`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Developer based in Europe with a strong track record of delivering projects for international teams. 
        Over the past five years, I've worked at a global company, collaborating with teams from all over the world and learning how different cultures and workflows shape great products.
        <br/> 
        <br/> 
        I'm adaptable, resilient, and always curious—qualities that help me drive real results for both short-term goals and long-term success. 
        I love working in dynamic environments and am passionate about building user-focused solutions that make a real difference.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Vodafone VOIS, Hungary",
        timeframe: "AUG 2024  – Present",
        role: "Experienced Front-end Developer",
        achievements: [
          <>
            I'm part of the development team behind the Vodafone German webshop, where we focus on serving small and medium business clients. 
            Our projects range from building atomic-level UI components to helping drive the full digitalization of business processes.
          </>,
          <>
            Over the past six months, I’ve been focused on expanding our web application’s contract prolongation process. 
            Working closely with my team, we launched new features that make it easier for clients to extend their contracts, giving them more options and a fully digital experience.
          </>,
        ],
        images: [],
      },
      {
        company: "Vodafone VOIS, Hungary",
        timeframe: "MAR 2022 - JULY 2024",
        role: "Junior Front-end Developer",
        achievements: [
          <>
           For a year and a half, I was part of a squad developing a mobile app with React Native, tailored specifically for SOHO (Small Office, Home Office) business clients in the Czech Republic.
          </>,
          <>
            On my first project, I  worked with the development team of an internal web app using Vue, making it much easier to generate digital assets for social media campaigns.
          </>,
        ],
        images: [],
      },
      {
        company: "Vodafone VOIS, Hungary",
        timeframe: "APR 2021 - FEB 2022",
        role: "Front-end Developer (Internship)",
        achievements: [
          <>
           During my internship, I created custom email templates and built small websites to help boost B2B customer engagement and support marketing campaigns. 
           I worked on projects targeting a range of markets, including Italy, Ireland, the Czech Republic, Hungary, and the UK.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Obuda University, Hungary",
        timeframe: "SEP 2017 - DIC 2021",
        description: <>Bachelor of Computer Science Engineering</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      // This was changed by the skills list on the 'person' const
      // {
      //   title: "Figma",
      //   description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
      //   images: [],
      // },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Collaborations & projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
