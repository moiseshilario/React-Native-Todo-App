import React, { Component } from 'react'

import {
  FlatList,
  Keyboard,
  View,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import Header from './header'
import Footer from './footer'
import Separator from './separator'
import Row from './row'

const filterItems = (filter, items) => (
  items.filter((item) => {
    if (filter === 'ALL') return true
    if (filter === 'COMPLETED') return item.complete
    if (filter === 'ACTIVE') return !item.complete
  })
)

export default class App extends Component {
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
    this.setState({
      items: newItems,
      filteredItems: filterItems(this.state.filter, newItems),
      value: ''
    })
  }

  handleFilter = (filter) => {
    this.setState({
      filteredItems: filterItems(filter, this.state.items),
      filter
    })
    console.table(this.state.items)
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    console.table(newItems)
    this.setState({
      items: newItems,
      filteredItems: filterItems(this.state.filter, newItems),
      allComplete: complete
    })
  }

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item
      return {
        ...item,
        complete
      }
    })
    this.setState({
      items: newItems,
      filteredItems: filterItems(this.state.filter, newItems)
    })
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => (
      item.key !== key
    ))
    this.setState({
      items: newItems,
      filteredItems: filterItems(this.state.filter, newItems)
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      allComplete: false,
      filter: 'ALL',
      items: [],
      filteredItems: [],
      value: ''
    }
  }

  renderItem = ({ item }) => (
    <Row
      text={item.text}
      complete={item.complete}
      onComplete={(complete) => this.handleToggleComplete(item.key, complete)}
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
              data={this.state.filteredItems}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </TouchableWithoutFeedback>
        </View>
        <Footer
          onFilter={this.handleFilter}
          filter={this.state.filter}
        />
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
  todoItem: {
    padding: 16,
    fontSize: 18
  }
})
