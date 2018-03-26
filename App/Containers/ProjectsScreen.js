import React, { Component } from 'react'

import {
    ScrollView,
    View,
    FlatList,
    Text,
    TouchableOpacity  } from 'react-native'

import {
    List,
    ListItem } from "react-native-elements"

import Button from 'react-native-smart-button'

import { connect } from 'react-redux'
import ProjectsActions, { getSortedProject } from '../Redux/ProjectsRedux'

// Styles
import styles from './Styles/ProjectsScreenStyle'
import { Colors } from '../Themes/'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import I18n from '../I18n';

class ProjectsScreen extends Component {
    _onPressBack = () => {
         this.props.navigation.navigate('Home');
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        this.props.setSelectedProject(item.id)
        this.props.navigation.navigate('ProjectScreen')
    };

    render () {
        const { projects } = this.props
        return (
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{I18n.t('projectslist')}</Text>
                <View style={styles.container}>
                    <ScrollView>
                        <List>
                            <FlatList
                                data={projects}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => (
                                    <ListItem
                                        title={item.name}
                                        subtitle={item.partner_id ? item.partner_id[1] : "Internal project"}
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

                    <Button
                        onPress={() => this._onPressBack()}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                    >
                        <EntypoIcon
                            name="add-to-list"
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
    const projectList = state.projects.list
    // projectList.sort((a, b) => {
    //     const aId = a.get('id');
    //     const bId = b.get('id');
    //     if (aId < bId) { return -1; }
    //     if (aId > bId) { return 1; }
    //     if (aId === bId) { return 0; }
    // })

    return {
      userId: state.login.userId,
      sessionId: state.login.sessionId,
      projects: state.projects.list,
      fetching: state.projects.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedProject: (data) => dispatch(ProjectsActions.setSelectedProject(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
