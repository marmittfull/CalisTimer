import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Button = props => {
  return(
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Text style={styles.buttonStyle}>{props.children}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  buttonStyle:{
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    color: 'white'
  }
})

export default Button;