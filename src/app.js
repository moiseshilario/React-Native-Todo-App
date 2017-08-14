import React, { Component } from 'react'
import { createStore } from 'redux'

import {
  Provider,
  connect
} from 'react-redux'

import todoAppReducer from './store/reducers'
import todoApp from './todoApp'

const store = createStore(todoAppReducer)

const TodoApp = connect()(todoApp)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    )
  }
}
