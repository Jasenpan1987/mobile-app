const executionTypes = {
  ORGANISATION: 1,
  INDIVIDUAL: 2
};

const lookUp = {
  [executionTypes.ORGANISATION]: 'Organization',
  [executionTypes.INDIVIDUAL]: 'Individual'
};

Object.defineProperty(executionTypes, 'getDescription', {
  enumerable: false,
  writable: false,
  value(name) {
    return lookUp[name];
  }
});

export default executionTypes;
