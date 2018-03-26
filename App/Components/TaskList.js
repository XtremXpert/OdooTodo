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
import styles from './Styles/TaskListStyle'

export default class TaskList extends Component {
  // // Prop type warnings
    static propTypes = {
        userTasks: PropTypes.array,
        onTaskSelect: PropTypes.func
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
                        data={this.props.userTasks}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => (
                            <ListItem
                                title={item.name}
                                subtitle={item.project_id[1]}
                                onPress={() => this.props.onTaskSelect(item.id)}
                            />
                        )}
                    />
                </List>
            </ScrollView>
        </View>
    )
  }
}
