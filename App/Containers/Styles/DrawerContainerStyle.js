import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    buttonRow: {
        paddingBottom: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin,
        flexDirection: 'row',
        flex: 1
    },
    buttonSmall: {
        marginHorizontal: Metrics.smallMargin,
        marginVertical: Metrics.smallMargin,
    },
    buttonBig: {
        backgroundColor: Colors.secondary,
        marginHorizontal: Metrics.doubleBaseMargin,
        marginVertical: Metrics.smallMargin,
    },
    drawerContainer: {
        paddingTop: 120,
        backgroundColor: Colors.cloud
    }

})
