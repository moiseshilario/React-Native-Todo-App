import * as actions from '../actions'
import * as types from '../action-types'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'A todo'
    const key = 1
    const expectedAction = {
      type: types.ADD_TODO,
      text,
      key
    }
    expect(actions.addTodo(key, text)).toEqual(expectedAction)
  })

  it('should create an action to delete a todo', () => {
    const index = 0
    const expectedAction = {
      type: types.DELETE_TODO,
      index
    }
    expect(actions.deleteTodo(index)).toEqual(expectedAction)
  })

  it('should create an action to load the todos', () => {
    const previousState = {
      todos: [],
      allCompleted: false
    }
    const expectedAction = {
      type: types.LOAD_TODOS,
      todos: previousState.todos,
      allCompleted: previousState.allCompleted
    }
    expect(actions.loadTodos(previousState)).toEqual(expectedAction)
  })

  it('should create an action to set the filter to SHOW_ACTIVE', () => {
    const filter = actions.filters.SHOW_ACTIVE
    const expectedAction = {
      type: types.SET_FILTER,
      filter
    }
    expect(actions.setFilter(filter)).toEqual(expectedAction)
  })

  it('should create an action to set loading', () => {
    const loading = false
    const expectedAction = {
      type: types.SET_LOADING,
      loading
    }
    expect(actions.setLoading(loading)).toEqual(expectedAction)
  })

  it('should create an action to toggle the allComplete', () => {
    const allCompleted = true
    const expectedAction = {
      type: types.TOGGLE_ALL_COMPLETED,
      allCompleted
    }
    expect(actions.toggleAllCompleted(allCompleted)).toEqual(expectedAction)
  })

  it('should create an action to toggle editing of a todo', () => {
    const key = 1
    const expectedAction = {
      type: types.TOGGLE_EDITING,
      key
    }
    expect(actions.toggleEditing(key)).toEqual(expectedAction)
  })

  it('should create an action to toggle a todo', () => {
    const key = 1
    const expectedAction = {
      type: types.TOGGLE_TODO,
      key
    }
    expect(actions.toggleTodo(key)).toEqual(expectedAction)
  })

  it('should create an action to update a todo', () => {
    const key = 1
    const text = 'test'

    const expectedAction = {
      type: types.UPDATE_TODO,
      key,
      text
    }
    expect(actions.updateTodo(key, text)).toEqual(expectedAction)

  })
})
