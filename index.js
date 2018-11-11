import { Provider, connect } from 'react-redux'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { setupStore, actions, selectors } from './redux-nodes'
import rootNode from './state'

let store = setupStore(rootNode)

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
  return {count: selectors.getCount(state)}
}

const mapDispatchToProps = dispatch => ({
  test: () => dispatch(actions.increment())
})

let App = connect(mapStateToProps, mapDispatchToProps)(TestApp);

  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
  }
  