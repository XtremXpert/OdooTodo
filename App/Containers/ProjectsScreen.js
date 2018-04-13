import React, { Component } from 'react'

import {
    Container,
    Content,
    List,
    ListItem,
    Text } from 'native-base';

import FloatingButton from '../Components/FloatingButton'

import ProjectsActions from '../Redux/ProjectsRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/ProjectsScreenStyle'
import { Colors } from '../Themes/'

import I18n from '../I18n';

class ProjectsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Project List',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSegment: 'details',
            activeFab: false,
        };
    }

    _onPressItem = (item) => {
        this.props.navigation.navigate(
            'ProjectScreen',
            {
                projectName: item.name,
                projectId: item.id
            }
        )
    };

    render () {
        const { projects } = this.props
        const { navigate } = this.props.navigation

        return (
            <Container>
                <Content>
                    <List dataArray={projects}
                        renderRow={(item) =>
                          <ListItem onPress={() => this._onPressItem(item)} >
                              <Text>{item.name}</Text>
                          </ListItem>
                      }>
                    </List>
                </Content>
                <FloatingButton navigate={navigate} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const projectList = state.projects.list
    // projectList.sort((a, b) => {
    //     const aId = a.get('id');
    //     const bId = b.get('id');
    //     if (aId < bId) { return -1; }
    //     if (aId > bId) { return 1; }
    //     if (aId === bId) { return 0; }
    // })

    return {
      userId: state.login.userId,
      sessionId: state.login.sessionId,
      projects: state.projects.list,
      fetching: state.projects.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
