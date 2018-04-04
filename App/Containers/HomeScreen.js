import React from 'react'

import {
    Body,
    Container,
    Header,
    Left,
    Content,
    Title,
    Right,
    Button,
    Text } from 'native-base';

import TaskList from '../Components/TaskList'

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'

import TasksActions, { selectLoggedUserTasks } from '../Redux/TasksRedux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import I18n from '../I18n';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: I18n.t('homeScreen'),
        drawerLabel: 'Home',
    };

    _selectTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    };

    render () {
        const { fullname, tasks } = this.props
        const { navigate } = this.props.navigation
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
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title>Accueil</Title>
                    </Body>
                    <Right style={styles.headerRight} />
                </Header>
                <Content>
                    <TaskList
                        userTasks={tasks}
                        onTaskSelect={this._selectTask}
                    />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { fetching, sessionId, fullname } = state.login
    return {
        tasks: selectLoggedUserTasks(state),
        sessionId: sessionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: (task) => dispatch(TasksActions.setSelectedTask(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
