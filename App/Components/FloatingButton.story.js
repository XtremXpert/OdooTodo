import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import FloatingButton from './FloatingButton'

storiesOf('FloatingButton')
  .add('Default', () => (
    <View style={{ backgroundColor: 'black' }}>
      <FloatingButton
      />
    </View>
  ))
