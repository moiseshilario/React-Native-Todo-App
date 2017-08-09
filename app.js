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
  updateList = (items, rest = {}) => {
    this.setState({
      items,
      filteredItems: filterItems(this.state.filter, items),
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
    this.setState({
      filteredItems: filterItems(filter, this.state.items),
      filter
    })
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
      filteredItems: [],
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
