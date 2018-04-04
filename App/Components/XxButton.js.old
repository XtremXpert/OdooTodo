import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes } from 'react-native'

import {
    Fonts, 
    Colors,

    Metrics } from '../Themes/'

export default class XxButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        text: PropTypes.string,
        children: PropTypes.string,
        navigator: PropTypes.object,
        buttonStyle: ViewPropTypes.style,
    }

    static defaultProps = {
        color: Colors.snow,
        buttonStyle: {
            backgroundColor: Colors.fire
        }
    }

    getText () {
        const buttonText = this.props.text || this.props.children || ''
        return buttonText.toUpperCase()
    }

    render () {
        const { buttonStyle } = this.props

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 45,
                    borderRadius: 5,
                    marginHorizontal: Metrics.section,
                    marginVertical: Metrics.baseMargin,
                    backgroundColor: buttonStyle.backgroundColor,
                    justifyContent: 'center'
                }}
                onPress={this.props.onPress} >
                <Text
                    style={{
                        color: this.props.color,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: Fonts.size.medium,
                        marginVertical: Metrics.baseMargin
                    }} >
                    {this.getText()}
                </Text>
          </TouchableOpacity>
    )
  }
}
