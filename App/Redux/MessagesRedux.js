import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    messagesRequest: ['sessionId'],
    messagesSuccess: ['payload'],
    messagesFailure: null,
})

export const MessagesTypes = Types
export default Creators

/* ------------- Selectors ------------- */
// export const getSelectedUser = (state) => {
//     const { selectedUser, list } = state.users
//     return list.find(user => user.user_id[0] === selectedUser)
// }

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    list: [],
    attachmentsIds: [],
    fetching: null,
    error: null,
    payload: null,
})

/* ------------- Reducers ------------- */
// request the data from an api
export const request = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}

// successful api lookup == returgetSelectedUsern the payload to the reducer
export const success = (state, { payload } ) => {
    const attachmentsIds = [ ...new Set(payload.filter(
        msg => msg.attachment_ids.length).map(
            msg => msg.attachment_ids).reduce(
                (a, b) => a.concat(b) ))]

    return state.merge({
        attachmentsIds: attachmentsIds,
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
    [Types.MESSAGES_REQUEST]: request,
    [Types.MESSAGES_SUCCESS]: success,
    [Types.MESSAGES_FAILURE]: failure,
})
