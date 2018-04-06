import { NavigationActions } from 'react-navigation'
const { navigate, reset } = NavigationActions

import AppNavigation from '../Navigation/AppNavigation'
const { getStateForAction } = AppNavigation.router

const INITIAL_STATE = getStateForAction(
    navigate({ routeName: 'LoadingScreen' })
)

const NOT_LOGGED_IN_STATE = getStateForAction(reset({
    index: 0,
    actions: [
        navigate({ routeName: 'loginStack' })
    ]
}))

const LOGGED_IN_STATE = getStateForAction(reset({
    index: 0,
    actions: [
    navigate({ routeName: 'drawerStack' })
  ]
}))

export function reducer (state = INITIAL_STATE, action) {
    console.tron.log(state)
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
