import React from 'react'
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import AppNavigation from './AppNavigation'

// here is our redux-aware smart component
function ReduxNavigation (props) {
    const { dispatch, nav } = props
    const navigation = addNavigationHelpers({
        dispatch,
        state: nav,
        addListener: createReduxBoundAddListener('root')
    })

    return <AppNavigation navigation={navigation} />
}

ReduxNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(ReduxNavigation)
