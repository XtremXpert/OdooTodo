import { NavigationActions } from 'react-navigation'
import AppNavigation from '../Navigation/AppNavigation'

const { navigate, reset } = NavigationActions
const { getStateForAction } = AppNavigation.router

const INITIAL_STATE = getStateForAction(
    navigate(
        { routeName: 'LoadingScreen' }
    )
)

const NOT_LOGGED_IN_STATE = getStateForAction(
    navigate(
        { routeName: 'NotLoggedInStack' }
    )
)

const LOGGED_IN_STATE = getStateForAction(
    navigate(
        { routeName: 'LoggedInStack' }
    )
)

export function reducer (state = INITIAL_STATE, action) {
    let nextState
    switch (action.type) {
        case 'SET_REHYDRATION_COMPLETE':
            return NOT_LOGGED_IN_STATE
        case 'LOGOUT':
            return NOT_LOGGED_IN_STATE
        case 'LOGIN_SUCCESS':
            return LOGGED_IN_STATE
        case 'AUTO_LOGIN':
            return LOGGED_IN_STATE
    }
    nextState = getStateForAction(action, state)
    return nextState || state
}
