import { counter } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'

const Timer = props => {
  const minutes = parseInt(props.time / 60)
  const seconds = parseInt(props.time % 60)
  const format = number => {
    if(number < 10){
      return '0'+number
    }
    return number
  }
  return(
    <View>
      <Text style={styles[props.text ? props.text : 'counter'] }>{ format(minutes)+':'+ format(seconds)}{props.appendedText}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  counter: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 96,
    color: 'white'
  },
  counter2: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    color: 'white'
  }
})
export default Timer