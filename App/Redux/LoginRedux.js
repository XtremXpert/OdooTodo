import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    loginSuccess: ['loginResponse'],
    loginFailure: ['error'],
    logout: null,
    autoLogin: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: null,
    company_id: null,
    username: '',
    password: '',
    fullname: '',
    sessionId: null,
    userId: null,
    partnerId: null,
    context: null,
  })

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}
// we've successfully logged in
export const success = (state, { loginResponse } ) => {
    return state.merge({
        fetching: false,
        error: null,
        company_id: loginResponse.company_id,
        username: loginResponse.username,
        fullname: loginResponse.name,
        sessionId: loginResponse.session_id,
        userId: loginResponse.uid,
        partnerId: loginResponse.partner_id,
        context: loginResponse.user_context,
    })
}

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state) => {
        return state.merge({
            sessionId: null })
}

// startup saga invoked autoLogin
export const autoLogin = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (state) => state.sessionId !== null
