import * as types from './action-types'

export const filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodo = (key, text) => ({
  type: types.ADD_TODO,
  text,
  key
})

export const editTodo = (key) => ({
  type: types.EDIT_TODO,
  key
})

export const deleteTodo = (index) => ({
  type: types.DELETE_TODO,
  index
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

export const changeAllCompleted = (allCompleted) => ({
  type: types.CHANGE_ALL_COMPLETED,
  allCompleted
})

export const toggleTodo = (key) => ({
  type: types.TOGGLE_TODO,
  key
})


