import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes/'

const NotLoggedInStackNavigator = StackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                title: 'Login'
            }
        }
    }, {
        // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'LoginScreen',
        navigationOptions: {
            headerStyle: styles.header
        }
    }
);

export default NotLoggedInStackNavigator
