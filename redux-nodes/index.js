import { createStore, combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

const reducerOne = (bobbins = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return bobbins + 1;
        default:
        return bobbins;
    }
}

const initialState = {
    count: 0,
    three: {
        count: 0
    }
}

const reducerTwo = (curly = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return curly + 2;
        default:
        return curly;
    }
}

const childReducer = (count= 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return count + 3;
        default:
        return count;
    }
}

const uber = (state = {}, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return {
            ...state,
            count: state.count + 10,
            three: {
                count: state.three.count + 4
            }
        }
        default:
        return state;
    }
}

const childComboReducer = combineReducers({count: childReducer});

const reducer = reduceReducers(uber, combineReducers({count: reduceReducers(reducerOne, reducerTwo), three: childComboReducer}))

const generateParseStartingConditions = () => {
    return {
        actions: {},
        reducer: (state, action) => {
            switch (action.type) {
                default:
                return state;
            }
        },
        initialStateTree: {}
    }
}

const setupStore = (rootNode, namespace) => {
    let nameSpaceArray = []
    if (namespace) {
        nameSpaceArray.push(namespace);
    }
    const parser = parseNode(rootNode, nameSpaceArray, generateParseStartingConditions())
    console.log(rootNode)
    return createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const parseNode = (node, nameSpaceArray, acc) => {
    // let parser = node._children.reduce((acc, child) => {
    //     const childNamespaceArray = nameSpaceArray.concat([child.name])
    //     return parseNode(child, childNamespaceArray, acc)
    // }, acc)
    // reducer = node._actions
}

let actions = {
    increment: () => ({type: 'INCREMENT'})
}

let selectors = {
    getCount: (state) => state.count
}

let node = (initialState) => {
    let { state, children } = separateInitialState(initialState)
    return {
        _isAReduxNode: true,
        _state: state,
        _children: children,
        _actions: []
    }
}

const separateInitialState = (initialState) => {
    return Object.keys(initialState).reduce((acc, key) => {
        if (!initialState[key]._isAReduxNode) {
            acc.state[key] = initialState[key]
        } else {
            acc.children.concat([{
                name: key,
                node: initialState[key]
            }])
        }
        return acc
    }, {state: {}, children: []})
}

const when = (node) => {
    return {
        seesAction: (actionHandle, payloadMaker = null) => addNodeAction(node, actionHandle, payloadMaker)
    }
}

const makeAction = (actionHandle, payloadMaker) => {
    return {
        actionHandle,
        payloadMaker,
        reducers: []
    }
}

const addNodeAction = (node, actionHandle, payloadMaker) => {
    let action = actionHandle
    if (typeof action === 'string') {
        action = makeAction(actionHandle, payloadMaker)
        node._actions.push(action)
        node[actionHandle] = action
    } else if (typeof actionHandle !== 'object') {
        console.log(actionHandle);
    }
    return actionOptions(action)
}

const actionOptions = (action) => {
    return {
        it: possibleResponses(action),
        and: possibleResponses(action)
    }
}

const possibleResponses = (action) => {
    return {
        reducesLikesThis: (reducer) => addReducerToAction(action, reducer)
    }
}

const addReducerToAction = (action, reducer) => {
    action.reducers = action.reducers.concat(reducer)
    return actionOptions(action)
}

export {
    setupStore,
    actions,
    selectors,
    node,
    when
}