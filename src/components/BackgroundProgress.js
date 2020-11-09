import React from 'react'
import {
  View
} from 'react-native'

const BackgroundProgress = props => {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <View style={{backgroundColor: '#D6304A', flex: 1-(props.percentage/100) }}/>
        <View style={{backgroundColor: '#2A0E12', flex: props.percentage/100}}/>
      </View>
      <View style={{position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
        {props.children}
      </View>
    </View>
  )
}
export default BackgroundProgress