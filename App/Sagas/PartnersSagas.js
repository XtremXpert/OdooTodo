import { call, put } from 'redux-saga/effects'
import PartnersActions from '../Redux/PartnersRedux'

export function * getPartners (apiOdoo, action) {
    const { sessionId } = action
    const fields = [
        '__last_update',
        'active',
        'activity_date_deadline',
        'activity_ids',
        'activity_state',
        'activity_summary',
        'activity_type_id',
        'activity_user_id',
        // 'bank_ids',
        'barcode',
        'category_id',
        'channel_ids',
        'child_ids',
        'city',
        'color',
        'comment',
        'commercial_company_name',
        'commercial_partner_country_id',
        'commercial_partner_id',
        'company_id',
        'company_name',
        'company_type',
        'contact_address',
        'country_id',
        'create_date',
        'create_uid',
        // 'credit_limit',
        'customer',
        'date',
        'display_name',
        'email',
        'email_formatted',
        'employee',
        'function',
        'id',
        'im_status',
        // 'image',
        // 'image_medium',
        'image_small',
        'industry_id',
        'is_company',
        'lang',
        'message_bounce',
        'message_channel_ids',
        'message_follower_ids',
        'message_ids',
        'message_is_follower',
        'message_last_post',
        'message_needaction',
        'message_needaction_counter',
        'message_partner_ids',
        'message_unread',
        'message_unread_counter',
        'mobile',
        'name',
        'opt_out',
        'parent_id',
        'parent_name',
        'partner_share',
        'phone',
        'property_product_pricelist',
        'ref',
        'self',
        // 'signup_expiration',
        // 'signup_token',
        // 'signup_type',
        // 'signup_url',
        // 'signup_valid',
        'state_id',
        'street',
        'street2',
        'supplier',
        'task_count',
        'task_ids',
        'title',
        'type',
        'tz',
        'tz_offset',
        'user_id',
        'user_ids',
        'vat',
        'website',
        'website_message_ids',
        'write_date',
        'write_uid',
        'zip' ]
    // make the call to the api

    const response = yield call(apiOdoo.search_read,
        'res.partner', {
            domain: [ [ 'active', '=', true ] ],
            // fields: fields
        })

    // success?
    if (response.ok) {
        if (response.data.error) {
            yield put(PartnersActions.partnersFailure('WRONG'))
        } else {
            yield put(PartnersActions.partnersSuccess(response.data.result))
        }
    } else {
        yield put(PartnersActions.partnersFailure('WRONG'))
    }
}
