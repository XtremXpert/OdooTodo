import React from 'react'

import { StackNavigator } from 'react-navigation'
import PartnerScreen from '../Containers/PartnerScreen'
import PartnersListScreen from '../Containers/PartnersListScreen'
import TaskScreen from '../Containers/TaskScreen'
import ProjectScreen from '../Containers/ProjectScreen'

import { Button } from 'native-base';

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

import I18n from '../I18n';

const PartnersStackNavigator=StackNavigator(
    {
        PartnersListScreen: {
            screen: PartnersListScreen,
            navigationOptions: {
            }
        },
        PartnerScreen: {
            screen: PartnerScreen,
            navigationOptions: {
            }
        },
        PartnerTaskScreen: {
            screen: TaskScreen,
            navigationOptions: {
            }
        },
        PartnerProjectScreen: {
            screen: ProjectScreen,
            navigationOptions: {
            }
        }
    }, {
        // Default config for all screens
        // headerMode: 'none',
        initialRouteName: 'PartnersListScreen',
        navigationOptions: {
            headerStyle: styles.header,
            headerTintColor: Colors.fourth
        }
    }
)

export default PartnersStackNavigator
