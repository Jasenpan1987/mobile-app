const positionTypes = {
  SOLEDIRECTORANDSECRETARY: 1,
  DIRECTOR: 2,
  SECRETARY: 3,
  POWEROFATTORNEY: 4
};

const lookUp = {
  [positionTypes.SOLEDIRECTORANDSECRETARY]: 'Sole Director & Secretary',
  [positionTypes.DIRECTOR]: 'Director',
  [positionTypes.SECRETARY]: 'Secretary',
  [positionTypes.POWEROFATTORNEY]: 'Power of Attorney'
};

Object.defineProperty(positionTypes, 'getDescription', {
  enumerable: false,
  writable: false,
  value(name) {
    return lookUp[name];
  }
});

export default positionTypes;
