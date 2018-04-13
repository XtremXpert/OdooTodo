import React from 'react'

import { StackNavigator } from 'react-navigation'

import ProjectScreen from '../Containers/ProjectScreen'
import ProjectsScreen from '../Containers/ProjectsScreen'
import TaskScreen from '../Containers/TaskScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import { Button } from 'native-base';

const ProjectsStackNavigator=StackNavigator(
    {
        ProjectsScreen: {
            screen: ProjectsScreen,
            navigationOptions: {
                headerRight: (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />)
            }
        },
        ProjectTaskScreen: {
            screen: TaskScreen,
            navigationOptions: {
                headerRight: (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />)
            }
        },
        ProjectScreen: {
            screen: ProjectScreen,
        }
    }, {
        // Default config for all screens
        // headerMode: 'none',
        initialRouteName: 'ProjectsScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default ProjectsStackNavigator
