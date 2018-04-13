import React, { Component } from 'react'

import {
    Container,
    Content,
 } from 'native-base';

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import TaskList from '../Components/TaskList'
import FloatingMenu from '../Components/FloatingMenu'

import TasksActions from '../Redux/TasksRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ProjectScreenStyle'
import { Colors } from '../Themes/'

import I18n from '../I18n';

class ProjectScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.projectName : 'Project need a name!',
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
            'ProjectTaskScreen',
            {
                taskName: item.name,
                taskId: item.id
            }
        )
    };

    render () {
        const project = this.props.project
        const projectTasks = this.props.tasks
        const { navigate } = this.props.navigation

        return (
            <Container>

                <Content>
                    <TaskList
                        userTasks={projectTasks}
                        onTaskSelect={this._onPressTask}
                    />
                </Content>
                <FloatingMenu navigate={navigate}>
                </FloatingMenu>
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { projects, tasks } = state
    const { projectId } = props.navigation.state.params

    const activeProject = projects.list.find( item => item.id === projectId )
    const projectTasks =
        tasks.list.filter( item => item.project_id[0] === projectId )

    return {
        project: activeProject,
        tasks: projectTasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)
