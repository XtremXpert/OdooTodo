import React, { Component } from 'react'

import {
    Body,
    Button,
    Container,
    Content,
    Left,
    List,
    ListItem,
    Segment,
    Text,
    Thumbnail,
    Title } from 'native-base';

import FloatingButton from '../Components/FloatingButton'

import PartnersActions from '../Redux/PartnersRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PartnersListScreenStyle'
import { Colors } from '../Themes/'

import I18n from '../I18n';

class PartnersListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Partner List',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            // activeSegment: 'details',
            activeFab: false,
            filterSegment: 'companies',
            relationSegment: 'customer',
            partnersSelected: props.partners
        };
    }

    _onPressItem = (item) => {
        this.props.navigation.navigate(
            'PartnerScreen',
            {
                partnerName: item.name,
                partnerId: item.id
            }
        )
    };

    render () {
        const { partnersSelected,
                relationSegment,
                filterSegment } = this.state
        const { partners } = this.props
        const { navigate } = this.props.navigation
        let prefilteredList
        let filteredList

        switch (relationSegment) {
            case "employee":
                filteredList = partners.filter(
                    partner => partner.employee)
                break;
            case "supplier":
                filteredList = partners.filter(
                    partner => partner.supplier)
                break;
            case "customer":
                filteredList = partners.filter(
                    partner => partner.customer)
                break;
            default:
        }

        if (filterSegment === 'companies') {
            filteredList = filteredList.filter(
                    partner => partner.is_company)
        } else if (filterSegment === 'persons') {
            filteredList = filteredList.filter(
                    partner => !partner.is_company)
        }

        return (
            <Container>
                <Segment>
                    <Button
                        first
                        active={filterSegment === 'companies'}
                        onPress={() => this.setState(
                            { filterSegment: 'companies' }
                        )}>
                        <Text>{I18n.t('companies')}</Text>
                    </Button>
                    <Button
                        active={filterSegment === 'persons'}
                        onPress={() => this.setState(
                            { filterSegment: 'persons' }
                        )}>
                        <Text>{I18n.t('persons')}</Text>
                    </Button>
                    <Button
                        last
                        active={filterSegment === 'all'}
                        onPress={() => this.setState(
                            { filterSegment: 'all' }
                        )}>
                        <Text>{I18n.t('all')}</Text>
                    </Button>
                </Segment>
                <Segment>
                    <Button
                        first
                        active={relationSegment === 'customer'}
                        onPress={() => this.setState(
                            { relationSegment: 'customer' }
                        )} >
                        <Text>{I18n.t('customer')}</Text>
                    </Button>
                    <Button
                        active={relationSegment === 'supplier'}
                        onPress={() => this.setState(
                            { relationSegment: 'supplier' }
                        )} >
                        <Text>{I18n.t('supplier')}</Text>
                    </Button>
                    {/* <Button
                        last
                        active={relationSegment === 'employee'}
                        onPress={() => this.setState(
                        { relationSegment: 'employee' }
                    )}>
                    <Text>{I18n.t('employee')}</Text>
                </Button> */}
            </Segment>
                <Content>
                    <List dataArray={filteredList}
                        renderRow={(item) =>
                        <ListItem onPress={() => this._onPressItem(item)} >
                            <Left>
                            <Thumbnail
                                şmall
                                source={{uri: `data:image/png;base64,
                                    ${item.image_small}`}}
                            />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                {item.commercial_partner_id[0] != item.id &&
                                    <Text>{item.commercial_partner_id[1]}</Text>
                                }
                            </Body>
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
    const partners = state.partners.list.filter(
        item => item.type === 'contact' )

    return {
        partners: partners,
        fetching: state.partners.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersListScreen)
