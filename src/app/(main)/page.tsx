import './page.css';

import {groq} from 'next-sanity';

import DynamicBackground from './_components/DynamicBackground';
import NavigationBar from './_sections/NavigationBar';
import TitleSection from './_sections/TitleSection';
import ProjectsSection from './_sections/ProjectsSection';
import AboutMeSection from './_sections/AboutMeSection';
import ContactSection from './_sections/ContactSection';

import {client} from '@/cms/client';
import {type Settings} from '@/cms/schema/singletons/Settings';
import {type Project} from '@/cms/schema/Project';

export default async function Test() {
  const settings = await client.fetch<Settings>(
    groq`*[_type == "settings"][0]`,
  );

  const projects = await client.fetch<Project[]>(groq`*[_type == "project"]`);
  const socialMedia = {github: settings.github, linkedin: settings.linkedin};

  return (
    <main>
      <NavigationBar />
      <DynamicBackground />
      <TitleSection socialMedia={socialMedia} />
      <AboutMeSection />
      <ProjectsSection projects={projects} />
      <ContactSection socialMedia={socialMedia} />
    </main>
  );
}
