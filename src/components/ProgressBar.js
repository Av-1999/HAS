import React from 'react'
import { Text, View } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { theme } from '../core/theme'


export const ProgressBar = ({ percent }) => {
  const setColor = (percent) => {
    if(percent < 25){
      return theme.colors.error
    }
    if(percent < 50){
      return theme.colors.primary
    }
    if(percent < 75){
      return theme.colors.accent
    }
    return theme.colors.green
  }

  return (
    <ProgressCircle
      containerStyle={{ width: 45, height: 45 }}
      percent={percent || 0}
      radius={27}
      borderWidth={5}
      color={setColor(percent)}
      shadowColor="#e3e3e3"
      bgColor="#fff"
    >
      <Text style={{ fontSize: 15 }}>{percent + '%'}</Text>
    </ProgressCircle>
  )
}