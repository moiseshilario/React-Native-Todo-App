import React, { Component } from 'react'
import { applyMiddleware, createStore } from 'redux'

import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Keyboard,
  View,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import logger from 'redux-logger'

import Header from './components/header'
import Footer from './components/footer'
import Separator from './components/separator'
import Row from './components/row'
import todoAppReducer from './store/reducers'
import * as actions from './store/actions'

const store = createStore(todoAppReducer, applyMiddleware(logger))

const filterTodos = (filter, todos) => (
  todos.filter((todo) => {
    if (filter === 'SHOW_ALL') return true
    if (filter === 'SHOW_COMPLETED') return todo.complete
    if (filter === 'SHOW_ACTIVE') return !todo.complete
  })
)

export default class TodoApp extends Component {
  updateList = (todos, rest = {}) => {
    this.setState({
      todos,
      ...rest
    })
    AsyncStorage.setItem('todos', JSON.stringify(todos))
  }

  handleAddItem = () => {
    let key = Date.now()
    store.dispatch(actions.addTodo(key, this.state.value))
    this.setState({ value: '' })
  }

  handleFilter = (filter) => {
    store.dispatch(actions.setFilter(filter))
  }

  handleToggleAllCompleted = () => {
    store.dispatch(actions.toggleAllCompleted(store.getState().allCompleted))
    store.dispatch(actions.changeAllCompleted(store.getState().allCompleted))
  }

  handleToggleComplete = (key, complete) => {
    store.dispatch(actions.toggleTodo(key))
  }

  handleUpdateText = (key, text) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.key !== key) return todo
      return {
        ...todo,
        text
      }
    })
    this.updateList(newTodos)
  }

  handleToggleEditing = (key, editing) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.key !== key) return todo
      return {
        ...todo,
        editing
      }
    })
    this.updateList(newTodos)
  }


  handleRemoveItem(key) {
    const newTodos = this.state.todos.filter((todo) => (
      todo.key !== key
    ))
    this.updateList(newTodos)
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillMount = () => {
    this.setState({
      todos: [],
      loading: false
    })
    // AsyncStorage.getItem('todos').then((json) => {
    //   try {
    //     const todos = JSON.parse(json)
    //     this.updateList(todos, { loading: false })
    //   }
    //   catch (e) {
    //     this.setState({
    //       todos: [],
    //       loading: false
    //     })
    //   }
    // })
  }

  renderItem = ({ item }) => (
    <Row
      todo={item}
      onComplete={() => this.handleToggleComplete(item.key)}
      onUpdate={(text) => this.handleUpdateText(item.key, text)}
      onToggleEdit={(editing) => this.handleToggleEditing(item.key, editing)}
      onRemove={() => this.handleRemoveItem(item.key)}
    />
  )

  renderSeparator = () => <Separator />

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddTodo={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllCompleted={this.handleToggleAllCompleted}
        />
        <View style={styles.content} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <FlatList
              data={filterTodos(store.getState().filter, store.getState().todos)}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </TouchableWithoutFeedback>
        </View>
        <Footer
          count={filterTodos('SHOW_ACTIVE', store.getState().todos).length}
          filter={store.getState().filter}
          onFilter={this.handleFilter}
        />
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  todoItem: {
    padding: 16,
    fontSize: 18
  }
})
