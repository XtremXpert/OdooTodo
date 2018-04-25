import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/TextFieldStyle'

export default class TextField extends Component {
  // // Prop type warnings
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
    }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

    render () {
        const { label, value } = this.props

        return (
            <View style={styles.container}>
                {label && <Text style={styles.label}>{label}</Text>}
                <Text style={
                    label ? styles.fieldWithLabel : styles.fieldWithoutLabel}>
                    {value}
                </Text>
            </View>
        )
    }
}
