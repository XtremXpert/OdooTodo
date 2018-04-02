import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import DrawerContainer from '../Containers/DrawerContainer'
// not log windows list
import LoadingScreen from '../Containers/LoadingScreen'
import LoginScreen from '../Containers/LoginScreen'

// User Stack
import UserScreen from '../Containers/UserScreen'
import UsersScreen from '../Containers/UsersScreen'

// Project Stack
import ProjectScreen from '../Containers/ProjectScreen'
import ProjectsScreen from '../Containers/ProjectsScreen'

import HomeScreen from '../Containers/HomeScreen'
import TaskScreen from '../Containers/TaskScreen'

import styles from './Styles/NavigationStyles'

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const  UserStackNavigator = StackNavigator(
    {
        UserScreen: { screen: UserScreen },
        UsersScreen: { screen: UsersScreen },
    }, {
      // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'UsersScreen',
        navigationOptions: {
            headerStyle: styles.header
        }
    }
)

const DrawerStack = DrawerNavigator({
    Home: { screen: HomeScreen },
    Projects: { screen: ProjectsScreen },
    Project: { screen: ProjectScreen },
    User: { screen: UserScreen },
    Users: { screen: UsersScreen },
    TaskScreen: { screen: TaskScreen },
}, {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
})

const drawerButton = (navigation) =>
    <Text
        style={{padding: 5, color: 'white'}}
        onPress={() => {
        navigation.navigate('DrawerToggle')
    }
}>Menu</Text>

const DrawerNavigation = StackNavigator(
    {
        DrawerStack: { screen: DrawerStack }
    }, {
        headerMode: 'none',
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: '#4C3E54'},
            headerTintColor: 'white',
            gesturesEnabled: false,
            headerLeft: drawerButton(navigation)
        })
    }
)

const LoginStack = StackNavigator(
    {
        LoginScreen: { screen: LoginScreen }
    }, {
  // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'LoginScreen',
        navigationOptions: {
            headerStyle: styles.header,
            title: 'You are not logged in',
            headerTintColor: 'white'
        }
    }
)


// const ProjectStackNavigator = StackNavigator(
//     {
//         ProjectScreen: { screen: ProjectScreen },
//         ProjectsScreen: { screen: ProjectsScreen },
//     }, {
//       // Default config for all screens
//         headerMode: 'none',
//         initialRouteName: 'ProjectsScreen',
//         navigationOptions: {
//             headerStyle: styles.header
//         }
//     }
// )

// Manifest of possible screens
const PrimaryNav = StackNavigator(
    {
        loginStack: { screen: LoginStack },
        drawerStack: { screen: DrawerNavigation }
    }, {
  // Default config for all screens
        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'drawerStack',
        transitionConfig: noTransitionConfig
    }
)

export default PrimaryNav
