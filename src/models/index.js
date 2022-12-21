// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Group, Workout, Set } = initSchema(schema);

export {
  Group,
  Workout,
  Set
};