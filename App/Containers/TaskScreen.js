import React from 'react'

import {
    View,
    Text,
    ScrollView,
    FlatList, } from 'react-native'

import {
    List,
    ListItem } from "react-native-elements"

import Button from 'react-native-smart-button'
import TaskTimer from '../Components/TaskTimer'
import TaskList from '../Components/TaskList'
import TimesheetList from '../Components/TimesheetList'

import { connect } from 'react-redux'

import TasksActions, { getSelectedTask, getSelectedTaskChilds } from '../Redux/TasksRedux'
import { selectTaskTimesheets } from '../Redux/TimesheetsRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import I18n from '../I18n';

class TaskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            curTime: 0
        };
    }

    _onPressBack = () => {
         this.props.navigation.goBack();
    }

    _keyExtractor = (item, index) => item.id;

    _onPressStart = () => {
        this.setState({
            startTime : new Date()
        })
        this.taskTimer = setInterval( () => {

            this.setState({
//                curTime : new Date() - state.startTime
                curTime : new Date() - this.state.startTime,
                txtTime : this.msToTime( this.state.curTime )
            })
        }, 1000)
    }

    _onPressStop = () => {
        clearInterval(this.taskTimer)
    }

    handleSelectTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    }

    render () {
        const { fullname,
                setSelectedTask,
                task,
                timesheets,
                childTasks
            } = this.props

        const { navigate } = this.props.navigation

        return (
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{task.project_id[1]}</Text>
                <Text style={styles.headerText}>{task.name}</Text>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.normalText}>{I18n.t('planedhours')}: {task.planed_hours}</Text>
                        <Text style={styles.normalText}>{I18n.t('manager')}: {task.manager_id[1]}</Text>
                        <Text style={styles.normalText}>{I18n.t('stage')}: {task.stage_id[1]}</Text>
                        <TimesheetList
                            timesheets={timesheets}
                        />
                    </ScrollView>
                    <TaskList
                        userTasks={childTasks}
                        onTaskSelect={this.handleSelectTask}
                    />

                </View>
                <TaskTimer />
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
    const { sessionId } = state.login
    console.tron.log(state)
    return {
        task: getSelectedTask(state),
        childTasks: getSelectedTaskChilds(state),
        timesheets: selectTaskTimesheets(state),
        sessionId: sessionId,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen)
