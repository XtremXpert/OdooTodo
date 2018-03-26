import { call, put } from 'redux-saga/effects'
import UsersActions from '../Redux/UsersRedux'

export function * getUsers (apiOdoo, action) {
    const { sessionId } = action
    // make the call to the api
    const response = yield call(apiOdoo.getUsers, sessionId)

    // success?
    if (response.ok) {
        if (response.data.error) {
            yield put(UsersActions.usersFailure('Wrong'))
        } else {
            yield put(UsersActions.usersSuccess(response.data.result))
        }
    } else {
        yield put(UsersActions.usersFailure('Wrong'))
    }
}
