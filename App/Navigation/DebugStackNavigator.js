import React from 'react'

import { StackNavigator } from 'react-navigation'

import DebugScreen from '../Containers/DebugScreen'

import { Button } from 'native-base';

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import I18n from '../I18n';

const DebugStackNavigator=StackNavigator(
    {
        DebugScreen: {
            screen: DebugScreen,
            navigationOptions: {
            }
        },
    }, {
        // Default config for all screens
        // headerMode: 'none',
        initialRouteName: 'DebugScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default DebugStackNavigator
