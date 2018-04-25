import React from 'react'

import { StackNavigator } from 'react-navigation'

import ProjectScreen from '../Containers/ProjectScreen'
import ProjectsListScreen from '../Containers/ProjectsListScreen'
import TaskScreen from '../Containers/TaskScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import { Button } from 'native-base';

const ProjectsStackNavigator=StackNavigator(
    {
        ProjectsListScreen: {
            screen: ProjectsListScreen,
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
        initialRouteName: 'ProjectsListScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default ProjectsStackNavigator
