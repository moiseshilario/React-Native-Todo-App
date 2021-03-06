import * as types from './action-types'

export const filters = {
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED'
}

export const addTodo = (key, text) => ({
  type: types.ADD_TODO,
  text,
  key
})

export const deleteTodo = (index) => ({
  type: types.DELETE_TODO,
  index
})

export const loadTodos = (previousState) => ({
  type: types.LOAD_TODOS,
  todos: previousState.todos,
  allCompleted: previousState.allCompleted
})

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  filter
})

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  loading
})

export const toggleAllCompleted = (allCompleted) => ({
  type: types.TOGGLE_ALL_COMPLETED,
  allCompleted
})

export const toggleEditing = (key) => ({
  type: types.TOGGLE_EDITING,
  key
})

export const toggleTodo = (key) => ({
  type: types.TOGGLE_TODO,
  key
})

export const updateTodo = (key, text) => ({
  type: types.UPDATE_TODO,
  key,
  text
})


