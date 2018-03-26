import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    usersRequest: ['sessionId'],
    usersSuccess: ['payload'],
    usersFailure: null,
    setSelectedUser: ['user'],
    clearSelectedUser: null,
})

export const UsersTypes = Types
export default Creators

/* ------------- Selectors ------------- */
export const getSelectedUser = (state) => {
    const { selectedUser, list } = state.users
    return list.find(user => user.user_id[0] === selectedUser)
}

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    list: [],
    fetching: null,
    error: null,
    payload: null,
    selectedUser: null,
})

/* ------------- Reducers ------------- */
export const setSelectedUser = (state, { user }) => {
    return state.merge({ selectedUser: user })
}

export const clearSelectedUser = (state) => {
    return state.merge({ selectedUser: null })
}


// request the data from an api
export const request = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}

// successful api lookup == returgetSelectedUsern the payload to the reducer
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
    [Types.USERS_REQUEST]: request,
    [Types.USERS_SUCCESS]: success,
    [Types.USERS_FAILURE]: failure,
    [Types.SET_SELECTED_USER]: setSelectedUser,
    [Types.CLEAR_SELECTED_USER]: clearSelectedUser,

})
