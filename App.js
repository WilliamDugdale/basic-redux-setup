import { connect } from 'react-redux'
import React, { Component } from 'react'
import { actions, selectors } from './redux-nodes'

class App extends Component {   
    render() {
      return (
        <div>
        <button onClick={this.props.test}>Increment - {this.props.count}</button>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {

console.log(state)
    return {count: selectors.getCount(state)}
  }
  
  const mapDispatchToProps = dispatch => ({
    test: () => dispatch(actions.increment())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);