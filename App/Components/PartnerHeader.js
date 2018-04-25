import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Image, View } from 'react-native'

import {
    Text,
    Thumbnail } from 'native-base';

import {
    Col,
    Row,
    Grid } from 'react-native-easy-grid';

import TextField from '../Components/TextField'

import styles from './Styles/PartnerHeaderStyle'

import I18n from '../I18n';

export default class PartnerHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // activeSegment: 'details',
            activeFab: false,
            segment: 'details',
            partner: props.partner
        };
    }

    static propTypes = {
        partner: PropTypes.object,
    }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

    render () {
        const { partner } = this.props

        let address = partner.street || ''

        if (partner.street2) {
            address += '\n' + partner.street2
        }

        if (partner.city) {
            address += '\n' + partner.city
        }

        if (partner.state_id[1]) {
            if (partner.city) {
                address += ', ' + partner.state_id[1]
            } else {
                address += '\n' + partner.state_id[1]
            }
        }

        if (partner.country_id[1]) {
            if (partner.city || partner.state_id[1]) {
                address += ', ' + partner.country_id[1]
            } else {
                address += '\n' + partner.country_id[1]
            }
        }

        if (partner.zip) {
            address += '\n' + partner.zip
        }

        if (partner.phone) {
            address += '\n' + partner.phone
        }


    return (
      <Grid style={{flex:0}}>
          <Row style={{flex:0}}>
              <Col size={1}>
                  <Image
                      style={{width: 80, height: 80}}
                      source={{uri: `data:image/png;base64,
                          ${partner.image_small}`}}
                  />
              </Col>
              <Col size={3}>
                  <Text>{address}</Text>
              </Col>
          </Row>

      </Grid>

    )
    }
}
