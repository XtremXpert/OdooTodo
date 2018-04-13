import React from 'react'

import {
    Body,
    Button,
    Card,
    Container,
    Content,
    Fab,
    Footer,
    FooterTab,
    Form,
    Header,
    H1,
    H2,
    H3,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Segment,
    Text,
    Title } from 'native-base';

import HTML from 'react-native-render-html';

import {
    Col,
    Row,
    Grid } from 'react-native-easy-grid';

import TaskTimer from '../Components/TaskTimer'
import TaskList from '../Components/TaskList'
import TimesheetList from '../Components/TimesheetList'
import TaskForm from '../Components/TaskForm'

import FloatingMenu from '../Components/FloatingMenu'


import { connect } from 'react-redux'

import TasksActions from '../Redux/TasksRedux'
import TimesheetsActions from '../Redux/TimesheetsRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

class TaskScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.taskName : 'Task need a name!',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSegment: 'details',
            activeFab: false,
        };
    }

    _onPressBack = () => {
         this.props.navigation.goBack();
    }

    _onPressStart = () => {
        startTime = new Date()
        this.props.openTimesheet(
            task.id,
            8,
            startTime )
        this.setState({
            startTime : this.props.startTime
        })
    }

    _onPressStop = () => {
        this.props.closeTimesheet(
            task.id,
            8,
            this.props.openTimeSheets[0].startTime,
            new Date()
        )
    }

    handleSelectTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    }

    render () {
        const { fullname,
//                setSelectedTask,
                task,
                timesheets,
                childTasks,
                openTimeSheets
            } = this.props

        const { goBack, navigate } = this.props.navigation


        const startTime = (
            ((openTimeSheets.length > 0) && (openTimeSheets[0].task_id == task.id))
                ? openTimeSheets[0].date : null )

        return (
            <Container>
                <Segment>
                    <Button
                        active={this.state.activeSegment === 'details'}
                        onPress={() => this.setState({ activeSegment: 'details' })}
                        first
                        >
                        <Text>{I18n.t('details')}</Text>
                    </Button>
                    <Button
                        active={this.state.activeSegment === 'evolution'}
                        onPress={() => this.setState({ activeSegment: 'evolution' })}
                        >
                        <Text>{I18n.t('evolution')}</Text>
                    </Button>
                    <Button
                        active={this.state.activeSegment === 'notes'}
                        onPress={() => this.setState({ activeSegment: 'notes' })}
                        last>
                        <Text>{I18n.t('notes')}</Text>
                    </Button>
                </Segment>
                <Content>
                    { this.state.activeSegment === 'details' &&
                        <TaskForm task={task} />
                    }
                    { this.state.activeSegment === 'evolution' &&
                        <Grid style={{padding:10}}>
                            <Row style={{flex:0, paddingHorizontal:10}}>
                                <H1>{I18n.t('timesheets')}</H1>
                            </Row>
                            <Row style={{flex:1}}>
                                <TimesheetList
                                    timesheets={timesheets}
                                />
                            </Row>
                            <Row style={{flex:0, paddingTop: 10, paddingHorizontal:10}}>
                                <H1>{I18n.t('subtasks')}</H1>
                            </Row>
                            <Row style={{flex:1}}>
                                <TaskList
                                    userTasks={childTasks}
                                    onTaskSelect={this.handleSelectTask}
                                />
                            </Row>
                        </Grid>                    }
                    {/* { this.state.activeSegment === 'notes' &&

                    } */}

                </Content>
                <Footer>
                    <FooterTab>
                        { (openTimeSheets.length > 0  &&
                                openTimeSheets[0].task_id[0] != task.id )
                        ? <Text>Disabled should be replace by a button to
                            close open timesheet and create a new one</Text>
                        : <TaskTimer
                            disabled={openTimeSheets.length > 0  &&
                                openTimeSheets[0].task_id[0] != task.id}
                            onStopTimer={this._onPressStop}
                            onStartTimer={this._onPressStart}
                            startTime={startTime}
                        />
                    }
                    </FooterTab>
                </Footer>
                <FloatingMenu navigate={navigate}>
                </FloatingMenu>
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { tasks, timesheets } = state
    const { sessionId, user_id } = state.login
    const { taskId } = props.navigation.state.params

    const task = tasks.list.find( item => item.id === taskId )
    const childTasks = tasks.list.filter(
        task => task.child_ids.indexOf(taskId) >=0 )
    const taskTimesheets = timesheets.list.filter(
        timesheet => timesheet.task_id[0] === taskId)
    const openTimeSheets = timesheets.list.filter(
        timesheet => (timesheet.write_date == null  &&
            timesheet.stopTime == null))

    return {
        task: task,
        childTasks: childTasks,
        timesheets: taskTimesheets,
        sessionId: sessionId,
        openTimeSheets: openTimeSheets
//        username: state.login.
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openTimesheet: (task_id, user_id, startTime) =>
            dispatch(TimesheetsActions.timesheetsOpen(task_id, user_id, startTime)),
        closeTimesheet: (task_id, user_id, startTime, stopTime) =>
            dispatch(TimesheetsActions.timesheetsClose(task_id, user_id, startTime, stopTime)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen)
