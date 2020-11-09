import React from 'react'
import {
  View, Text
} from 'react-native'

const ProgressBar = props => {
  const {
    percentage, color, height
  } = props
  return (
    <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: 40 }}>
      <View style={{
        width: percentage ? percentage+'%' : '1%',
        backgroundColor: color ? color : 'white', 
        height: height ? height : 3
      }}></View>
    </View>
  )
}
export default ProgressBar