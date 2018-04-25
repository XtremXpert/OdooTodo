import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    grid: {
        marginHorizontal: 10,
        paddingTop: 10,
    },
    row : {
        height: 60,
    }
})
