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
                className="text-lg font-bold hover:underline"
                href="https://world-map-react-mauve.vercel.app/"
                target="_blank">
                {project.name}
              </Link>
            ) : (
              <div className="text-lg font-bold">{project.name}</div>
            )}
            {project.description ? (
              <div className="mt-2 dark:text-gray-400">
                {project.description}
              </div>
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
