import projects from './projects';
import Link from 'next/link';

export default function Projects() {
  return (
    <main className="flex flex-col gap-8">
      {projects.map(project => {
        return (
          <div key={project.name}>
            {project.link ? 
              <Link 
                className="text-lg font-bold hover:underline"
                href="https://world-map-react-mauve.vercel.app/"
                target="_blank"
              >
                {project.name}
              </Link> 
            : <div className="text-lg font-bold">{project.name}</div>}
            <div className="mt-2 dark:text-gray-400">{project.description}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map(technology => {
                return (
                  <div
                    className="rounded-full whitespace-nowrap bg-gray-300 dark:bg-gray-600 !bg-opacity-25 p-1 px-4 text-sm"
                    key={technology}>
                    {technology}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
