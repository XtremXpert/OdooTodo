import React from 'react'

import { StackNavigator } from 'react-navigation'

import UserScreen from '../Containers/UserScreen'
import UsersScreen from '../Containers/UsersScreen'
import TaskScreen from '../Containers/TaskScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import { Button } from 'native-base';

import I18n from '../I18n';

const UsersStackNavigator=StackNavigator(
    {
        UserScreen: {
            screen: UserScreen,
            navigationOptions: {
                title: 'List of user'
            }
        },
        UserTaskScreen: {
            screen: TaskScreen,
            navigationOptions: {
                title: 'Task of user',
                headerRight: (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />)
            }
        },
        UsersScreen: {
            screen: UsersScreen,
            navigationOptions: {
                title: 'User',
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
        initialRouteName: 'UsersScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default UsersStackNavigator
