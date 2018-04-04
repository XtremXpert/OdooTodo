import React, { Component } from 'react'


import {
    Image } from 'react-native'

import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Thumbnail,
    Title } from 'native-base';

import { connect } from 'react-redux'
import UsersActions from '../Redux/UsersRedux'

// Styles
import styles from './Styles/UsersScreenStyle'
import { Colors } from '../Themes/'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

class UsersScreen extends Component {
    _keyExtractor = (item, index) => item.id;

    _onPressBack = () => {
         this.props.navigation.navigate( 'Home' );
    }

    _onPressItem = (item) => {
        this.props.setSelectedUser(item.user_id[0])
        this.props.navigation.navigate('UserScreen')
    };

    render () {
        const { users } = this.props
        const { navigate } = this.props.navigation

        return (
            <Container>

                <Header>
                    <Left style={styles.headerLeft}>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title>Users</Title>
                    </Body>
                    <Right style={styles.headerRight}>
                    </Right>
                </Header>

                <Content style={styles.container}>
                    <List dataArray={users}
                        renderRow={(item) =>
                          <ListItem onPress={() => this._onPressItem(item)} >
                              <Thumbnail
                                  şmall
                                  source={{uri: `data:image/png;base64,${item.image_small}`}}
                              />
                              <Text>{item.name} - {item.email}</Text>
                          </ListItem>
                      }>
                    </List>
                </Content>

            </Container>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.login.userId,
        sessionId: state.login.sessionId,
        users: state.users.list,
        fetching: state.projects.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedUser: (data) => dispatch(UsersActions.setSelectedUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)
