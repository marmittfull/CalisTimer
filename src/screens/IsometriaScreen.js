import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import Title from '../components/Title'
import Select from '../components/Select'
import Timer from '../components/Timer'
import BackgroundProgress from '../components/BackgroundProgress'
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

class IsometriaScreen extends Component {
  state = {
    isRunning: false,
    goal: 0,
    howManySeconds: 15,
    paused: false,
    countdownTimerValue: 0,
    count: 0,
    countdown: 1,
  }
  componentDidMount = () => {
    Sound.setCategory('Playback', true)
    this.alert = new Sound(alert)
  }
  checkAlert = () => {
    const resto = this.state.howManySeconds - this.state.count
    if (resto <= 5 && resto >= 0)
      this.alert.play()
  }
  stop = () => {
    this.setState({
      paused: !this.state.paused
    })
  }
  return = () => {
    this.setState({
      testing: false,
      isRunning: false,
    })
    clearInterval(this.countTimer)
    clearInterval(this.countdownTimer)
  }
  refresh = () => {
    clearInterval(this.countdownTimer)
    clearInterval(this.countTimer)
    this.play()
  }
  play = () => {
    const howManySeconds = this.state.goal === 0 ? 0 : this.state.howManySeconds
    this.setState({
      isRunning: true,
      countdownTimerValue: 5,
      count: 0,
      howManySeconds
    })
    const count = () => {
      if (this.state.paused)
        return
      this.setState({
        count: this.state.count + 1
      }, () => {
        this.checkAlert()
      })
    }
    this.alert.play()
    this.countdownTimer = setInterval(() => {
      if (this.state.paused)
        return
      this.setState({ countdownTimerValue: this.state.countdownTimerValue - 1 }, () => {
        this.alert.play()
        if (this.state.countdownTimerValue === 0) {
          clearInterval(this.countdownTimer)
          this.countTimer = setInterval(count, 1000)
        }
      })
    }, 1000)
  }
  render() {
    const { count, howManySeconds } = this.state
    const percMinute = howManySeconds === 0 ? 0 : (parseInt((this.state.count)) / parseInt(this.state.howManySeconds)) * 100
    const restante = count >= howManySeconds ? 0 : parseInt(howManySeconds - count)
    if (this.state.isRunning) {
      return (
        <BackgroundProgress percentage={percMinute} >
          <View style={{ flex: 1 }}>
            <Title title="ISOMETRIA" marginContainer={{ paddingVertical: 50 }} />
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
                  {this.state.goal === 1 &&
                    <Timer time={restante} text="counter2" appendedText=" restantes" />
                  }
                </View>
            }
          </View>
          <View style={[styles.viewImages, { marginBottom: -5 }]}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.return}>
                <Image style={{ height: 50, width: 50, tintColor: 'white' }} source={require('../../assets/images/back.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.stop}>
                {
                  this.state.paused ?
                    <Image style={{ height: 70, width: 70, tintColor: 'white' }} source={require('../../assets/images/start.png')} />
                    :
                    <Image style={{ height: 70, width: 70, tintColor: 'white' }} source={require('../../assets/images/stop.png')} />
                }
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.refresh}>
                <Image style={{ height: 50, width: 50, tintColor: 'white' }} source={require('../../assets/images/refresh.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </BackgroundProgress>
      )
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Title title="ISOMETRIA" marginContainer={{ paddingVertical: 50 }} />
        </View>
        <Image style={{ height: 50, width: 50, tintColor: 'white', alignSelf: 'center' }} source={require('../../assets/images/config.png')} />
        <Select
          label="Objetivo:"
          defaultValue={0}
          options={
            [
              {
                id: 0,
                label: 'livre'
              },
              {
                id: 1,
                label: 'bater tempo'
              }
            ]
          }
          style={{ marginTop: 20 }}
          selectedOption={value => this.setState({ goal: value })}
        />
        <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
          {
            this.state.goal === 1 ?
              <React.Fragment>
                <Text style={styles.quantosSegundos}>Quantos segundos:</Text>
                <TextInput onChangeText={(value) => this.setState({ howManySeconds: value })} keyboardType="numeric" defaultValue="15" style={{ fontSize: 45 }} />
              </React.Fragment>
              : null
          }
        </View>
        <View style={styles.viewImages}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={{ height: 50, width: 50, tintColor: 'white' }} source={require('../../assets/images/back.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={this.play}>
              <Image style={{ width: 70, height: 70, tintColor: 'white' }} source={require('../../assets/images/start.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }} />
          
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
  },
  quantosSegundos: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    color: 'white'
  },
  countdown: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 144,
    color: 'white',
    textAlign: 'center'
  },
  viewImages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30
  }
})
IsometriaScreen.navigationOptions = {
  headerShown: false
}
export default IsometriaScreen