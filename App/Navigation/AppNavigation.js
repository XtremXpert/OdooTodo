import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import DrawerContainer from '../Containers/DrawerContainer'
import LoadingScreen from '../Containers/LoadingScreen'

import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'
import HomeStackNavigator from './HomeStackNavigator'
import ProjectsStackNavigator from './ProjectsStackNavigator'
import UsersStackNavigator from './UsersStackNavigator'
import PartnersStackNavigator from './PartnersStackNavigator'
import DebugStackNavigator from './DebugStackNavigator'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const DrawerStack = DrawerNavigator(
    {
        Home: {
            screen: HomeStackNavigator
        },
        Projects: {
            screen: ProjectsStackNavigator
        },
        Users: {
            screen: UsersStackNavigator
        },
        Partners: {
            screen: PartnersStackNavigator
        },
        DebugScreen: {
            screen: DebugStackNavigator,

        },
    }, {
        gesturesEnabled: false,
        contentComponent: DrawerContainer
    }
)

// const drawerButton = (navigation) =>
//     <Text
//         style={{padding: 5, color: 'white'}}
//         onPress={() => {
//         navigation.navigate('DrawerToggle')
//     }
// }>Menu</Text>

const DrawerNavigation = StackNavigator(
    {
        DrawerStack: {
            screen: DrawerStack
        }
    }, {
        headerMode: 'none',
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: '#4C3E54'},
            headerTintColor: 'white',
            gesturesEnabled: false,
            // headerLeft: drawerButton(navigation)
        })
    }
)
// Manifest of possible screens
const PrimaryNav = StackNavigator(
    {
        LoadingScreen: { screen: LoadingScreen },
        LoggedInStack: { screen: DrawerNavigation },
        NotLoggedInStack: { screen: NotLoggedInStackNavigator }
    }, {
    // Default config for all screens
        headerMode: 'none',
        navigationOptions: {
          headerStyle: styles.header
        }
    }
);

export default PrimaryNav
