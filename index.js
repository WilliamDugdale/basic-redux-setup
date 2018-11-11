import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';

let test = (state = {
    count: 0
}, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {count: state.count + 1};
      default:
        return state;
    }
  }
  
let store = createStore(test, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let increment = () => ({type: 'INCREMENT'})

class TestApp extends Component {   
  render() {
    return (
      <div>
      <button onClick={this.props.test}>Increment - {this.props.count}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {count: state.count}
}

const mapDispatchToProps = dispatch => ({
  test: () => dispatch(increment())
})

let App = connect(mapStateToProps, mapDispatchToProps)(TestApp);

  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
  }
  