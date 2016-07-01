import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import reduxify from '../lib/reduxify';
import Promise from 'bluebird';
import Calculator from './calculator';

class View extends React.Component {
  render() {
    const { add, multiply, divide, error, state } = this.props;
    return (
      <div>
        <div>{state.calculator.val}</div>
        <button onClick={() => add(1)}>Add 1</button>
        <button onClick={() => add(10)}>Add 10</button>
        <button onClick={() => multiply(2)}>Multiply by 2</button>
        <button onClick={() => divide(10)}>Divide by 10</button>
        <button onClick={() => error()}>Rejected promise</button>
      </div>
    );
  }
}

export default connect(state => ({ state }), reduxify(new Calculator()))(View);
