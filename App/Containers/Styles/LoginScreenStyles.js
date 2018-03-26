import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    form: {
        backgroundColor: Colors.snow,
        margin: Metrics.baseMargin,
        borderRadius: 4
    },
    row: {
        paddingVertical: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin
    },
    rowLabel: {
        color: Colors.charcoal
    },
    textInput: {
        height: 40,
        color: Colors.coal
    },
    textInputReadonly: {
        height: 40,
        color: Colors.steel
    },
    loginRow: {
        paddingBottom: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin,
        flexDirection: 'row',
        flex: 1
    },
    loginButtonWrapper: {
        flex: 1
    },
    loginButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.charcoal,
        backgroundColor: Colors.panther,
        padding: 6
    },
    loginText: {
        textAlign: 'center',
        color: Colors.silver
    },
    topLogo: {
        alignSelf: 'center',
        resizeMode: 'contain',
        marginHorizontal: Metrics.doubleBaseMargin,
    },
    wrapperLogo: {
        paddingHorizontal: Metrics.doubleBaseMargin,
        backgroundColor: Colors.page,
    }
})
