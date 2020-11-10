import React, { Component } from 'react'
import {
  View, Text, Animated
} from 'react-native'

class ProgressBar extends Component {
  state = {
    width: new Animated.Value(0)
  }
  componentDidUpdate = prevProps => {
    if(prevProps.percentage !== this.props.percentage){
      Animated.timing(this.state.width, {
        toValue: this.props.percentage,
        duration: 900,
        useNativeDriver: false
      }).start()
    }
  }
  render() {
    const w = this.state.width.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
    const {
      percentage, color, height
    } = this.props
    return (
      <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: 40 }}>
        <Animated.View style={{
          width: w,
          backgroundColor: color ? color : 'white',
          height: height ? height : 3
        }} />
      </View>
    )
  }
}
export default ProgressBar