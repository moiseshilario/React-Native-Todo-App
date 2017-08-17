import todos from './fixture/todos.json'
import { filters } from '../actions'
import * as types from '../action-types'
import reducer from '../reducers'

describe('todo reducer', () => {

  const stateBefore = {
    allCompleted: false,
    filter: filters.SHOW_ALL,
    isLoading: true,
    todos: [{
      key: 1,
      text: '1',
      completed: false,
      editing: false
    }]
  }

  it('should return the inital state', () => {
    const state = reducer(undefined, {})

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: []
    }

    expect(state).toEqual(stateExpected)
  })

  it('should set isLoading to false', () => {
    const state = reducer(undefined, {
      type: types.SET_LOADING,
      loading: false
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: false,
      todos: []
    }

    expect(state).toEqual(stateExpected)
  })

  it('should load previous state', () => {
    const state = reducer(undefined, {
      type: types.LOAD_TODOS,
      todos,
      allCompleted: false
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos
    }

    expect(state).toEqual(stateExpected)
  })

  it('should add a todo', () => {
    const todo = {
      key: 1,
      text: '1',
      completed: false,
      editing: false
    }

    const state = reducer(undefined, {
      type: types.ADD_TODO,
      key: 1,
      text: '1'
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: [todo]
    }

    expect(state).toEqual(stateExpected)
  })

  it('should update a todo text', () => {
    const state = reducer(stateBefore, {
      type: types.UPDATE_TODO,
      key: 1,
      text: 'text updated'
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: [{
        key: 1,
        text: 'text updated',
        completed: false,
        editing: false
      }]
    }

    expect(state).toEqual(stateExpected)
  })

  it('should remove a todo', () => {
    const state = reducer(stateBefore, {
      type: types.DELETE_TODO,
      index: 0
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: []
    }

    expect(state).toEqual(stateExpected)
  })

  it('should toggle allCompleted', () => {
    const state = reducer(stateBefore, {
      type: types.TOGGLE_ALL_COMPLETED,
      allCompleted: false
    })

    const stateExpected = {
      allCompleted: true,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: [{
        key: 1,
        text: '1',
        completed: true,
        editing: false
      }]
    }

    expect(state).toEqual(stateExpected)
  })

  it('should toggle the todo editing property', () => {
    const state = reducer(stateBefore, {
      type: types.TOGGLE_EDITING,
      key: 1
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: [{
        key: 1,
        text: '1',
        completed: false,
        editing: true
      }]
    }

    expect(state).toEqual(stateExpected)
  })

  it('should toggle a todo', () => {
    const state = reducer(stateBefore, {
      type: types.TOGGLE_TODO,
      key: 1
    })

    const stateExpected = {
      allCompleted: false,
      filter: filters.SHOW_ALL,
      isLoading: true,
      todos: [{
        key: 1,
        text: '1',
        completed: true,
        editing: false
      }]
    }
    expect(state).toEqual(stateExpected)
  })

  describe(types.SET_FILTER, () => {
    it('should set filter to SHOW_ACTIVE', () => {
      const state = reducer(undefined, {
        type: types.SET_FILTER,
        filter: filters.SHOW_ACTIVE
      })

      const stateExpected = {
        allCompleted: false,
        filter: filters.SHOW_ACTIVE,
        isLoading: true,
        todos: []
      }

      expect(state).toEqual(stateExpected)
    })

    it('should set filter to SHOW_COMPLETED', () => {
      const state = reducer(undefined, {
        type: types.SET_FILTER,
        filter: filters.SHOW_COMPLETED
      })

      const stateExpected = {
        allCompleted: false,
        filter: filters.SHOW_COMPLETED,
        isLoading: true,
        todos: []
      }

      expect(state).toEqual(stateExpected)
    })
  })

})
