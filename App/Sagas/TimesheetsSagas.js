import { call, put } from 'redux-saga/effects'
import TimesheetsActions from '../Redux/TimesheetsRedux'

//     const createTimesheet = (sessionId, name, date, unit_amount, task_id, user_id ) => {
//         odoo.setHeader('Cookie': sessionId)
//         return create('account.analytic.line', {
//             name: 'test',
//             date: date,
//             unit_amount: unit_amout,
//             task_id: task_id,
//             user_id:user_id,
// //          fields: ['name','id','project_id']
//         })
//     }

export function * getTimesheets (apiOdoo, action) {
    const { sessionId, projectIds } = action
    // make the call to the api

//    const response = yield call(apiOdoo.getTimesheets, sessionId, projectIds)
    const response = yield call(apiOdoo.search_read,
        'account.analytic.line', {
            domain: [ [ 'project_id', 'in', projectIds ] ],
            // fields: fields
        })
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
