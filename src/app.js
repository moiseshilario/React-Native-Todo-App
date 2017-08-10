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

const filterItems = (filter, items) => (
  items.filter((item) => {
    if (filter === 'ALL') return true
    if (filter === 'COMPLETED') return item.complete
    if (filter === 'ACTIVE') return !item.complete
  })
)

export default class App extends Component {
  updateList = (items, rest = {}) => {
    this.setState({
      items,
      ...rest
    })
    AsyncStorage.setItem('items', JSON.stringify(items))
  }

  handleAddItem = () => {
    if (!this.state.value) return
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.updateList(newItems, { value: '' })
  }

  handleFilter = (filter) => {
    this.setState({ filter })
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    this.updateList(newItems, { allComplete: complete })
  }

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item
      return {
        ...item,
        complete
      }
    })
    this.updateList(newItems)
  }

  handleUpdateText = (key, text) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item
      return {
        ...item,
        text
      }
    })
    this.updateList(newItems)
  }

  handleToggleEditing = (key, editing) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item
      return {
        ...item,
        editing
      }
    })
    this.updateList(newItems)
  }


  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => (
      item.key !== key
    ))
    this.updateList(newItems)
  }

  constructor(props) {
    super(props)
    this.state = {
      allComplete: false,
      filter: 'ALL',
      items: [],
      loading: true,
      value: ''
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem('items').then((json) => {
      try {
        const items = JSON.parse(json)
        this.updateList(items, { loading: false })
      }
      catch (e) {
        this.setState({
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
          onAddItem={this.handleAddItem}
          onChange={(value => this.setState({ value }))}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <FlatList
              data={filterItems(this.state.filter, this.state.items)}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </TouchableWithoutFeedback>
        </View>
        <Footer
          count={filterItems('ACTIVE', this.state.items).length}
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
