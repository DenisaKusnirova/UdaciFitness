import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { white, gray, purple } from '../utils/colors'

export default UdaciSteppers = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {Platform.OS === 'ios'
        ? <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
            <Entypo name="minus" color={purple} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
            <Entypo name="plus" color={purple} size={30} />
          </TouchableOpacity>
        </View>
        : <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[styles.androidBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
            <FontAwesome name="minus" color={purple} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
            <FontAwesome name="plus" color={purple} size={30} />
          </TouchableOpacity>
        </View>
      }
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})