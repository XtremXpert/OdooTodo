import { call, put } from 'redux-saga/effects'
import AttachmentsActions from '../Redux/AttachmentsRedux'
// import { AttachmentsSelectors } from '../Redux/AttachmentsRedux'

export function * getAttachments (apiOdoo, action) {
    const { sessionId, attachmentsIds } = action
//    console.tron.log(action)
    // make the call to the api
//    const response = yield call(apiOdoo.getAttachments, sessionId, domain)
    console.tron.log('in attachmentsIds ' + attachmentsIds)
    // const response = yield call(apiOdoo.getAttachments, sessionId, attachmentsIds)
    const response = yield call(apiOdoo.get,
        'ir.attachment', {ids:attachmentsIds})
    // Communication success?
    if (response.ok) {
        // Server error
        if (response.data.error) {
            yield put(AttachmentsActions.attachmentsFailure('WRONG'))
        // Succes
        } else {
            yield put(AttachmentsActions.attachmentsSuccess(response.data.result))
        }
    } else {
        // Communication error
        yield put(AttachmentsActions.attachmentsFailure('WRONG'))
    }
}
