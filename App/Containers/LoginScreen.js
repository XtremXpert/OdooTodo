import React, { PropTypes } from 'react'

import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    LayoutAnimation
} from 'react-native'

import Button from 'react-native-smart-button'

import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

import styles from './Styles/LoginScreenStyles'
import {Images, Metrics, Colors } from '../Themes'

import I18n from '../I18n';

class LoginScreen extends React.Component {
    // static propTypes = {
    //   dispatch: PropTypes.func,
    //   fetching: PropTypes.bool,
    //   attemptLogin: PropTypes.func
    // }

    isAttempting = false
    keyboardDidShowListener = {}
    keyboardDidHideListener = {}

    constructor (props) {
        super(props)
        this.state = {
            username: props.username,
            password: props.password,
            visibleHeight: Metrics.screenHeight,
            topLogo: {width: Metrics.screenWidth -  Metrics.doubleBaseMargin}
        }
        this.isAttempting = false
    }

    componentWillReceiveProps (newProps) {
        this.forceUpdate()
        // Did the login attempt complete?
        if (this.isAttempting && !newProps.fetching) {
            this.props.navigation.goBack()
        }
    }

    componentWillMount () {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    keyboardDidShow = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        let newSize = Metrics.screenHeight - e.endCoordinates.height
        this.setState({
            visibleHeight: newSize,
            topLogo: {width: 100, height: 70}
        })
    }

    keyboardDidHide = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            visibleHeight: Metrics.screenHeight,
            topLogo: {width: Metrics.screenWidth -  Metrics.doubleBaseMargin}
        })
    }

    handlePressLogin = () => {
        const { username, password } = this.state
        this.isAttempting = true
        // attempt a login - a saga is listening to pick it up from here.
        this.props.attemptLogin(username, password)
    }

    handleChangeUsername = (text) => {
        this.setState({ username: text })
    }

    handleChangePassword = (text) => {
        this.setState({ password: text })
    }

    render () {
        const { username, password } = this.state
        const { fetching } = this.props
        const editable = !fetching
        const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
        return (
            <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.containerPage, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
                <View style={styles.wrapperLogo}>
                    <Image source={Images.logo} style={[styles.topLogo, this.state.topLogo]} />
                </View>
                <View style={styles.form}>
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>{I18n.t('username')}</Text>
                        <TextInput
                            ref='username'
                            style={textInputStyle}
                            value={username}
                            editable={editable}
                            keyboardType='default'
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.handleChangeUsername}
                            underlineColorAndroid='transparent'
                            onSubmitEditing={() => this.refs.password.focus()}
                            placeholder={I18n.t('username')} />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>{I18n.t('password')}</Text>
                        <TextInput
                            ref='password'
                            style={textInputStyle}
                            value={password}
                            editable={editable}
                            keyboardType='default'
                            returnKeyType='go'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={this.handleChangePassword}
                            underlineColorAndroid='transparent'
                            onSubmitEditing={this.handlePressLogin}
                            placeholder={I18n.t('password')} />
                    </View>
                    <View style={styles.buttonRow}>
                        <View style={styles.container}>

                            <Button
                                onPress={this.handlePressLogin}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                            >
                                {I18n.t('signIn')}
                            </Button>
                        </View>
                        <View style={styles.container}>
                            <Button
                                onPress={() => this.props.navigation.goBack()}
                                style={styles.buttonStyle}
                                textStyle={styles.buttonTextStyle}
                            >
                                {I18n.t('cancel')}
                            </Button>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    console.tron.log(state)
    const { username, password } = state.login

    return {
        fetching: state.login.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
