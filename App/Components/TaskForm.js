import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Body,
    Button,
    Card,
    Container,
    Content,
    Footer,
    FooterTab,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Segment,
    Text,
    Title } from 'native-base';

import styles from './Styles/TaskFormStyle'
import HTML from 'react-native-render-html';

import {
    Col,
    Row,
    Grid } from 'react-native-easy-grid';

import TaskTimer from '../Components/TaskTimer'
import TaskList from '../Components/TaskList'
import TimesheetList from '../Components/TimesheetList'
import I18n from '../I18n';

export default class TaskForm extends Component {
    // Prop type warnings
    static propTypes = {
        task: PropTypes.object,
    }

    render () {
        task = this.props.task
        return (
            <Grid style={{marginHorizontal : 10}}>
                <Row style={{flex: 0}}>
                    <Col>
                        <HTML
                            html={task.description}
                            style={{flex: 1}}
                        />
                    </Col>
                </Row>

                <Row style={{flex: 0}}>
                    <Col>
                        <Item stackedLabel>
                            <Label>{I18n.t('stage')}</Label>
                            <Input
                                disabled
                                value={task.stage_id[1]}
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>{I18n.t('deadline')}</Label>
                            <Input
                                disabled
                                value={task.date_deadline}
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>
                                {I18n.t('hours')}
                            </Label>
                            <Input
                                disabled
                                value={task.effective_hours.toString() + "/" + task.planned_hours.toString()}
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>{I18n.t('lastupdate')}</Label>
                            <Input
                                disabled
                                value={task.write_date}
                            />
                        </Item>
                    </Col>
                </Row>

                <Row style={{flex: 0}}>
                    <Col>
                        <Item stackedLabel>
                            <Label>
                                {I18n.t('project')}
                            </Label>
                            <Input
                                disabled
                                value={task.project_id[1]}
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>{I18n.t('customer')}</Label>
                            <Input
                                disabled
                                value={task.partner_id[1]}
                            />
                        </Item>
                    </Col>
                </Row>
                <Row style={{flex: 0}}>
                    <Col>
                        <Item stackedLabel>
                            <Label>
                                {I18n.t('assign to')}
                            </Label>
                            <Input
                                disabled
                                value={task.user_id[1]}
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>
                                {I18n.t('manager')}
                            </Label>
                            <Input
                                disabled
                                value={task.manager_id[1]}
                            />
                        </Item>
                    </Col>
                </Row>

                <Row style={{flex: 0}}>
                    <Col>
                        <Item stackedLabel>
                            <Label>
                                {I18n.t('notes')}
                            </Label>
                            <Input
                                disabled
                                value={task.notes || ''}
                            />
                        </Item>
                    </Col>
                </Row>

            </Grid>

        )
    }
}
