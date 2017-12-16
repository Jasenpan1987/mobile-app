const executionParties = {
  NONE: 0,
  SOLEDIRECTORANDSECRETARY: 1,
  DIRECTORANDDIRECTOR: 2,
  DIRECTORANDSECRETARY: 3,
  POWEROFATTORNEY: 4,
  INDIVIDUAL: 5
};

const lookUp = {
  [executionParties.NONE]: 'None',
  [executionParties.SOLEDIRECTORANDSECRETARY]: 'Sole Director & Secretary',
  [executionParties.DIRECTORANDDIRECTOR]: 'Director & Director',
  [executionParties.DIRECTORANDSECRETARY]: 'Director & Secretary',
  [executionParties.POWEROFATTORNEY]: 'Power Of Attorney',
  [executionParties.INDIVIDUAL]: 'Individual'
};

Object.defineProperty(executionParties, 'getDescription', {
  enumerable: false,
  writable: false,
  value(name) {
    return lookUp[name];
  }
});

export default executionParties;
