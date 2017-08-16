import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'

import {
  Provider,
  connect
} from 'react-redux'

import logger from 'redux-logger'

import todoAppReducer from './store/reducers'
import todoApp from './todoApp'
import * as actions from './store/actions'

const store = createStore(todoAppReducer, applyMiddleware(logger))

const mapStateToProps = ({
  todos,
  allCompleted,
  filter,
  isLoading
}) => ({
  todos,
  allCompleted,
  filter,
  isLoading
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (key,text) => dispatch(actions.addTodo(key,text)),
  changeAllCompleted: (allCompleted) => dispatch(actions.changeAllCompleted(allCompleted)),
  deleteTodo: (index) => dispatch(actions.deleteTodo(index)),
  setFilter: (filter) => dispatch(actions.setFilter(filter)),
  toggleAllCompleted: (allCompleted) => dispatch(actions.toggleAllCompleted(allCompleted)),
  toggleTodo: (key) => dispatch(actions.toggleTodo(key))
})

const TodoApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(todoApp)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    )
  }
}
