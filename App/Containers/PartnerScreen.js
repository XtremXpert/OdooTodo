import React, { Component } from 'react'

import {
    Button,
    Container,
    Content,
    Segment,
    Text } from 'native-base';

import { View } from 'react-native'

import FloatingButton from '../Components/FloatingButton'

import HTML from 'react-native-render-html';
import TaskList from '../Components/TaskList'
import MessagesList from '../Components/MessagesList'
import PartnerForm from '../Components/PartnerForm'
import PartnerHeader from '../Components/PartnerHeader'
import TextField from '../Components/TextField'

import {
    Col,
    Row,
    Grid } from 'react-native-easy-grid';


import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PartnerScreenStyle'
import I18n from '../I18n';

class ContactScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.partnerName : 'Partner need a name!',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            activeFab: false,
            segment: 'contacts'
        };
    }


  render () {
    const { navigate } = this.props.navigation
    const { tasks, partner, messages } = this.props

    return (
        <Container>
            <PartnerHeader partner={partner} />
            <Segment>
                <Button
                    active={this.state.segment === 'contacts'}
                    onPress={() => this.setState({ segment: 'contacts' })}
                    first
                    >
                        <Text>{I18n.t('contacts')}</Text>
                </Button>
                <Button
                    active={this.state.segment === 'activity'}
                    onPress={() => this.setState({ segment: 'activity' })}
                    >
                        <Text>{I18n.t('activity')}</Text>
                </Button>
                <Button
                    active={this.state.segment === 'communication'}
                    onPress={() => this.setState({ segment: 'communication' })}
                    last
                    >
                    <Text>{I18n.t('communication')}</Text>
                </Button>
            </Segment>
            <Content style={{flexGrow:1}}>
                { this.state.segment === 'contacts' &&
                    <PartnerForm partner={partner} />
                }
                { this.state.segment === 'activity' &&
                    <TaskList
                        userTasks={tasks}
    //                    onTaskSelect={this.handleSelectTask}
                    />
                }
                { this.state.segment === 'communication' &&
                    <MessagesList messages={messages} />
                }

            </Content>
            <FloatingButton navigate={navigate} />
        </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
    const { projects, tasks, partners, messages } = state
    const { sessionId, user_id } = state.login
    const { partnerId } = props.navigation.state.params

    const partner = partners.list.find( item => item.id === partnerId )
    const children = partners.list.filter(
        item => item.parent_id[0] === partnerId )

    const partnerTasks = tasks.list.filter(
        item => item.partner_id[0] === partnerId )

    const partnerProjects = projects.list.filter(
        item => item.partner_id[0] === partnerId )

    const partnerMessages = messages.list.filter(
        item => item.model === 'res.partner' && item.res_id === partnerId )

    return {
        partner: partner,
        tasks: partnerTasks,
        children: children,
        messages: partnerMessages
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen)
