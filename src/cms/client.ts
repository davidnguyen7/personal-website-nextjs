import {createClient} from 'next-sanity';
import constants from './constants';

export const client = createClient({
  projectId: constants.projectId,
  dataset: constants.dataset,
  apiVersion: constants.apiVersion,
  useCdn: false,
});
