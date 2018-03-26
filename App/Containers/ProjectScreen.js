import React, { Component } from 'react'

import {
    View,
    Text } from 'react-native'

import Button from 'react-native-smart-button'
import TaskList from '../Components/TaskList'

import { connect } from 'react-redux'

import { selectProjectTasks } from '../Redux/TasksRedux'
import { getSelectedProject } from '../Redux/ProjectsRedux'

import TasksActions from '../Redux/TasksRedux'

// Styles
import styles from './Styles/ProjectScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'

class ProjectScreen extends Component {
    _onPressBack = () => {
         this.props.navigation.navigate( 'ProjectsScreen' );
    }

    _keyExtractor = (item, index) => item.id;

    _onPressTask = (item) => {
        this.props.setSelectedTask(item)
        this.props.navigation.navigate('TaskScreen')
    };

    render () {
        const project = this.props.project
        const projectTasks = this.props.tasks
        return (
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{project.name}</Text>
                <View style={styles.container}>
                    <TaskList
                        userTasks={projectTasks}
                        onTaskSelect={this._onPressTask}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10
                    }}>
                    <Button
                        onPress={() => this._onPressBack()}
                        style={styles.buttonStyle}
                        textStyle={styles.buttonTextStyle}
                    >
                        <EntypoIcon
                            name="back"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: getSelectedProject(state),
        tasks: selectProjectTasks(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: (task) => dispatch(TasksActions.setSelectedTask(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)
