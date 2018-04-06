import React, { Component } from 'react'

import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Fab,
    Icon,
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
    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
        };
    }

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
                        <Title>{project.name}</Title>
                    </Body>
                    <Right style={styles.headerRight}>
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

                <Fab
                active={this.state.activeFab}
//                  active=false
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onLongPress={() =>  navigate('DrawerToggle')}
                onPress={() => this.setState({ activeFab: !this.state.activeFab })} >
                <Icon name="share" />
                <Button style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="logo-whatsapp" />
                </Button>
                <Button style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                </Button>
                <Button disabled style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                </Button>
              </Fab>

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
