import React from 'react'

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

import TaskList from '../Components/TaskList'

import { connect } from 'react-redux'

import { selectUserTasks } from '../Redux/TasksRedux'
import { getSelectedUser } from '../Redux/UsersRedux'

import TasksActions from '../Redux/TasksRedux'

// Styles
import styles from './Styles/UserScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import I18n from '../I18n';

class UserScreenScreen extends React.Component {
    static navigationOptions = {
        title: I18n.t('userslist'),
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />)
    }

    _onPressBack = () => {
         this.props.navigation.navigate( 'UsersScreen' );
    }

    _keyExtractor = (item, index) => item.id;

    _onPressTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    };

    render () {
        const user = this.props.user
        const userTasks = this.props.tasks
        return (
            <Container>
                <Text style={styles.headerText}>{user.name}</Text>
                <Content>
                    <TaskList
                        userTasks={userTasks}
                        onTaskSelect={this._onPressTask}
                    />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: getSelectedUser(state),
        tasks: selectUserTasks(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: (task) => dispatch(TasksActions.setSelectedTask(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreenScreen)
