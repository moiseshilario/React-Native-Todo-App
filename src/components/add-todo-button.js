import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native'

import { CYAN_DARK } from '../styles/colors'

class AddTodoButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  render() {
    return (
      <View style={styles.container} >

        <TouchableHighlight
          style={styles.addButton}
          underlayColor="#279E27"
          onPress={() => console.log('abre outra pagina')}
        >
          <Text style={styles.buttonText}> + </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addButton: {
    alignItems: 'center',
    height: 60,
    width: 60,
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: CYAN_DARK,
    elevation: 2
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '100',
    color: 'white',
    textAlign: 'center'
  }
})

export default AddTodoButton
