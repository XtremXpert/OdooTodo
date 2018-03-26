import React from 'react'

import {
    View,
    Text } from 'react-native'

import Button from 'react-native-smart-button'
import TaskList from '../Components/TaskList'

import { connect } from 'react-redux'

import LoginActions from '../Redux/LoginRedux'
import TasksActions, { selectLoggedUserTasks } from '../Redux/TasksRedux'
import ProjectsActions, { getAllProjects } from '../Redux/ProjectsRedux'
import TimesheetsActions from '../Redux/TimesheetsRedux'
import UsersActions from '../Redux/UsersRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import OcticonsIcon from 'react-native-vector-icons/Octicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

class HomeScreen extends React.Component {
    handleViewProjects = () => {
         this.props.navigation.navigate( 'ProjectsScreen' );
    }

    handleViewUsers = () => {
         this.props.navigation.navigate( 'UsersScreen' );
    }

    handleRefreshTasks = () => {
        const { getTasks, sessionId } = this.props

        this.isAttempting = true
        getTasks(sessionId)
    }

    handleRefreshProject = () => {
        const { getProjects, sessionId } = this.props

        this.isAttempting = true
        getProjects(sessionId)
    }

    handleRefreshUsers = () => {
        const { getUsers, sessionId } = this.props

        this.isAttempting = true
        getUsers(sessionId)
    }

    handleRefreshTimeSheets = () => {
        const { getTimesheets, sessionId, projectsId } = this.props

        this.isAttempting = true
        getTimesheets(sessionId, projectsId)
    }

    handleSelectTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    };

    render () {
        const { fullname, tasks } = this.props
        const { navigate } = this.props.navigation
        return (
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{I18n.t('welcome')} {fullname}</Text>
                <View style={styles.bigContainer}>
                    <TaskList
                        userTasks={tasks}
                        onTaskSelect={this.handleSelectTask}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonRow}>
                        <View style={styles.container}>
                            <Button
                                onPress={this.handleViewProjects}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                            >
                                <OcticonsIcon
                                    name="project"
                                    color={Colors.btnText}
                                    size={30}
                                    style={styles.buttonIconStyle}
                                />
                            </Button>
                        </View>
                        <View style={styles.container}>
                            <Button
                                onPress={this.handleViewUsers}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                            >
                                <EntypoIcon
                                    name="users"
                                    color={Colors.btnText}
                                    size={30}
                                    style={styles.buttonIconStyle}
                                />
                            </Button>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Button
                            onPress={this.props.logout}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                        >
                            <EntypoIcon
                                name="log-out"
                                color={Colors.btnText}
                                style={styles.buttonIconStyle}
                                size={30}
                            />
                        </Button>
                        <Button
                            onPress={this.handleRefreshProject}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                        >
                            <OcticonsIcon
                                name="project"
                                color={Colors.btnText}
                                size={30}
                                style={styles.buttonIconStyle}
                            />
                        </Button>
                        <Button
                            onPress={this.handleRefreshUsers}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                        >
                            <EntypoIcon
                                name="users"
                                color={Colors.btnText}
                                size={30}
                                style={styles.buttonIconStyle}
                            />
                        </Button>
                        <Button
                            onPress={this.handleRefreshTasks}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                        >
                            <OcticonsIcon
                                name="tasklist"
                                color={Colors.btnText}
                                size={30}
                                style={styles.buttonIconStyle}
                            />
                        </Button>
                        <Button
                            onPress={this.handleRefreshTimeSheets}
                            style={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                        >
                            <MCIcon
                                name="timetable"
                                color={Colors.btnText}
                                size={30}
                                style={styles.buttonIconStyle}
                            />
                        </Button>
                    </View>
                </View>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    const { fetching, sessionId, fullname } = state.login
    return {
        tasks: selectLoggedUserTasks(state),
        projectsId : getAllProjects(state),
        fullname: fullname,
        fetching: fetching,
        sessionId: sessionId
//        username: state.login.
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: (task) => dispatch(TasksActions.setSelectedTask(task)),
        logout: () => dispatch(LoginActions.logout()),
        getTasks: (sessionId) => dispatch(TasksActions.tasksRequest(sessionId)),
        getUsers: (sessionId) => dispatch(UsersActions.usersRequest(sessionId)),
        getProjects: (sessionId) => dispatch(ProjectsActions.projectsRequest(sessionId)),
        getTimesheets: (sessionId, projectsId) => dispatch(TimesheetsActions.timesheetsRequest(sessionId, projectsId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
