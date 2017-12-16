import { Record } from 'immutable';

export const createDataFn = initProperties => properties => {
  return Record({
    ...initProperties,
    ...properties
  });
};
