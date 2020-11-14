import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
  return (
    <View style={[styles.container, props.marginContainer]}>
      <Text style={styles.title}>
        {props.title}
      </Text>

      {props.subtitle &&
        <Text style={styles.subtitle}>
          {props.subtitle}
        </Text>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title:{
    color: 'white',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
  },
  subtitle:{
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
  }
})
export default Title