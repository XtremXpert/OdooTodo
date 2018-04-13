import React from 'react'

import {
    Container,
    Content } from 'native-base';

import TaskList from '../Components/TaskList'
import FloatingButton from '../Components/FloatingButton'

import { connect } from 'react-redux'

import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes/'

import I18n from '../I18n';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
// TODO find a way to put username in the header
//        const { params } = navigation.state;
        return {
            title: I18n.t('homeScreen'),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
        };
    }

    _onPressTask = (item) => {
        this.props.navigation.navigate(
            'HomeTaskScreen',
            {
                taskName: item.name,
                taskId: item.id
            }
        )
    };

    render () {
        const { fullname, tasks } = this.props
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Content>
                    <TaskList
                        userTasks={tasks}
                        onTaskSelect={this._onPressTask}
                    />
                </Content>
                <FloatingButton navigate={navigate} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { sessionId, userId } = state.login
    const { tasks, users } = state

    const user = users.list.find(item => item.id === userId)
    const userTasks = tasks.list.filter(item => item.user_id[0] === userId)

    return {
        tasks: userTasks,
        user,
        sessionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
