import React, {Component} from 'react'
import {Col, ControlLabel, FormGroup} from 'react-bootstrap'
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch'

export default class EkoFormSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            on: props.value
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({on: nextProps.value});
    }

    static propTypes = {
        value: PropTypes.bool,
        textOn: PropTypes.string,
        textOff: PropTypes.string
    }

    static defaultProps = {
        value: false,
        textOff: 'Kapalı',
        textOn: 'Açık'
    }

    handleSwitch(elem, state) {
        this.setState({on: state});
        this.props.onChange(state);
    }

    onSwitchChange() {
        this.setState({on: !this.state.on});
        this.props.onChange(!this.state.on);
    }

    render() {
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} md={5}>
                </Col>
                <Col md={6}>
                    <Switch bsSize={'small'} labelWidth={20} onText={this.props.textOn} offText={this.props.textOff}
                            value={this.state.on} onChange={(el, state) => this.handleSwitch(el, state)}/>
                    <a onClick={() => this.onSwitchChange()} className="sbold"
                       style={{marginLeft: '5px'}}>{this.props.label}</a>
                </Col>
            </FormGroup>
        )
    }
}
