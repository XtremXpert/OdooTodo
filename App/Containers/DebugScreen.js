import React, { Component } from 'react'
import { connect } from 'react-redux'

import TasksActions from '../Redux/TasksRedux'
import ProjectsActions from '../Redux/ProjectsRedux'
import TimesheetsActions from '../Redux/TimesheetsRedux'
import UsersActions from '../Redux/UsersRedux'
import PartnersActions from '../Redux/PartnersRedux'
import MessagesActions from '../Redux/MessagesRedux'
import AttachmentsActions from '../Redux/AttachmentsRedux'

import {
    Container,
    Header,
    Fab,
    Footer,
    Icon,
    Content,
    Button,
    Text } from 'native-base';

import {
        Col,
        Row,
        Grid } from 'react-native-easy-grid';

// Styles
import styles from './Styles/DebugScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OcticonsIcon from 'react-native-vector-icons/Octicons'

import I18n from '../I18n';

class DebugScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: I18n.t('debug'),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
            activeFabUp: false,
        };
    }

    _RefreshMessages = () => {
        const { getMessages, sessionId } = this.props

        this.isAttempting = true
        getMessages(sessionId)
    }

    _RefreshAttachments = () => {
        const { getAttachments, sessionId } = this.props

        this.isAttempting = true
        getAttachments(sessionId)
    }

    _RefreshPartners = () => {
        const { getPartners, sessionId } = this.props

        this.isAttempting = true
        getPartners(sessionId)
    }

    _RefreshTasks = () => {
        const { getTasks, sessionId } = this.props

        this.isAttempting = true
        getTasks(sessionId)
    }

    _RefreshProject = () => {
        const { getProjects, sessionId } = this.props

        this.isAttempting = true
        getProjects(sessionId)
    }

    _RefreshUsers = () => {
        const { getUsers, sessionId } = this.props

        this.isAttempting = true
        getUsers(sessionId)
    }

    _RefreshTimesheets = () => {
        const { getTimesheets, sessionId, projectsId } = this.props

        this.isAttempting = true
        getTimesheets(sessionId, projectsId)
    }

    render () {
        const { qProjects,
                qTasks,
                qUsers,
                qPartners,
                qAttachments,
                qMessages  } = this.props
        const { navigate } = this.props.navigation

        return (
            <Container style={styles.drawerContainer}>
                <Content>
                    <Grid style={styles.grid}>

                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Users</Text>
                            </Col>
                            <Col size={1}>
                                <Text>{qUsers}</Text>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Partners:</Text>

                            </Col>
                            <Col size={1}>
                                <Text>{qPartners}</Text>

                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshPartners}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>

                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Projects:</Text>
                            </Col>
                            <Col size={1}>
                                <Text>{qProjects}</Text>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshProject}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Tasks:</Text>

                            </Col>
                            <Col size={1}>
                                <Text>{qTasks}</Text>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshTasks}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Timesheets</Text>
                            </Col>
                            <Col size={1}>
                                <Text>{qTimesheets}</Text>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshTimesheets}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle} />
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Messages</Text>
                            </Col>
                            <Col size={1}>
                                <Text>{qMessages}</Text>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshMessages}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="refresh"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="autorenew"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col size={3}>
                                <Text>Attachments:</Text>
                            </Col>
                            <Col size={1}>
                                <Text>{qAttachments}</Text>
                            </Col>
                            <Col size={1}>
                            </Col>
                            <Col size={1}>
                                <Button
                                    style={styles.fabButton}
                                    onPress={this._RefreshUsers}
                                    full
                                    rounded >
                                    <MCIcon
                                        name="notification-clear-all"
                                        color={Colors.fourth}
                                        size={30}
                                        style={styles.buttonIconStyle}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Button
                                style={styles.fabButton}
                                onPress={() => navigate('Home')}
                                full
                                rounded >
                                <MCIcon
                                    name="home-account"
                                    color={Colors.fourth}
                                    size={30}
                                    style={styles.buttonIconStyle} />
                                <Text>{I18n.t('returnHome')}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {
        login,
        projects,
        users,
        tasks,
        partners,
        messages,
        attachments,
        timesheets } = state

    qProjects = projects.list ? projects.list.length : 0
    qTasks = tasks.list ? tasks.list.length : 0
    qUsers = users.list ? users.list.length : 0
    qPartners = partners.list ? partners.list.length : 0
    qAttachments = attachments.list ? attachments.list.length : 0
    qMessages = messages.list ? messages.list.length : 0
    qTimesheets = timesheets.list ? timesheets.list.length : 0

    return {
        qProjects: qProjects,
        qTasks: qTasks,
        qUsers: qUsers,
        qPartners: qPartners,
        qAttachments: qAttachments,
        qMessages: qMessages,
        qTimesheets: qTimesheets,
        login: login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LoginActions.logout()),

        getTasks: (sessionId) => dispatch(
            TasksActions.tasksRequest(sessionId)),

        getUsers: (sessionId) => dispatch(
            UsersActions.usersRequest(sessionId)),

        getProjects: (sessionId) => dispatch(
            ProjectsActions.projectsRequest(sessionId)),

        getTimesheets: (sessionId, projectsId) => dispatch(
            TimesheetsActions.timesheetsRequest(sessionId, projectsId)),

        getPartners: (sessionId) => dispatch(
            PartnersActions.partnersRequest(sessionId)),

        getMessages: (sessionId) => dispatch(
            MessagesActions.messagesRequest(sessionId)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen)
