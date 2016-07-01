var _ = require('lodash');

const PROMISE_ERROR = '@@reduxify/PROMISE_ERROR';
const PROMISE_RESOLVE = '@@reduxify/PROMISE_RESOLVE';

const objects = {};
const actions = {};

export function reduxifyReducer() {
  return (state = {}, action) => {
    if (action.type === '@@redux/INIT') {
      const newState = {};
      _.each(objects, (val, key) => {
        newState[key] = val;
      });
      return _.assign({}, state, newState);
    }

    if (action.type === PROMISE_ERROR || action.type === PROMISE_RESOLVE) {
      return _.assign({}, state, action.state);
    }

    var match = actions[action.type];
    if (match) {
      var model = match[0];
      var func = match[1];
      var stateName = model.getStateName();
      var result = func.apply(model, action.args);
      if (result && result.then) {
        var originalState = model.getState();
        result
          .then(res => {
            console.log('promise resolved successfully, dispatching state');
            action.dispatch({ type: PROMISE_RESOLVE, state: { stateName: model.getState() } });
          })
          .catch(err => {
            console.log('promise rejected, rolling back');
            model.rollback(originalState);
            action.dispatch({ type: PROMISE_ERROR, state: { stateName: originalState } });
          });
        return state;
      } else {
        return _.assign({}, state, { stateName: model.getState() });
      }
    }

    return state;
  };
}

export default function reduxify(model) {
  if (!model.getStateName) throw new Error('The object must have a function getStateName');
  if (!model.getState) throw new Error('The object must have a function getState');

  const modelName = model.getStateName();
  if (objects[modelName]) {
    throw new Error(`A model with the name ${modelName} has already been reduxified!`);
  }

  objects[modelName] = model;

  return (dispatch) => {
    var reduxed = {};
    var prop;
    var props = Object.getOwnPropertyNames(Object.getPrototypeOf(model));
    _.each(props, prop => {
      var val = model[prop];
      if (typeof(val) === 'function') {
        var type = `${modelName}.${prop}`;
        var action = (args) => ({ type, args, dispatch });
        actions[type] = [model, val];
        reduxed[prop] = function() {
          var args = Array.prototype.slice.call(arguments);
          dispatch(action(args));
        };
      }
    });
    return reduxed;
  };
}

