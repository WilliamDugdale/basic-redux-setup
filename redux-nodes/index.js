import { createStore } from 'redux'

const setupStore = (rootNode) => {
    return createStore(rootNode.reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

let actions = {
    increment: () => ({type: 'INCREMENT'})
}

let selectors = {
    getCount: (state) => state.count
}

export {
    setupStore,
    actions,
    selectors
}