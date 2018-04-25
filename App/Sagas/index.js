import { takeLatest, all } from 'redux-saga/effects'
import Odoo from '../Services/Odoo'

// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ProjectsTypes } from '../Redux/ProjectsRedux'
import { UsersTypes } from '../Redux/UsersRedux'
import { TasksTypes } from '../Redux/TasksRedux'
import { TimesheetsTypes } from '../Redux/TimesheetsRedux'
import { MessagesTypes } from '../Redux/MessagesRedux'
import { PartnersTypes } from '../Redux/PartnersRedux'
import { AttachmentsTypes } from '../Redux/AttachmentsRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getProjects } from './ProjectsSagas'
import { getUsers } from './UsersSagas'
import { getTasks } from './TasksSagas'
import { getTimesheets } from './TimesheetsSagas'
import { getMessages } from './MessagesSagas'
import { getPartners } from './PartnersSagas'
import { getAttachments } from './AttachmentsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
//const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
console.tron.log('this')
console.tron.log()
const odoo = Odoo.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, odoo),
    takeLatest(ProjectsTypes.PROJECTS_REQUEST, getProjects, odoo),
    takeLatest(UsersTypes.USERS_REQUEST, getUsers, odoo),
    takeLatest(TasksTypes.TASKS_REQUEST, getTasks, odoo),
    takeLatest(TimesheetsTypes.TIMESHEETS_REQUEST, getTimesheets, odoo),
    takeLatest(MessagesTypes.MESSAGES_REQUEST, getMessages, odoo),
    takeLatest(PartnersTypes.PARTNERS_REQUEST, getPartners, odoo),
    takeLatest(AttachmentsTypes.ATTACHMENTS_REQUEST, getAttachments, odoo),
    takeLatest(AttachmentsTypes.ATTACHMENTS_FROM_MESSAGES, getAttachments, odoo)
    // some sagas receive extra parameters in addition to an action
//    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
