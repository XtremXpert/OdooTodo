import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Fab,
    Icon,
    Button } from 'native-base';

import styles from './Styles/FloatingMenuStyle'
import { Colors } from '../Themes/'

export default class FloatingMenu extends Component {
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
            onPress={() => this.setState({ activeFab: !this.state.activeFab })}
            onLongPress={() =>  this.props.navigate('DrawerToggle')} >
            <Icon color={Colors.fourth} name="share" />
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
                <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
                <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
                <Icon name="mail" />
            </Button>
        </Fab>
    )
  }
}
