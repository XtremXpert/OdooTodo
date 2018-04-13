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
        <Container>
            <Content>

                <List dataArray={this.props.userTasks}
                    renderRow={(item) =>
                        <ListItem
                            onPress={() => this.props.onTaskSelect(item)}
                            style={styles.listItem} >
                            <Body>
                                <Title style={styles.title}>
                                    {item.name}
                                </Title>
                                <Text>
                                    {item.project_id[1]}
                                </Text>
                            </Body>
                        </ListItem>
                    }>
                </List>

            </Content>
        </Container>
    )
  }
}
