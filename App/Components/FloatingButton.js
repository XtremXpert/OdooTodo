import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Fab,
    Icon,
    Button } from 'native-base';

import styles from './Styles/FloatingButtonStyle'
import { Colors } from '../Themes/'

export default class FloatingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
        };
    }

    // Prop type warnings
    static propTypes = {
        navigate: PropTypes.func,
    }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
        <Fab
            active={this.state.activeFab}
            direction="up"
            containerStyle={{ }}
            style={styles.fabStyle}
            position="bottomRight"
            // onLongPress={() =>  navigate('DrawerToggle')}
            // onPress={() => this.setState({ active: !this.state.active })}>
            onPress={() =>  this.props.navigate('DrawerToggle')} >
            <Icon color={Colors.fourth} name="share" />
        </Fab>
    )
  }
}
