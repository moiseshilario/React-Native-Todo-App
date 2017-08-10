import React, { Component } from 'react'

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

import Header from './components/header'
import Footer from './components/footer'
import Separator from './components/separator'
import Row from './components/row'

const filterTodos = (filter, todos) => (
  todos.filter((todo) => {
    if (filter === 'ALL') return true
    if (filter === 'COMPLETED') return todo.complete
    if (filter === 'ACTIVE') return !todo.complete
  })
)

export default class App extends Component {
  updateList = (todos, rest = {}) => {
    this.setState({
      todos,
      ...rest
    })
    AsyncStorage.setItem('todos', JSON.stringify(todos))
  }

  handleAddItem = () => {
    if (!this.state.value) return
    const newTodos = [
      ...this.state.todos,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.updateList(newTodos, { value: '' })
  }

  handleFilter = (filter) => {
    this.setState({ filter })
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete
    const newTodos = this.state.todos.map((todo) => ({
      ...todo,
      complete
    }))
    this.updateList(newTodos, { allComplete: complete })
  }

  handleToggleComplete = (key, complete) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.key !== key) return todo
      return {
        ...todo,
        complete
      }
    })
    this.updateList(newTodos)
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
      allComplete: false,
      filter: 'ALL',
      todos: [],
      loading: true,
      value: ''
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem('todos').then((json) => {
      try {
        const todos = JSON.parse(json)
        this.updateList(todos, { loading: false })
      }
      catch (e) {
        this.setState({
          todos: [],
          loading: false
        })
      }
    })
  }

  renderItem = ({ item }) => (
    <Row
      todo={item}
      onComplete={(complete) => this.handleToggleComplete(item.key, complete)}
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
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <FlatList
              data={filterTodos(this.state.filter, this.state.todos)}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </TouchableWithoutFeedback>
        </View>
        <Footer
          count={filterTodos('ACTIVE', this.state.todos).length}
          filter={this.state.filter}
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
