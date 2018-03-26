import { takeLatest, all } from 'redux-saga/effects'
import Odoo from '../Services/Odoo'
//import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ProjectsTypes } from '../Redux/ProjectsRedux'
import { UsersTypes } from '../Redux/UsersRedux'
import { TasksTypes } from '../Redux/TasksRedux'
import { TimesheetsTypes } from '../Redux/TimesheetsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getProjects } from './ProjectsSagas'
import { getUsers } from './UsersSagas'
import { getTasks } from './TasksSagas'
import { getTimesheets } from './TimesheetsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
//const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const odoo = Odoo.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, odoo),
    takeLatest(ProjectsTypes.PROJECTS_REQUEST, getProjects, odoo),
    takeLatest(UsersTypes.USERS_REQUEST, getUsers, odoo),
    takeLatest(TasksTypes.TASKS_REQUEST, getTasks, odoo),
    takeLatest(TimesheetsTypes.TIMESHEETS_REQUEST, getTimesheets, odoo)
  ]
}
