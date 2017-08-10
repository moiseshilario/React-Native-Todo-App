import React from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'

const Header = ({
  onToggleAllComplete,
  value,
  onChange,
  onAddItem
}) => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onToggleAllComplete}
      >
        <Text style={styles.toggleIcon}>
          {String.fromCharCode(10003)}
        </Text>
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onAddItem}
        blurOnSubmit={false}
        placeholder="What needs to be done?"
        returnKeyType="done"
        style={styles.input}
      />
    </View>
  )

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  toggleIcon: {
    fontSize: 30,
    color: '#CCC'
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 16,
    fontSize: 22,
    marginTop: 16,
    marginBottom: 16
  }
})

export default Header
