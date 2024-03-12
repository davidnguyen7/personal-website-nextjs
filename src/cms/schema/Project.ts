import {defineField, defineType} from 'sanity';

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies used',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'link',
      title: 'Project URL',
      type: 'url',
    }),
  ],
});
