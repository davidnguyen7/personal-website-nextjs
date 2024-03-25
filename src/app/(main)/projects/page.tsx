import {client} from '@/cms/client';
import Link from 'next/link';
import {groq} from 'next-sanity';
import {Project} from '@/cms/schema/Project';

export default async function Projects() {
  const projects = await client.fetch<Project[]>(groq`*[_type == "project"]`);

  return (
    <main className="flex flex-col gap-8">
      {projects?.map(project => {
        return (
          <div key={project.name}>
            {project.link ? (
              <Link
                className="text-lg font-bold hover:underline group text-black dark:text-white"
                href="https://world-map-react-mauve.vercel.app/"
                target="_blank">
                {project.name}
                <svg
                  className="transition-transform inline ml-2 h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                    fill="currentColor"></path>
                </svg>
              </Link>
            ) : (
              <div className="text-lg font-bold text-black dark:text-white">
                {project.name}
              </div>
            )}
            {project.description ? (
              <div className="mt-2">{project.description}</div>
            ) : null}
            {project.technologies && project.technologies.length > 0 ? (
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
            ) : null}
          </div>
        );
      })}
    </main>
  );
}
