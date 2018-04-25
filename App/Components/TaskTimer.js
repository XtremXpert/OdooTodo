import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
    Button,
    Text } from 'native-base';

import styles from './Styles/TaskTimerStyle'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import { Colors } from '../Themes/'

export default class TaskTimer extends Component {
    constructor(props) {
        super(props);

        if (!props.starTime) {
            this.state = {
                startTime : (props.startTime ? new Date(props.startTime) : null),
                txtTime : this.msToTime(new Date() - new Date(props.startTime))
            };
        }

    }


    tick() {
      this.setState({
          txtTime : this.msToTime(new Date() - new Date(this.state.startTime))
      });
    }


    componentWillMount() {

        // if ( this.state.startTime ) {
        //     this.taskTimer = setInterval( () => this.tick, 1000)
        // }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.taskTimer)
    }

    // Prop type warnings
    static propTypes = {
        disabled: PropTypes.bool,
        onStartTimer: PropTypes.func,
        onStopTimer: PropTypes.func,
        //startTime: PropTypes.string
    }

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
            startTime: new Date(),
            txtTime: '00:00:00'
        })

        this.taskTimer = setInterval( () => this.tick, 1000)

        this.props.onStartTimer()
    }

    _onPressStop = () => {
        //this.props.onStopTimer()
        this.setState({
            startTime: null
        })
        clearInterval(this.taskTimer)
        this.props.onStopTimer()
    }

    render () {
        if (this.props.disabled) {
            return (
                <Text>Disabled</Text>
            )
        } else if (!this.state.startTime) {
            return (
                <Button
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
