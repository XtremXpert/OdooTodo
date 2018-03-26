import { StackNavigator } from 'react-navigation'

import ProjectStackNavigator from './ProjectStackNavigator'
import UserStackNavigator from './UserStackNavigator'
import HomeScreen from '../Containers/HomeScreen'
import TaskScreen from '../Containers/TaskScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default StackNavigator({
  Home: { screen: HomeScreen },
  Project: { screen: ProjectStackNavigator },
  User: { screen: UserStackNavigator },
  TaskScreen: { screen: TaskScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})
