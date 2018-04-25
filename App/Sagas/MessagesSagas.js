import { call, put } from 'redux-saga/effects'
import MessagesActions from '../Redux/MessagesRedux'
import { getAttachments } from './AttachmentsSagas'
import AttachmentsActions from '../Redux/AttachmentsRedux'

export function * getMessages (apiOdoo, action) {
    const { sessionId } = action
    const fields = [
        '__last_update',
        // 'author_avatar',
        'author_id',
        'attachment_ids',
        'body',
        'channel_ids',
        //WHY ???
        // 'childs_ids',
        'create_date',
        'create_uid',
        'date',
        'display_name',
        'email_from',
        'id',
        // 'message_id',
        // 'mail_activity_type_id',
        // 'mail_server_id',
        'message_type',
        'model',
        // WHY ???
        // 'name',
        'no_auto_thread',
        'needaction',
        'needaction_partner_ids',
        'notification_ids',
        'parent_id',
        'partner_ids',
        'record_name',
        'reply_to',
        'res_id',
        'subject',
        'subtype_id',
        'starred',
        'starred_partner_ids',
        'write_date',
        'write_uid',
    ]

    // make the call to the api

    // const response = yield call(apiOdoo.getMessages, sessionId)
    const response = yield call(apiOdoo.search_read,
        'mail.message', {
//            domain: [ [ 'active', '=', true ] ],
            fields: fields
        })

    // success?
    if (response.ok) {
        if (response.data.error) {
            yield put(MessagesActions.messagesFailure('WRONG'))
        } else {
            yield put(MessagesActions.messagesSuccess(response.data.result))

            const attachmentsIds = [ ...new Set(response.data.result.filter(
                msg => msg.attachment_ids.length).map(
                    msg => msg.attachment_ids).reduce(
                        (a, b) => a.concat(b) ))]

            yield put(AttachmentsActions.attachmentsRequest(attachmentsIds))
        }
    } else {
        yield put(MessagesActions.messagesFailure('WRONG'))
    }
}
