import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { setupStore } from './redux-nodes'
import rootNode from './state'
import App from './App'

let store = setupStore(rootNode)
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
  }
  