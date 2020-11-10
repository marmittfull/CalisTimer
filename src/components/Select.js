import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

class Select extends Component {
  state = {
    optionSelected: ''
  }
  componentDidMount = () => {
    this.setState({
      optionSelected: this.props.defaultValue
    })
  }
  handleSelectedOption = option => () => {
    this.setState({
      optionSelected: option
    })
    if(this.props.selectedOption){
      this.props.selectedOption(option)
    }
  }
  render() {
    const { label, options } = this.props
    return (
      <View style={this.props.style}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.optionsLabel}>
          {options.map(option => {
            let id = '' 
            let labelOption = ''
            if(typeof option == 'string'){
              id = option
              labelOption = option
            }
            else if(typeof option == 'object'){
              id = option.id
              labelOption = option.label
            }
            return (
              <TouchableOpacity
                onPress={this.handleSelectedOption(id)}
                key={id}>
                <Text style={[styles.textLabel, this.state.optionSelected == id ? styles.optionSelected : null]}>{labelOption}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20
  },
  optionsLabel: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textLabel: {
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24
  },
  optionSelected: {
    // backgroundColor: 'rgba(255,255,255, 0.6)'
    textDecorationLine: 'underline',
    textTransform: 'uppercase'
  }
})
export default Select