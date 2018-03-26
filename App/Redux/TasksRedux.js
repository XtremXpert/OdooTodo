import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    tasksRequest: ['sessionId'],
    tasksSuccess: ['payload'],
    tasksFailure: null,
    setSelectedTask: ['task'],
    clearSelectedUser: null,
})

export const TasksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    list: [],
    fetching: null,
    payload: null,
    error: null,
    selectedTask: null
})

/* ------------- Selectors ------------- */
export const selectProjectTasks = (state) => {
    const selectedProject = state.projects.selectedProject
    const tasksList = state.tasks.list
    return tasksList.filter(task => task.project_id[0] === selectedProject)
}

export const selectUserTasks = (state) => {
    const selectedUser = state.users.selectedUser
    const tasksList = state.tasks.list
    return tasksList.filter(task => task.user_id[0] === selectedUser)
}

export const selectLoggedUserTasks = (state) => {
    const selectedUser = state.login.userId
    const tasksList = state.tasks.list
    return tasksList.filter(task => task.user_id[0] === selectedUser)
}

export const getSelectedTask = (state) => {
    const selectedTask = state.tasks.selectedTask
    const tasksList = state.tasks.list
    return tasksList.find(task => task.id === selectedTask)
}

export const getSelectedTaskChilds = (state) => {
    const tasksList = state.tasks.list
    const selectedTask = tasksList.find(
        task => task.id === state.tasks.selectedTask
    )
    return tasksList.filter(task => selectedTask.child_ids.indexOf(task.id) >=0 )
}

/* ------------- Reducers ------------- */
export const setSelectedTask = (state, { task }) => {
    return state.merge({ selectedTask: task })
}

export const clearSelectedTask = (state) => {
    return state.merge({ selectedTask: null })
}

// request the data from an api
export const request = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}

// successful api lookup == return the payload to the reducer
export const success = (state, { payload } ) => {
    return state.merge({
        fetching: false,
        error: null,
        list: payload
    })
}

// Something went wrong somewhere.
export const failure = (state, { error }) =>
    state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TASKS_REQUEST]: request,
    [Types.TASKS_SUCCESS]: success,
    [Types.TASKS_FAILURE]: failure,
    [Types.SET_SELECTED_TASK]: setSelectedTask
})
