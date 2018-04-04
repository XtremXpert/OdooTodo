import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
    Badge,
    Body,
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title } from 'native-base';

// Styles
import { Colors } from '../Themes/'
import styles from './Styles/TimesheetListStyle'

export default class TimesheetList extends Component {
    // Prop type warnings
    static propTypes = {
        timesheets: PropTypes.array,
    }

  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

    _keyExtractor = (item, index) => item.id;

    render () {
        return (
            <List dataArray={this.props.timesheets}
                renderRow={(item) =>
                    <ListItem style={styles.listItem}>
                        <Text style={styles.cellText}>
                            {item.date}
                        </Text>
                        <Body>
                            <Text style={styles.cellText}>
                                {item.user_id[1]}
                            </Text>
                        </Body>
                        <Right>
                            <Text style={styles.cellText}>
                                {item.unit_amount} hours
                            </Text>
                        </Right>
                    </ListItem>
                }>
            </List>
        )
    }
}
