# reduxify

this is an experiment with automatically generating actions/reducers/mapDispatchToProps given an object.

# name

despite the name this has nothing to do with browserify.

# trying it out

    npm install
    npm start

# example

## the model

``` js
class Calculator {
  constructor() {
    this.val = 0;
  }
  getState() {
    return { val: this.val };
  }
  getStateName() {
    return 'calculator';
  }
  add(val) {
    this.val += val;
  }
}
```

## the view

``` js
class View extends React.Component {
  render() {
    const { add, val } = this.props;
    return (
      <div>value: {val}</div>
      <button onClick={() => add(1)}>Add 1</button>
    );
  }
}
export default connect(({ calculator: { val } }) => ({ val }), reduxify(new Calculator()))(View);
```

# should i use this?

no, this is a proof of concept to make react/redux behave more like "traditional" libraries.  if you want to do that, use a library that does that.

# license

MIT
