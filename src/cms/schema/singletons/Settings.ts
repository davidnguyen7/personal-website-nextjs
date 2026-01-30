import {defineField, defineType} from 'sanity';

export interface Settings {
  linkedin: string;
  github: string;
  aboutme: string;
}

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    {
      name: 'social_media',
      title: 'Social Media',
    },
  ],
  fields: [
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'string',
      group: 'social_media',
      initialValue: 'davngyn1',
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'string',
      group: 'social_media',
      initialValue: 'davidnguyen7',
    }),
    defineField({
      name: 'aboutme',
      title: 'About Me',
      type: 'text',
    }),
  ],
});
