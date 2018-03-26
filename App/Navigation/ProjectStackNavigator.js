import { StackNavigator } from 'react-navigation'

import ProjectScreen from '../Containers/ProjectScreen'
import ProjectsScreen from '../Containers/ProjectsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default StackNavigator({
    ProjectScreen: { screen: ProjectScreen },
    ProjectsScreen: { screen: ProjectsScreen },
}, {
  // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'ProjectsScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})
