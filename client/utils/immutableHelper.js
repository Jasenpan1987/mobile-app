import { List, Record, Map } from 'immutable';
import _ from 'lodash';

function makeCorrectPropNames (propNamesArr) {
  return _.isArray(propNamesArr) ? propNamesArr : [propNamesArr];
}

// function findValueByPath (propNames, sourceObj) {
//   if (!_.isArray(propNames)) {
//     return sourceObj[propNames];
//   }
//   return propNames.reduce((prev, next) => {
//     return prev[next];
//   }, sourceObj);
// }

/**
 * chains function is a wrapper, which will wrap an immutable structure (record).
 * Once it receives the immutable data (record), the function will return a wrapped
 * object which contains the setProp and value method.
 * setProp can set an immutable data's [propNames], Note the propNames can be either
 * a string or an array of strings to specify the path. The value param is the value
 * you want to update, it can be any permitive types as well as array and objects.
 * If the value is an array or an object, the function will convert it into List or
 * Record instance respectively. Note if you pass in a object, you should also pass
 * a model for creating the record.
 *
 * Finally, if you want to unwrap the data, simply call .value() method.
 */
export function chains(immutableObject) {
  return {
    _value: immutableObject,

    setProp(propNames, value, recordModel) {
      if (value !== null || value !== undefined) {
        if (_.isArray(value)) {
          this._value = this._value.setIn(makeCorrectPropNames(propNames), List(value));
        } else if (_.isObject(value)) {
          if (recordModel) {
            const instance = Record(recordModel)(value);
            this._value = this._value.setIn(makeCorrectPropNames(propNames), instance);
          } else {
            this._value = this._value.setIn(makeCorrectPropNames(propNames), Map(value));
          }
        } else {
          this._value = this._value.setIn(makeCorrectPropNames(propNames), value);
        }
      }
      return this;
    },

    setPropGroup(level, propNameArr, sourceObj) {
      if (!sourceObj) {
        return this;
      }
      propNameArr.forEach(propName => {
        this.setProp([level, propName], sourceObj[propName]);
      });
      return this;
    },

    setIn(propNames, value) { // hard set method, ignore the types
      this._value = this._value.setIn(propNames, value);
      return this;
    },

    value() {
      return this._value;
    },

    peek() {
      if (window.console) {
        window.console.log('Immutable: ', this._value);
        window.console.log('ToJS: ', this._value.toJS());
      }
      return this;
    }
  };
}

/**
 *
 * @param {*} immutableObject: the record instance
 * @param {*} propNames: can be a string or an array of string to specify the path
 * @param {*} value: the new value for updating, could be any premitive types plus array and object
 * @param {*} recordModel: required if the value is an object, it is the model object for creating record
 */
export const simpleSetProp = (immutableObject, propNames, value, recordModel) => {
  if (_.isArray(value)) {
    const retArr = immutableObject.setIn(makeCorrectPropNames(propNames), List(value));
    return retArr;
  } else if (_.isObject(value)) {
    if (_.isArray(value)) {
      const instance = Record(recordModel)(value);
      return immutableObject.setIn(makeCorrectPropNames(propNames), instance);
    }
  }
  return immutableObject.setIn(makeCorrectPropNames(propNames), value);
};


export const createRecordListFromArray = (arr, model) => {
  return arr.reduce((prev, next) => {
    return prev.push(model.call(null, next));
  }, List());
};
