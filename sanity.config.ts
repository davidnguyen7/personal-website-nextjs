import {defineConfig} from 'sanity';
import constants from './src/cms/constants';
import {schemaTypes} from './src/cms/schema';
import {structureTool} from 'sanity/structure';

export const config = defineConfig({
  projectId: constants.projectId!,
  dataset: constants.dataset!,
  plugins: [
    structureTool({
      structure: S => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Settings')
              .id('settings')
              .child(
                S.document()
                  .title('Settings')
                  .schemaType('settings')
                  .documentId('settings'),
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
          ]);
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: templates =>
      templates.filter(({schemaType}) => !('settings' === schemaType)),
  },
  basePath: '/studio',
});
