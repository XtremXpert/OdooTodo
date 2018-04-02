import React from 'react'

import {
    View,
    ScrollView,
    FlatList, } from 'react-native'

import {
    Body,
    Button,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title } from 'native-base';

import TaskTimer from '../Components/TaskTimer'
import TaskList from '../Components/TaskList'
import TimesheetList from '../Components/TimesheetList'

import { connect } from 'react-redux'

import TasksActions, { getSelectedTask, getSelectedTaskChilds } from '../Redux/TasksRedux'
import { selectTaskTimesheets } from '../Redux/TimesheetsRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

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
            <Container>
                <Header>
                    <Left>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body>
                        <Title>{task.project_id[1]} - {task.name}</Title>
                    </Body>
                    <Right>
                        <EntypoIcon
                            name="add-to-list"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Right>
                </Header>


                <Content>
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
                </Content>
                <Footer>
                    <FooterTab>
                        <TaskTimer />
                    </FooterTab>
                </Footer>
            </Container>
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
