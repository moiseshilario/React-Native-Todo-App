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
    case types.CHANGE_ALL_COMPLETED:
      return {
        ...state,
        completed: action.allCompleted
      }
    case types.TOGGLE_EDITING:
      if (state.key === action.key) {
        return {
          ...state,
          editing: !state.editing
        }
      }
      return state
    case types.TOGGLE_TODO:
      if (state.key === action.key) {
        return {
          ...state,
          completed: !state.completed
        }
      }
      return state
    case types.UPDATE_TODO:
      if (state.key === action.key) {
        return {
          ...state,
          text: action.text
        }
      }
      return state
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
    case types.CHANGE_ALL_COMPLETED:
      return state.map(t =>
        todo(t, action)
      )
    case types.DELETE_TODO:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    case types.TOGGLE_EDITING:
      return state.map(t =>
        todo(t,action)
      )
    case types.TOGGLE_TODO:
      return state.map((t) =>
        todo(t, action)
      )
    case types.UPDATE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    case types.LOAD_TODOS:
      return action.todos
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
    case types.TOGGLE_ALL_COMPLETED:
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
