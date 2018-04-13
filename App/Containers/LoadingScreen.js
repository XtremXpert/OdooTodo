import React from 'react'
import { View, Text } from 'react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoadingScreenStyle'

class LoadingScreen extends React.Component {
  render () {
    return (
      <View style={styles.container} >
          <Text style={{color:'white'}}>LOADING</Text>
      </View>
    )
  }
}

export default LoadingScreen
