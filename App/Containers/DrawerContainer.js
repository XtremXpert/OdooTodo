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
import TasksActions, { selectLoggedUserTasks } from '../Redux/TasksRedux'
import ProjectsActions, { getAllProjects } from '../Redux/ProjectsRedux'
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

    _ViewProjects = () => {
        this.props.navigation.navigate( 'ProjectsScreen' );
    }

    _ViewUsers = () => {
        this.props.navigation.navigate( 'UsersScreen' );
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

    _logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,  // black magic
            actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
        })
        this.props.navigation.dispatch(actionToDispatch)
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Content>
                    <Button
                        style={styles.buttonBig}
                        onPress={() => navigate('Home')}
                        full
                        rounded >
                        <MCIcon
                            name="home-account"
                            color={Colors.btnText}
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
                            color={Colors.btnText}
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
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                        <Text>{I18n.t('User')}</Text>
                    </Button>

                    <Button
                        style={styles.buttonBig}
                        onPress={this._logout}
                        full
                        rounded >
                        <MCIcon
                            name="logout"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle} />
                        <Text>{I18n.t('LogOut')}</Text>
                    </Button>
                </Content>
                <Fab
                    active={this.state.activeFab}
    //                  active=false
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onLongPress={() =>  navigate('DrawerToggle')}
                    onPress={() => this.setState({ activeFab: !this.state.activeFab })} >
                    <Icon name="download" />
                    <Button
                        style={styles.buttonSmall}
                        onPress={this._RefreshProject}
                        full
                        rounded >
                        <OcticonsIcon
                            name="project"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.buttonSmall}
                        onPress={this._RefreshUsers}
                        full
                        rounded >
                        <EntypoIcon
                            name="users"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.buttonSmall}
                        onPress={this._RefreshTasks}
                        full
                        rounded >
                        <OcticonsIcon
                            name="tasklist"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                    <Button
                        style={styles.buttonSmall}
                        onPress={this._RefreshTimesheets}
                        full
                        rounded >
                        <MCIcon
                            name="timetable"
                            color={Colors.btnText}
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
//        tasks: selectLoggedUserTasks(state),
        projectsId : getAllProjects(state),
//        fullname: fullname,
//        fetching: fetching,
//        username: state.login.
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
//        setSelectedTask: (task) => dispatch(TasksActions.setSelectedTask(task)),
//        logout: () => dispatch(LoginActions.logout()),
       getTasks: (sessionId) => dispatch(TasksActions.tasksRequest(sessionId)),
       getUsers: (sessionId) => dispatch(UsersActions.usersRequest(sessionId)),
       getProjects: (sessionId) => dispatch(ProjectsActions.projectsRequest(sessionId)),
       getTimesheets: (sessionId, projectsId) => dispatch(TimesheetsActions.timesheetsRequest(sessionId, projectsId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
