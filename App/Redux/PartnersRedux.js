import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    partnersRequest: ['sessionId'],
    partnersSuccess: ['payload'],
    partnersFailure: null,
})

export const PartnersTypes = Types
export default Creators

/* ------------- Selectors ------------- */
// export const getSelectedUser = (state) => {
//     const { selectedUser, list } = state.users
//     return list.find(user => user.user_id[0] === selectedUser)
// }

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    list: [],
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
    var keys = Object.keys(payload[0]);
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
    [Types.PARTNERS_REQUEST]: request,
    [Types.PARTNERS_SUCCESS]: success,
    [Types.PARTNERS_FAILURE]: failure,
})
