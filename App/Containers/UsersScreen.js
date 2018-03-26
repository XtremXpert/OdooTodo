import React, { Component } from 'react'

import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity } from 'react-native'

import {
    List,
    ListItem } from "react-native-elements"

import Button from 'react-native-smart-button'

import { connect } from 'react-redux'
import UsersActions from '../Redux/UsersRedux'

// Styles
import styles from './Styles/UsersScreenStyle'
import { Colors } from '../Themes/'
import EntypoIcon from 'react-native-vector-icons/Entypo'


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
        return (
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{I18n.t('userslist')}</Text>
                <View style={styles.container}>
                    <ScrollView>
                        <List style={styles.container}>
                            <FlatList
                                data={users}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => (
                                    <ListItem
                                        title={item.name}
                                        subtitle={item.email}
                                        onPress={() => this._onPressItem(item)}
                                    />
                                )}
                            />
                        </List>
                    </ScrollView>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10
                    }}>
                    <Button
                        onPress={() => this._onPressBack()}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                    >
                        <EntypoIcon
                            name="back"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                </View>
            </View>

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
