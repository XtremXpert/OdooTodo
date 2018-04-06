import React, { Component } from 'react'

import {
    Body,
    Button,
    Container,
    Content,
    Fab,
    Icon,
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
    constructor(props) {
        super(props);
        this.state = {
            activeSegment: 'details',
            activeFab: false,
        };
    }

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
                    <Left style={styles.headerLeft}>
                        <MCIcon
                            name="menu"
                            color={Colors.btnText}
                            size={30}
                            style={styles.buttonIconStyle}
                            onPress={() => {
                                navigate('DrawerToggle')
                            }}/>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title>Projects</Title>
                    </Body>
                    <Right style={styles.headerRight}>
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
                <Fab
                  active={this.state.activeFab}
//                  active=false
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  // onLongPress={() =>  navigate('DrawerToggle')}
                  // onPress={() => this.setState({ active: !this.state.active })}>
                  onPress={() =>  navigate('DrawerToggle')} >
                  <Icon name="share" />
                  <Button style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="logo-whatsapp" />
                  </Button>
                  <Button style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                  </Button>
                  <Button disabled style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                  </Button>
                </Fab>
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
