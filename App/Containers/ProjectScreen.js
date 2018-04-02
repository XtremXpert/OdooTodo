import React, { Component } from 'react'

import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title } from 'native-base';

import TaskList from '../Components/TaskList'

import { connect } from 'react-redux'

import { selectProjectTasks } from '../Redux/TasksRedux'
import { getSelectedProject } from '../Redux/ProjectsRedux'

import TasksActions from '../Redux/TasksRedux'

// Styles
import styles from './Styles/ProjectScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';


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
        const { navigate } = this.props.navigation
        
        return (
            <Container>

                <Header>
                    <Left>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body>
                        <Title>{project.name}</Title>
                    </Body>
                    <Right>
                        <EntypoIcon
                            name="add-to-list"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Right>
                </Header>

                <Content>
                    <TaskList
                        userTasks={projectTasks}
                        onTaskSelect={this._onPressTask}
                    />
                </Content>

            </Container>
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
