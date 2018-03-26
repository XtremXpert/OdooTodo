import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
    FlatList,
    View,
    ScrollView,
    Text,
    KeyboardAvoidingView } from 'react-native'

import {
    List,
    ListItem } from "react-native-elements"

    // Styles
import { Colors } from '../Themes/'
import styles from './Styles/TimesheetListStyle'

export default class TimesheetList extends Component {
  // // Prop type warnings
    static propTypes = {
        timesheets: PropTypes.array,
    }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _keyExtractor = (item, index) => item.id;

  render () {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <List>
                    <FlatList
                        data={this.props.timesheets}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => (
                            <ListItem
                                containerStyle={styles.listItem}
                                wrapperStyle={styles.listItem}
                                titleContainerStyle={styles.listItem}
                                hideChevron
                                title={
                                    <View style={styles.row}>
                                        <View style={styles.cell}>
                                            <Text style={styles.cellText}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text style={styles.cellText}>
                                                {item.user_id[1]}
                                            </Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text style={styles.cellText}>
                                                {item.unit_amount} hours
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                        )}
                    />
                </List>
            </ScrollView>
        </View>
    )
  }
}
