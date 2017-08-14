import { combineReducers } from 'redux'

import { filters } from './actions'
import * as types from './action-types'

const todo = (state, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        key: action.key,
        text: action.text,
        completed: false,
        editing: false
      }
    case types.TOGGLE_TODO:
      if (state.key === action.key) {
        return {
          ...state,
          completed: !state.completed
        }
      }
      return state
    case types.EDIT_TODO:
      if (state.key === action.key) {
        return {
          ...state,
          editing: !state.editing
        }
      }
      return state
    case types.TOGGLE_ALL_COMPLETE:
      return {
        ...todo,
        completed: !action.allCompleted
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case types.TOGGLE_TODO:
      return state.map((todo) =>
        todo(todo, action)
      )
    case types.EDIT_TODO:
      return state.map(todo =>
        todo(todo, action)
      )
    case types.TOGGLE_ALL_COMPLETE:
      return state.map(todo =>
        todo(todo, action)
      )
    default:
      return state
  }
}

const filter = (state = filters.SHOW_ALL, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      return action.filter
    default:
      return state
  }
}

const isLoading = (state = true, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return action.loading
    default:
      return state
  }
}

const allCompleted = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_ALL_COMPLETE:
      return !action.allCompleted
    default:
      return state
  }
}

const todoAppReducer = combineReducers({
  allCompleted,
  filter,
  isLoading,
  todos
})

export default todoAppReducer
