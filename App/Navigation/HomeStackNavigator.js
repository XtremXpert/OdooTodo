import React from 'react'

import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import TaskScreen from '../Containers/TaskScreen'

import { Button } from 'native-base';

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import I18n from '../I18n';

const HomeStackNavigator=StackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
            }
        },
        HomeTaskScreen: {
            screen: TaskScreen,
            navigationOptions: {
                headerRight: (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />)
            }
        }
    }, {
        // Default config for all screens
        // headerMode: 'none',
        initialRouteName: 'HomeScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default HomeStackNavigator
