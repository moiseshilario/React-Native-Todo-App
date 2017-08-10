import React from 'react'
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  TextInput
} from 'react-native'

const Row = ({
  todo,
  onComplete,
  onRemove,
  onUpdate,
  onToggleEdit
}) => {
  const editingComponent = (
    <View style={styles.textWrap}>
      <TextInput
        autoFocus
        multiline
        onChangeText={onUpdate}
        value={todo.text}
        style={styles.input}
        underlineColorAndroid="#F5F5F5"
      />
    </View>
  )

  const removeButton = (
    <TouchableOpacity
      onPress={onRemove}
      style={styles.delete}
    >
      <Text >
        {String.fromCharCode(10060)}
      </Text>
    </TouchableOpacity>
  )

  const textComponent = (
    <TouchableOpacity
      style={styles.textWrap}
      onLongPress={() => onToggleEdit(true)}
    >
      <Text style={[styles.text, todo.complete && styles.complete]}>{todo.text}</Text>
    </TouchableOpacity>
  )

  const doneButton = (
    <TouchableOpacity
      onPress={() => onToggleEdit(false)}
      style={Platform.OS === 'android' && styles.done}
    >
      <Text style={styles.doneText}>{Platform.OS === 'ios'? String.fromCodePoint(128190): 'Save'}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container} >
      <Switch
        value={todo.complete}
        onValueChange={onComplete}
      />
      {todo.editing ? editingComponent : textComponent}
      {todo.editing ? doneButton : removeButton}
    </View >
  )
}

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
    color: '#4d4d4d',
    textAlignVertical: 'top'
  },
  delete: {
    alignSelf: 'center'
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00BBFF',
    padding: 7
  },
  doneText: {
    color: '#4d4d4d',
    fontSize: 20
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 22,
    padding: 0,
    color: '#4d4d4d'
  }
})

export default Row
