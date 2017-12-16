import classnames from 'classnames';
import global from '../shared/styles/global.scss';

// create classnames function with local styles
export function createClassNameFn(local) {
  return function(globalClassNames = '', localClassNames = '', defaultClassNames = '') {
    return classnames(
      ...globalClassNames.split(' ').map(name => global[name]),
      ...localClassNames.split(' ').map(name => local[name]),
      ...defaultClassNames
    );
  };
}
