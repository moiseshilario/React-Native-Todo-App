import React from 'react'

import {
  applyMiddleware,
  createStore
} from 'redux'

import {
  connect,
  Provider
} from 'react-redux'

import logger from 'redux-logger'

import todoAppReducer from './store/reducers'
import todoApp from './todoApp'
import * as actions from './store/actions'

const store = createStore(todoAppReducer, applyMiddleware(logger))

const mapStateToProps = ({
  allCompleted,
  filter,
  isLoading,
  todos
}) => ({
  allCompleted,
  filter,
  isLoading,
  todos
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (key, text) => dispatch(actions.addTodo(key, text)),
  deleteTodo: (index) => dispatch(actions.deleteTodo(index)),
  loadTodos: (todos) => dispatch(actions.loadTodos(todos)),
  setFilter: (filter) => dispatch(actions.setFilter(filter)),
  setLoading: (loading) => dispatch(actions.setLoading(loading)),
  toggleAllCompleted: (allCompleted) => dispatch(actions.toggleAllCompleted(allCompleted)),
  toggleEditing: (key) => dispatch(actions.toggleEditing(key)),
  toggleTodo: (key) => dispatch(actions.toggleTodo(key)),
  updateTodo: (key, text) => dispatch(actions.updateTodo(key, text))
})

const TodoApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(todoApp)

const App = () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
)

export default App

