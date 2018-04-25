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
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.userName : 'User need a name!',
        }
    };

    _onPressTask = (item) => {
        // this.props.setSelectedTask(item)
        this.props.navigation.navigate(
            'UserTaskScreen',
            {
                taskName: item.name,
                taskId: item.id
            }
        )
    };

    render () {
        const user = this.props.user
        const userTasks = this.props.tasks
        return (
            <Container>
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

const mapStateToProps = (state, props) => {
    const { users, tasks } = state
    const { userId } = state.login

    const user = users.list.find(item => item.id === userId )
    const userTasks =
        tasks.list.filter( item => item.user_id[0] === userId )

    return {
        user: user,
        tasks: userTasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreenScreen)
