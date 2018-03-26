import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    projectsRequest: ['sessionId'],
    projectsSuccess: ['payload'],
    projectsFailure: null,
    setSelectedProject: ['project'],
    clearSelectedProject: null,
})

export const ProjectsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    list: [],
    fetching: null,
    error: null,
    payload: null,
    selectedProject: null,
})

/* ------------- Selectors ------------- */
export const getSelectedProject = (state) => {
    const selectedProject = state.projects.selectedProject
    const projectsList = state.projects.list
    return projectsList.find(project => project.id === selectedProject)
}

export const getAllProjects = (state) => {
    const projectsList = state.projects.list
    return projectsList.map(project => project.id)
}

/* ------------- Reducers ------------- */
export const setSelectedProject = (state, { project }) => {
    return state.merge({ selectedProject: project })
}

export const clearSelectedProject = (state) => {
    return state.merge({ selectedProject: null })
}

export const request = (state) => {
    return state.merge({
        fetching: true,
        payload: null
    })
}

export const success = (state, { payload } ) => {
    return state.merge({
        fetching: false,
        error: null,
        list: payload
    })
}


// Something went wrong somewhere.
export const failure = (state, { error }) =>
    state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROJECTS_REQUEST]: request,
    [Types.PROJECTS_SUCCESS]: success,
    [Types.PROJECTS_FAILURE]: failure,
    [Types.SET_SELECTED_PROJECT]: setSelectedProject,
    [Types.CLEAR_SELECTED_PROJECT]: clearSelectedProject,
})

// /* ------------- Selector ------------- */
// export const getSortedProject = (state) => {
//     const list = state.getIn(['project', 'Projects']);
//     return list.sort((a, b) => {
//         const aId = a.get('id');
//         const bId = b.get('id');
//         if (aId < bId) { return -1; }
//         if (aId > bId) { return 1; }
//         if (aId === bId) { return 0; }
//         }
//     )
// }
