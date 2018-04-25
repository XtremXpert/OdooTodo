import { call, put } from 'redux-saga/effects'
import ProjectsActions from '../Redux/ProjectsRedux'

export function * getProjects (apiOdoo, action) {
    const { sessionId } = action
    // make the call to the api

    //const response = yield call(apiOdoo.getProjects, sessionId)
    const response = yield call(apiOdoo.search_read,
        'project.project', {
            domain: [ [ 'active', '=', true ] ],
            // fields: fields
        })

    // success?
    if (response.ok) {
        if (response.data.error) {
            yield put(ProjectsActions.projectsFailure('WRONG'))
        } else {
            yield put(ProjectsActions.projectsSuccess(response.data.result))
        }
    } else {
        yield put(ProjectsActions.projectsFailure('WRONG'))
    }
}
