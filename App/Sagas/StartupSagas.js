import { put, select } from 'redux-saga/effects'
//import GithubActions from '../Redux/GithubRedux'
import AppStateActions from '../Redux/AppStateRedux'
import { is } from 'ramda'
import LoggedInActions, { isLoggedIn } from '../Redux/LoginRedux'

// Selector
export const selectLoggedInStatus = (state) => isLoggedIn( state.login )

// process STARTUP actions
export function * startup (action) {
    console.tron.log (this.state)

    yield put(AppStateActions.setRehydrationComplete())
    const isLoggedIn = yield select(selectLoggedInStatus)

    console.tron.log (isLoggedIn)

    if (isLoggedIn) {
        yield put(LoggedInActions.autoLogin())
    }
}
