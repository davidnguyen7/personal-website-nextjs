interface Project {
  name: string,
  description: string,
  technologies: string[],
  link?: string
};

const projects: Project[] = [
  {
    name: 'RSS Reader',
    description: `Done because I wanted a learning exercise in mobile app development. I used React Native to take advantage of my existing React skills and help ease into learning native app development.`,
    technologies: ['React Native', 'TypeScript'],
  },
  {
    name: 'Interactive World Map',
    description: 'An interactive world map where you can quickly learn about a country within a click.',
    technologies: ['React'],
    link: 'https://world-map-react-mauve.vercel.app/'
  },
];

export default projects;
