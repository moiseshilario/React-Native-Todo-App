import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch
} from 'react-native'

const Row = ({ text, complete, onComplete, onRemove }) => (
  <View style={styles.container}>
    <Switch
      value={complete}
      onValueChange={onComplete}
    />
    <View style={styles.textWrap}>
      <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
    </View>
    <TouchableOpacity
      onPress={onRemove}
      style={styles.delete}
    >
      <Text >
        {String.fromCharCode(10060)}
      </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  complete: {
    textDecorationLine: 'line-through'
  },
  text: {
    fontSize: 20,
    color: '#4d4d4d'
  },
  delete: {
    alignSelf: 'center'
  }
})

export default Row
