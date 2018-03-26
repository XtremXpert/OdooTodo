import React from 'react'

import {
    View,
    Text } from 'react-native'

import Button from 'react-native-smart-button'
import TaskList from '../Components/TaskList'

import { connect } from 'react-redux'

import { selectUserTasks } from '../Redux/TasksRedux'
import { getSelectedUser } from '../Redux/UsersRedux'

import TasksActions from '../Redux/TasksRedux'

// Styles
import styles from './Styles/UserScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'

class UserScreenScreen extends React.Component {
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
            <View style={styles.containerPage}>
                <Text style={styles.headerText}>{user.name}</Text>
                <TaskList
                    userTasks={userTasks}
                    onTaskSelect={this._onPressTask}
                />
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
