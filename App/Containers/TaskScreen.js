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

import { connect } from 'react-redux'

import TasksActions, {
    getSelectedTask,
    getSelectedTaskChilds } from '../Redux/TasksRedux'

import TimesheetsActions, {
    getOpenTimesheets,
    selectTaskTimesheets } from '../Redux/TimesheetsRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

class TaskScreen extends React.Component {
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
        console.tron.log(this.props)
        const { fullname,
                setSelectedTask,
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
                <Header>
                    <Left style={styles.headerLeft}>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                goBack()
                            }}/>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title>{task.project_id[1]} - {task.name}</Title>
                    </Body>
                    <Right style={styles.headerRight}>
                        <EntypoIcon
                            name="add-to-list"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Right>
                </Header>
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
                        ? <Text>Disabled</Text>
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
                <Fab
                  active={this.state.activeFab}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  onLongPress={() =>  navigate('DrawerToggle')}
                  onPress={() => this.setState({ active: !this.state.activeFab })}>
                  <Icon name="share" />
                  <Button style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="logo-whatsapp" />
                  </Button>
                  <Button style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                  </Button>
                  <Button disabled style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                  </Button>
                </Fab>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.tron.log(state)
    const { sessionId } = state.login
    return {
        task: getSelectedTask(state),
        childTasks: getSelectedTaskChilds(state),
        timesheets: selectTaskTimesheets(state),
        sessionId: sessionId,
        openTimeSheets: getOpenTimesheets(state)
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
        openTimesheet: (task_id, user_id, startTime) =>
            dispatch(TimesheetsActions.timesheetsOpen(task_id, user_id, startTime)),
        closeTimesheet: (task_id, user_id, startTime, stopTime) =>
            dispatch(TimesheetsActions.timesheetsClose(task_id, user_id, startTime, stopTime)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen)
