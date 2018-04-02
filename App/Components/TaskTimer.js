import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import {
    Button,
    Text } from 'native-base';

import styles from './Styles/TaskTimerStyle'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import { Colors } from '../Themes/'

export default class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            elapseTime: 0,
            running: false
        };
    }

  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

    msToTime = ( duration ) => {
        let milliseconds = parseInt((duration%1000)/100)
        let seconds = parseInt((duration/1000)%60)
        let minutes = parseInt((duration/(1000*60))%60)
        let hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    _onPressStart = () => {
        this.setState({
            startTime : new Date(),
            elapseTime : 0,
            txtTime : this.msToTime( 0 ),
            running: true,
        })
        this.taskTimer = setInterval( () => {
            this.setState({
                elapseTime : new Date() - this.state.startTime,
                txtTime : this.msToTime( new Date() - this.state.startTime ),
            })
        }, 1000)
    }

    _onPressStop = () => {
        this.setState({
            running: false
        })
        clearInterval(this.taskTimer)
    }

    render () {
        if (!this.state.running) {
            return (
                <Button
                    block
                    large
                    onPress={() => this._onPressStart()}
                    style={styles.buttonStyleStart}
                    >
                    <EntypoIcon
                        name="controller-play"
                        color={Colors.btnText}
                        size={60}
                        style={styles.buttonIconStyle}
                    />
                </Button>
            )
        } else {
            return (
                <Button
                    block
                    large
                    onPress={() => this._onPressStop()}
                    style={styles.buttonStyleStop}
                    >
                    <Text style={styles.buttonStopTextStyle}>{this.state.txtTime}</Text>
                </Button>
            )
        }
    }
}
