import { StackNavigator } from 'react-navigation'

import UserScreen from '../Containers/UserScreen'
import UsersScreen from '../Containers/UsersScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default StackNavigator({
    UserScreen: { screen: UserScreen },
    UsersScreen: { screen: UsersScreen },
}, {
  // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'UsersScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})
