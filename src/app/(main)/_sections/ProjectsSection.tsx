'use client';
import {type Project} from '@/cms/schema/Project';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

function Project({project}: {project: Project}) {
  return (
    <span className="project">
      <span className="project-title">
        {project.link ? (
          <Link className="project-title" href={project.link} target="_blank">
            {project.name}
            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        ) : (
          <>{project.name}</>
        )}
      </span>
      <ul>
        {project.technologies.map(tech => {
          return <li key={tech}>{tech}</li>;
        })}
      </ul>
      <p>{project.description}</p>
    </span>
  );
}

export default function ProjectsSection({projects}: {projects?: Project[]}) {
  useGSAP(() => {
    // BUG: starting at the projects section or lower will cause
    //      opacity to start at 1 instead of 0.
    gsap.fromTo(
      '.hero-segue',
      {opacity: 1},
      {
        opacity: 0,
        scrollTrigger: {
          scrub: true,
          trigger: '.hero-segue',
          start: 'bottom 80%',
          end: 'bottom 50%',
        },
      },
    );
    gsap.fromTo(
      '.hero-segue',
      {opacity: 0},
      {
        opacity: 1,
        scrollTrigger: {
          scrub: true,
          trigger: '.hero-segue',
          start: 'top 50%',
          end: 'top 30%',
        },
      },
    );
  }, []);

  return (
    <>
      <div className="hero-segue">
        <p>Alright, enough talk. Lets move on to...</p>
      </div>
      <div className="hero" id="projects">
        <div className="hero-content">
          {projects?.map(project => (
            <Project key={project.name} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
