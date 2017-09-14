import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { CYAN, CYAN_LIGHT } from '../styles/colors'

const Footer = ({ count, filter, onFilter }) => (
  <View style={styles.container}>

    <View style={styles.filters} >
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_ALL' && styles.selected]}
        onPress={() => onFilter('SHOW_ALL')}
      >
        <Text style={styles.text}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_ACTIVE' && styles.selected]}
        onPress={() => onFilter('SHOW_ACTIVE')}
      >
        <Text style={styles.text}>Active</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_COMPLETED' && styles.selected]}
        onPress={() => onFilter('SHOW_COMPLETED')}
      >
        <Text style={styles.text}>Completed</Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CYAN_LIGHT
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filter: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16
  },
  selected: {
    paddingTop: 12,
    borderTopWidth: 4,
    borderTopColor: CYAN
  },
  text: {
    color: 'white',
    fontSize: 18
  }
})

export default Footer
