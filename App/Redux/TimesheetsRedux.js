import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import dateFormat from 'dateformat';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    timesheetsRequest: ['sessionId', 'projectIds'],
    timesheetsSuccess: ['payload'],
    timesheetsFailure: null,
    timesheetsOpen: [ 'task_id', 'user_id', 'startTime' ],
    timesheetsClose: [ 'task_id', 'user_id', 'startTime', 'stopTime' ]
})

export const TimesheetsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    list: [],
    fetching: null,
    payload: null,
    error: null,
//    selectedTask: null
})

/* ------------- Selectors ------------- */

/* Return the timesheets related to the active project */
export const selectProjectTimesheets = (state) => {
    const selectedProject = state.projects.selectedProject
    const list = state.timesheets.list
    return list.filter(
        timesheet => timesheet.project_id[0] === selectedProject)
}

/* Return the timesheets related to the active task */
export const selectTaskTimesheets = (state) => {
    const selectedTask = state.tasks.selectedTask
    const list = state.timesheets.list
    return list.filter(
        timesheet => timesheet.task_id[0] === selectedTask)
}

/* Return the timesheets related to the active user */
export const selectUserTimesheets = (state) => {
    const selectedUser = state.users.selectedUser
    const timesheetsList = state.timesheets.list
    return timesheetsList.filter(
        timesheet => timesheet.user_id[0] === selectedUser)
}

/* Return the timesheets actualy open */
export const getOpenTimesheets = (state) => {
    const timesheetsList = state.timesheets.list
    return timesheetsList.filter(
        timesheet => (timesheet.write_date == null  &&
            timesheet.stopTime == null))
}

/* ------------- Reducers ------------- */

// request the data from odoo
export const request = (state, { projectIds } ) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}

// open a new timesheet (Press the start button)
export const open = (state, { task_id, user_id, startTime } ) => {
    console.tron.log('startTime')
    console.tron.log(dateFormat(startTime,'yyyy-mm-dd'))
    return {
        ...state,
        list: [...state.list, {
            name: 'Start @ ',
            date: dateFormat(startTime,'yyyy-mm-dd'),
            task_id: [task_id],
            user_id: user_id,
            startTime: startTime
        } ]
    }
}

// close openTimesheet (Press the stop button)
export const close = (state, { task_id, user_id, startTime, stopTime } ) => {
    console.tron.log('stopTime')
    console.tron.log('stopTime')
    console.tron.log('state')
    return {
        ...state,
        list: state.list.map(timesheet => timesheet.startTime === startTime ?
            // transform the one with a matching id
            { ...timesheet,
                stopTime: stopTime,
                name: `from ${dateFormat(startTime,'HH:MM')} to ${dateFormat(stopTime,'HH:MM')}`,
                unit_amount: (stopTime - startTime) / (3600 * 1000)
             } :
            // otherwise return original todo
            timesheet
        )
    }
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
    [Types.TIMESHEETS_REQUEST]: request,
    [Types.TIMESHEETS_SUCCESS]: success,
    [Types.TIMESHEETS_FAILURE]: failure,
    [Types.TIMESHEETS_OPEN]: open,
    [Types.TIMESHEETS_CLOSE]: close,
//    [Types.TIMESHEETS_UPDATE]: update,
//    [Types.SET_SELECTED_TIMESHEETS]: setSelectedTask
})
