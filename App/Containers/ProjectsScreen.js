import React, { Component } from 'react'

import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title } from 'native-base';

import { connect } from 'react-redux'

import ProjectsActions, { getSortedProject } from '../Redux/ProjectsRedux'

// Styles
import styles from './Styles/ProjectsScreenStyle'
import { Colors } from '../Themes/'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import I18n from '../I18n';

class ProjectsScreen extends Component {
    _onPressBack = () => {
         this.props.navigation.navigate('Home');
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        this.props.setSelectedProject(item.id)
        this.props.navigation.setParams({ projectName: item.name })
        this.props.navigation.navigate('Project')
    };

    render () {
        const { projects } = this.props
        const { navigate } = this.props.navigation

        return (
            <Container>

                <Header>
                    <Left>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body>
                        <Title>Projects</Title>
                    </Body>
                    <Right>
                        <EntypoIcon
                            name="add-to-list"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                        />
                    </Right>
                </Header>

                <Content>
                    <List dataArray={projects}
                        renderRow={(item) =>
                          <ListItem onPress={() => this._onPressItem(item)} >
                              <Text>{item.name}</Text>
                          </ListItem>

                      }>
                    </List>
                </Content>

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
        setSelectedProject: (data) => dispatch(ProjectsActions.setSelectedProject(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
