import React from 'react'

import {
    Container,
    Header,
    Fab,
    Footer,
    Icon,
    Content,
    Button,
    Text } from 'native-base';

import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux'

import LoginActions from '../Redux/LoginRedux'
import TasksActions from '../Redux/TasksRedux'
import ProjectsActions from '../Redux/ProjectsRedux'
import TimesheetsActions from '../Redux/TimesheetsRedux'
import UsersActions from '../Redux/UsersRedux'

import styles from './Styles/DrawerContainerStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OcticonsIcon from 'react-native-vector-icons/Octicons'

// Same when working with expo
// import OcticonsIcon from '@expo/vector-icons/Octicons'
// import EntypoIcon from '@expo/vector-icons/Entypo'
// import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

export class DrawerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
            activeFabUp: false,
        };
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

    render() {
        const { navigate } = this.props.navigation
        return (
            <Container style={styles.drawerContainer}>
                <Content>
                    <Button
                        style={styles.buttonBig}
                        onPress={() => navigate('Home')}
                        full
                        rounded >
                        <MCIcon
                            name="home-account"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle} />
                        <Text>{I18n.t('Home')}</Text>
                    </Button>

                    <Button
                        style={styles.buttonBig}
                        onPress={() => navigate('Projects')}
                        full
                        rounded >
                        <OcticonsIcon
                            name="project"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                        <Text>{I18n.t('Project')}</Text>
                    </Button>

                    <Button
                        style={styles.buttonBig}
                        onPress={() => navigate('Users')}
                        full
                        rounded >
                        <EntypoIcon
                            name="users"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                        <Text>{I18n.t('User')}</Text>
                    </Button>

                    <Button
                        style={styles.buttonBig}
                        onPress={this.props.logout}
                        full
                        rounded >
                        <MCIcon
                            name="logout"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle} />
                        <Text>{I18n.t('LogOut')}</Text>
                    </Button>
                </Content>
                <Fab
                    active={this.state.activeFab}
                    direction="up"
                    containerStyle={{ }}
                    style={styles.fabStyle}
                    position="bottomRight"
                    onLongPress={() =>  navigate('DrawerToggle')}
                    onPress={() => this.setState({ activeFab: !this.state.activeFab })} >
                    <Icon name="download" />
                    <Button
                        style={styles.fabButton}
                        onPress={this._RefreshProject}
                        full
                        rounded >
                        <OcticonsIcon
                            name="project"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.fabButton}
                        onPress={this._RefreshUsers}
                        full
                        rounded >
                        <EntypoIcon
                            name="users"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.fabButton}
                        onPress={this._RefreshTasks}
                        full
                        rounded >
                        <OcticonsIcon
                            name="tasklist"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.fabButton}
                        onPress={this._RefreshTimesheets}
                        full
                        rounded >
                        <MCIcon
                            name="timetable"
                            color={Colors.fourth}
                            size={30}
                            style={styles.buttonIconStyle} />
                    </Button>
                </Fab>

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { sessionId } = state.login

    return {
        sessionId: sessionId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LoginActions.logout()),
        getTasks: (sessionId) => dispatch(TasksActions.tasksRequest(sessionId)),
        getUsers: (sessionId) => dispatch(UsersActions.usersRequest(sessionId)),
        getProjects: (sessionId) => dispatch(ProjectsActions.projectsRequest(sessionId)),
        getTimesheets: (sessionId, projectsId) => dispatch(TimesheetsActions.timesheetsRequest(sessionId, projectsId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
