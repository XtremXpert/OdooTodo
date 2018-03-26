import { call, put } from 'redux-saga/effects'
import TimesheetsActions from '../Redux/TimesheetsRedux'

export function * getTimesheets (apiOdoo, action) {
    const { sessionId, projectIds } = action
    // make the call to the api

    const response = yield call(apiOdoo.getTimesheets, sessionId, projectIds)

    // success?
    if (response.ok) {
        if (response.data.error) {
            yield put(TimesheetsActions.timesheetsFailure('WRONG'))
        } else {
            yield put(TimesheetsActions.timesheetsSuccess(response.data.result))
        }
    } else {
        yield put(TimesheetsActions.timesheetsFailure('WRONG'))
    }
}
