import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import Select from '../components/Select'
import Title from '../components/Title'
import Timer from '../components/Timer'
import ProgressBar from '../components/ProgressBar'
import BackgroundProgress from '../components/BackgroundProgress'
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

class EMOMScreen extends Component {
  state = {
    countdowntest: 0,
    alert: 15,
    time: '15',
    isRunning: false,

    countdownTimerValue: 0,
    count: 0
  }
  componentDidMount = () => {
    Sound.setCategory('Playback', true)
  this.alert = new Sound(alert)
}
  checkAlert = () => {
    const secondsCount = this.state.count % 60
    if (secondsCount == this.state.alert) {
      this.alert.play()
    }
    if (this.state.countdowntest === 1) {
      if (secondsCount >= 55 && secondsCount < 60)
        this.alert.play()
    }
  }
  stop = () => {
    clearInterval(this.countdownTimer)
    clearInterval(this.countTimer)
    this.setState({
      isRunning: false
    })
  }
  play = () => {
    this.setState({
      isRunning: true,
      countdownTimerValue: this.state.countdowntest ? 5 : 0,
      count: 0
    })
    const count = () => {
      this.setState({
        count: this.state.count + 1
      }, () => {
        this.checkAlert()
        if (this.state.count === parseInt(this.state.time * 60)) {
          clearInterval(this.countTimer)
        }
      })
    }

    if (this.state.countdowntest === 1) {
      this.alert.play()
      this.countdownTimer = setInterval(() => {
        this.setState({ countdownTimerValue: this.state.countdownTimerValue - 1 }, () => {
          this.alert.play()
          if (this.state.countdownTimerValue === 0) {
            clearInterval(this.countdownTimer)
            this.countTimer = setInterval(count, 1000)
          }
        })
      }, 1000)
    }
    else {
      this.countTimer = setInterval(count, 1000)
    }
  }
  render() {
    const percMinute = (this.state.count % 60 / 60) * 100
    const percTime = parseInt((this.state.count / 60 / parseInt(this.state.time)) * 100)
    if (this.state.isRunning) {
      return (
        <BackgroundProgress percentage={percMinute}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Title title='EMOM' subtitle="Every Minute on the Minute" margimContainer={{ paddingVertical: 50 }} />
          </View>
          <View style={{ flex: 1 }}>
            {
              this.state.countdownTimerValue > 0 ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.countdown}>{this.state.countdownTimerValue}</Text>
                </View>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Timer time={this.state.count} />
                  <ProgressBar color="white" percentage={percTime} />
                  <Timer time={parseInt((this.state.time * 60)) - this.state.count} text="counter2" appendedText=" restantes" />
                </View>
            }
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.stop}>
              <Image
                style={{ width: 70, height: 70, tintColor: 'white' }}
                source={require('../../assets/images/stop.png')} />
            </TouchableOpacity>
          </View>
        </BackgroundProgress>
      )
    }
    return (
      // <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <SafeAreaView style={styles.container}>
        <Title title='EMOM' subtitle="Every Minute on the Minute" marginContainer={{ paddingVertical: 50 }} />
        <Image
          style={{ width: 50, height: 50, tintColor: 'white', alignSelf: 'center', marginBottom: 17 }}
          source={require('../../assets/images/config.png')} />
        <Select
          options={[
            {
              id: 0,
              label: 'desligado'
            },
            {
              id: 15,
              label: '15s'
            },
            {
              id: 30,
              label: '30s'
            },
            {
              id: 45,
              label: '45s'
            }
          ]}
          label={'Alertas'}
          defaultValue={this.state.alert}
          selectedOption={opt => this.setState({ alert: opt })}
          style={{ paddingBottom: 30 }}
        />
        <Select
          options={[
            {
              id: 1,
              label: 'sim'
            },
            {
              id: 0,
              label: 'não'
            }
          ]}
          defaultValue={this.state.countdowntest}
          label={'Contagem regressiva'}
          selectedOption={opt => this.setState({ countdown: opt })}
          style={{ paddingBottom: 30 }}
        />
        <Text style={styles.label}>Quantos minutos</Text>
        <TextInput style={[styles.labelInput]} keyboardType="numeric" value={this.state.time} onChangeText={(value) => this.setState({ time: value })} />
        <Text style={[styles.label, { marginBottom: 60 }]}>minutos</Text>
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
          <Image
            style={{ width: 70, height: 70, tintColor: 'white' }}
            source={require('../../assets/images/start.png')} />
        </TouchableOpacity>
        <Text style={styles.txtTestar}>Testar</Text>
      </SafeAreaView>
    )
  }
}
EMOMScreen.navigationOptions = {
  headerShown: false
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',

  },
  label: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 5
  },
  labelInput: {
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 48,
    textAlign: 'center'
  },
  txtTestar: {
    alignSelf: 'flex-end',
    marginTop: -47,
    marginRight: 40,
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  countdown: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 144,
    color: 'white',
    textAlign: 'center'
  }
})
export default EMOMScreen