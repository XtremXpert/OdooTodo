import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { StyleSheet } from 'react-native'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {

        mainContainer: {
            flex: 1,
            backgroundColor: Colors.transparent
        },

        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },

        containerPage: {
            flex: 1,
            paddingTop: Metrics.baseMargin,
            backgroundColor: Colors.page
        },

        bigContainer: {
            flex: 4,
            backgroundColor: Colors.transparent,
            justifyContent: 'flex-start'
        },

        container: {
            flex: 1,
            backgroundColor: Colors.transparent
        },

        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin
        },

        sectionText: {
            ...Fonts.style.normal,
            paddingVertical: Metrics.doubleBaseMargin,
            color: Colors.snow,
            marginVertical: Metrics.smallMargin,
            textAlign: 'center'
        },

        normalText: {
            ...Fonts.style.normal,
            color: Colors.snow,
            paddingHorizontal: Metrics.doubleBaseMargin,
            marginVertical: Metrics.smallMargin,
            textAlign: 'left',
            backgroundColor: "rgba(92, 99,216, 1)",

        },

        subtitle: {
            color: Colors.snow,
            padding: Metrics.smallMargin,
            marginBottom: Metrics.smallMargin,
            marginHorizontal: Metrics.smallMargin
        },

        titleText: {
            ...Fonts.style.h2,
            fontSize: 14,
            color: Colors.text
        },

        headerText: {
            color: Colors.btnPrimary,
            textAlign: 'center',
            marginTop: Metrics.marginVertical,
            ...Fonts.style.h4
        },

        buttonIconStyle:{
            paddingHorizontal: Metrics.smallMargin,
        },

        buttonTextStyle: {
            fontSize: 17,
            color: 'white'
        },

        buttonDisabledStyle: {
            backgroundColor: '#DDDDDD',
            borderWidth: 0,
        },

        buttonDisabledTextStyle: {
            color: '#BCBCBC',
        },

        buttonStyle: {
            margin: 10,
            height: 40,
            backgroundColor: Colors.btnPrimary,
            borderRadius: 3,
            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
        },

        btn: {
            backgroundColor: "rgba(92, 99,216, 1)",
            marginBottom:  Metrics.baseMargin,
        },


        btnList: {
            margin: Metrics.smallMargin,
            padding: Metrics.smallMargin,
            flexDirection: 'column',
            flex: 1,
            backgroundColor: Colors.fire,
        },

        btnInfo: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',

        },

        btnInfoLeft: {
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',

        },

        btnInfoRight: {
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',

        },

        btnHeader: {
            color: Colors.snow,
            textAlign: 'center',
            ...Fonts.style.h6
        },

        row: {
            flexDirection: 'row',
            flex: 1,
        },

        buttonRow: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
        },

    },

    darkLabelContainer: {
        padding: Metrics.smallMargin,
        paddingBottom: Metrics.doubleBaseMargin,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        marginBottom: Metrics.baseMargin
    },

    darkLabel: {
        fontFamily: Fonts.type.bold,
        color: Colors.snow
    },

    groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    sectionTitle: {
        ...Fonts.style.h4,
        color: Colors.coal,
        backgroundColor: Colors.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colors.ember,
        alignItems: 'center',
        textAlign: 'center'
    }
}

export default ApplicationStyles
