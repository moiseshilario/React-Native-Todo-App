import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const Footer = ({ count, filter, onFilter }) => (
  <View style={styles.container}>
     <Text>{count} count</Text>
    <View style={styles.filters} >
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_ALL' && styles.selected]}
        onPress={() => onFilter('SHOW_ALL')}
      >
        <Text>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_ACTIVE' && styles.selected]}
        onPress={() => onFilter('SHOW_ACTIVE')}
      >
        <Text>Active</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filter, filter === 'SHOW_COMPLETED' && styles.selected]}
        onPress={() => onFilter('SHOW_COMPLETED')}
      >
        <Text>Completed</Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: 'rgba(175, 47, 47, .2)'
  }
})

export default Footer
