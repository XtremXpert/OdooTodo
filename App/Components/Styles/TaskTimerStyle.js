import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,

    buttonStyleStart: {
        backgroundColor: 'green',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },

    buttonStyleStop: {
        backgroundColor: 'red',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },

    buttonStopTextStyle: {
        color: 'white',
        paddingLeft: 40,
        paddingRight: 40,
    },
});
