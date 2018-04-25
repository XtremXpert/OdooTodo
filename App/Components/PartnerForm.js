import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Image } from 'react-native'
import TextField from '../Components/TextField'
import styles from './Styles/PartnerFormStyle'
import HTML from 'react-native-render-html';

import {
    Col,
    Row,
    Grid } from 'react-native-easy-grid';

import I18n from '../I18n';

export default class PartnerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // activeSegment: 'details',
            activeFab: false,
            filterSegment: 'companies',
            relationSegment: 'customer',
            partner: props.partner
        };
    }


        // Prop type warnings
    static propTypes = {
        partner: PropTypes.object,
    }

    render () {
        const { partner } = this.props

        return (
            <Grid style={{marginHorizontal : 10}}>
                <Row style={{flex: 0}}>
                    <Col>
                        <TextField
                            value={partner.function || ' '}
                            label={I18n.t('function')}
                        />
                    </Col>
                    <Col>
                        <TextField
                            value={partner.mobile || ' '}
                            label={I18n.t('mobile')}
                        />
                    </Col>
                </Row>
                <Row style={{flex: 1}}>
                    <Col>
                        <TextField
                            value={partner.comment || ' '}
                            label={I18n.t('comment')}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}
