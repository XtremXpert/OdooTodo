import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
    Badge,
    Body,
    Button,
    List,
    ListItem,
    Text,
    Title } from 'native-base';

import HTML from 'react-native-render-html';

import styles from './Styles/MessagesListStyle'

export default class MessagesList extends Component {
  // // Prop type warnings
    static propTypes = {
        messages: PropTypes.array,
    }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

    render () {
        return (
            <List dataArray={this.props.messages}
                renderRow={(item) =>
                    <ListItem
                        // onPress={() => this.props.onTaskSelect(item)}
                        style={styles.listItem} >
                            <Body>
                            <Text>
                                {item.author_id[1]} - {item.date}
                            </Text>
                            <HTML
                                html={item.body || '<HTML></HTML>' }
                                style={{flex: 1}}
                            />
                            </Body>
                    </ListItem>
                }>
            </List>
        )
    }
}
