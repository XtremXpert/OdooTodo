import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    attachmentsRequest: ['attachmentsIds'],
    attachmentsFromMessages: ['sessionId', 'attachmentsIds'],
    attachmentsSuccess: ['payload'],
    attachmentsFailure: null
})

export const AttachmentsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    list: null,
    fetching: null,
    payload: null,
    error: null
})

/* ------------- Selectors ------------- */

// export const AttachmentsSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */
// request the data from an api
export const request = (state) => {
    return state.merge({
        // domain: domain,
        fetching: true,
        payload: null
    })
}

export const requestFromMessages = (state, { attachmentsIds }) => {
    console.tron.log('list ')
    console.tron.log(attachmentsIds)
    return state.merge({
        attachmentsIds: attachmentsIds,
        fetching: true,
        payload: null
    })
}

// successful api lookup == returgetSelectedUsern the payload to the reducer
export const success = (state, { payload } ) => {
    console.tron.log(state)
    let { list } = state

    if (list) {

        payload.forEach((element) => {
            if (list.find(attachment => attachment.id === element.id)) {
                // reccord exist, update existing
                list.map (( item ) => {
                    if (item.id === element.id) {
                        // This isn't the item we care about - keep it as-is
                        return element
                    } else {
                        return item;
                    }
                })
            } else {
                // new reccord, we need to add it
                list = [ ...list, element]
            }
        })
    } else {
        list = payload
    }
    return state.merge({
        fetching: false,
        error: null,
        list: list
    })
}

// Something went wrong somewhere.
export const failure = (state, { error }) =>
    state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ATTACHMENTS_REQUEST]: request,
    [Types.ATTACHMENTS_FROM_MESSAGES]: requestFromMessages,
    [Types.ATTACHMENTS_SUCCESS]: success,
    [Types.ATTACHMENTS_FAILURE]: failure
})
