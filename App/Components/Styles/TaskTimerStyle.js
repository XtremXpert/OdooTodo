import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,

    buttonStyleStart: {
        margin: 10,
        height: 80,
        marginHorizontal: 80,
        backgroundColor: 'green',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },

    buttonStyleStop: {
        margin: 10,
        height: 80,
        marginHorizontal: 80,
        backgroundColor: 'red',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },

    buttonStopTextStyle: {
        fontSize: 37,
        color: 'white'
    },
});
