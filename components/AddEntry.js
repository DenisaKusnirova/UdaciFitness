import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

// ADD ENTRY COMPONENT
export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  onIncrement = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((currentState) => {
      const count = currentState[metric] + step
      return {
        ...currentState,
        [metric]: count > max ? max : count
      }
    })
  }

  onDecrement = (metric) => {
    const { step } = getMetricMetaInfo(metric)
    this.setState((currentState) => {
      const count = currentState[metric] - step
      return {
        ...currentState,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state
    // TODO: update redux

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }))
    // TODO: navigate to Home
    // TODO: save the info to the database
    // TODO: clear local notification
  }

  reset = () => {
    const key = timeToString()
    // TODO: update Redux
    // TODO: route to home
    // TODO: update DB
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons 
            name="ios-happy-outline"
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date().toLocaleDateString())} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
                : <UdaciSteppers
                  value={value}
                  onIncrement={() => this.onIncrement(key)}
                  onDecrement={() => this.onDecrement(key)}
                  {...rest}
                />

              }
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}