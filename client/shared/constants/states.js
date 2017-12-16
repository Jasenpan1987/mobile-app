const stateNames = {
  NSW: 1,
  VIC: 2,
  QLD: 3,
  ACT: 4,
  WA: 5,
  SA: 6,
  NT: 7,
  TAS: 8,
  NOTAPPLICABLE: 9
};

const lookUp = {
  [stateNames.NSW]: 'NSW',
  [stateNames.VIC]: 'VIC',
  [stateNames.QLD]: 'QLD',
  [stateNames.ACT]: 'ACT',
  [stateNames.WA]: 'WA',
  [stateNames.SA]: 'SA',
  [stateNames.NT]: 'NT',
  [stateNames.TAS]: 'TAS',
  [stateNames.NOTAPPLICABLE]: 'NOTAPPLICABLE'
};

Object.defineProperty(stateNames, 'getDescription', {
  enumerable: false,
  writable: false,
  value(name) {
    return lookUp[name];
  }
});

export default stateNames;
