export const RESUME_URL =
  'https://drive.google.com/file/d/1xiBlUQjvRMj3Q1ZLceCgCwfvo-e5oWSY/view?usp=sharing';

export const ROLES = [
  'Java Full-Stack Developer',
  'Spring Boot Engineer',
  'MERN Stack Developer',
  'Software Engineer',
];

export const ABILITY_CARD_STACK = [
  'Java & Spring Boot',
  'PostgreSQL & SQL',
  'MERN Stack',
  'Docker & REST APIs',
];

export const PROJECTS = [
  {
    id: 'money-manager',
    title: 'Money Manager',
    subtitle: 'Full-Stack Financial Analytics App',
    tag: 'JAVA · SPRING BOOT · FULL-STACK',
    description:
      'End-to-end personal finance and expense tracking platform with stateless JWT authentication, automated Excel reporting (Apache POI), Cloudinary media uploads, and scheduled email notifications. Profiled and resolved Hibernate N+1 SQL bottlenecks in PostgreSQL using composite indexes, DTO projections, and JPA @EntityGraph.',
    tech: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'PostgreSQL',
      'React.js',
      'Tailwind CSS',
      'Docker',
      'JUnit 5',
    ],
    liveUrl: 'https://mmoneymanager.netlify.app/',
    repoUrl: 'https://github.com/BollaRevanth/Money-Manager',
    highlights: [
      'Stateless JWT Security',
      'Apache POI Excel Export',
      'Hibernate N+1 Resolved',
      'Scheduled Email Alerts',
    ],
  },
  {
    id: 'foodel',
    title: 'Foodel',
    subtitle: 'Full-Stack Food Delivery Platform',
    tag: 'MERN STACK · OAUTH2',
    description:
      'Production food ordering and catalog management web application featuring Google OAuth2 authentication, live search and filtering, automated promo pricing rules, real-time order tracking, and a role-based admin dashboard.',
    tech: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'Google OAuth2',
      'REST APIs',
    ],
    liveUrl: 'https://food-delivery-frontend-h8j6.onrender.com/',
    repoUrl: 'https://github.com/BollaRevanth/Food-Delivery-Project',
    highlights: [
      'Google OAuth2 Login',
      'Live Search & Filtering',
      'Promo Pricing Rules',
      'Role-Based Admin Panel',
    ],
  },
];

export const SKILL_GROUPS = [
  {
    category: 'Languages',
    items: ['Java', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Python (Fundamentals)'],
  },
  {
    category: 'Backend',
    items: [
      'Spring Boot',
      'Spring Security',
      'JPA / Hibernate',
      'Node.js',
      'Express.js',
      'RESTful APIs',
    ],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Tailwind CSS'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Tools & Testing',
    items: ['Docker', 'Git & GitHub', 'Postman', 'JUnit 5', 'IntelliJ IDEA'],
  },
  {
    category: 'Core CS',
    items: ['Data Structures & Algorithms (Java)', 'OOP', 'DBMS'],
  },
];

export const JOURNEY_ITEMS = [
  {
    yearDisplay: '2026',
    period: '2026 (Jul – Present)',
    title: 'Full-Stack Engineering & DSA',
    points: [
      'Graduated with a B.Tech in Computer Science & Engineering from SVS Group of Institutions (JNTUH) with a 7.54 CGPA.',
      'Actively building production full-stack systems, optimizing SQL/backend performance, and practicing Java DSA.',
    ],
  },
  {
    yearDisplay: '2026',
    period: '2026',
    title: 'Built & Scaled Money Manager (Java & Spring Boot)',
    points: [
      'Engineered a full-stack financial tracker with Spring Security JWT, PostgreSQL, Docker, Apache POI Excel exports, and automated email alerts.',
    ],
  },
  {
    yearDisplay: '2025',
    period: '2025',
    title: 'Deployed Foodel (MERN + Google OAuth2)',
    points: [
      'Built and shipped a complete food delivery application with MongoDB, Google OAuth2 login, real-time order tracking, and an admin panel.',
    ],
  },
];

export const CONTACT_INFO = {
  email: 'revanthbolla2948@gmail.com',
  phone: '+91-8074223906',
  phoneHref: 'tel:+918074223906',
  github: 'https://github.com/BollaRevanth',
  linkedin: 'https://www.linkedin.com/in/revanthbolla/',
  resume: RESUME_URL,
};

