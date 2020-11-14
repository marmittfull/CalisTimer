import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Title from '../components/Title'

const HomeScreen = props => {
  return(
    <View style={styles.container}>
      <Title title="CalisTimer" marginContainer={{marginTop: 111, marginBottom: 277}} />
      <Button style={styles.buttonView} onPress={() => props.navigation.navigate('EMOM')}>
        EMOM
      </Button>
      <Button style={styles.buttonView} onPress={() => props.navigation.navigate('AMRAP')}>
        AMRAP
      </Button>
      <Button style={styles.buttonView} onPress={() => props.navigation.navigate('ISO')}>
        Isometria
      </Button>
    </View>
  )
}
HomeScreen.navigationOptions = {
  headerShown: false
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#D6304A',
    alignItems: 'center'
  },
  logo:{
    fontFamily: 'Ubuntu-Bold',
    color: 'white',
    fontSize: 48,
    marginTop: 111,
    marginBottom: 277
  },
  buttonView: {
    marginBottom: 48
  }
})
export default HomeScreen