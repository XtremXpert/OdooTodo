import { put, select } from 'redux-saga/effects'
//import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import AppStateActions from '../Redux/AppStateRedux'
import LoggedInActions, { isLoggedIn } from '../Redux/LoginRedux'

import { is } from 'ramda'

// exported to make available for tests
//export const selectAvatar = GithubSelectors.selectAvatar
export const selectLoggedInStatus = (state) => isLoggedIn(state.login)

// process STARTUP actions
export function * startup (action) {
    if (__DEV__ && console.tron) {
        // straight-up string logging
        console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
    }
    yield put(AppStateActions.setRehydrationComplete())
    const isLoggedIn = yield select(selectLoggedInStatus)
    if (isLoggedIn) {
        yield put(LoggedInActions.autoLogin())
    }
}
