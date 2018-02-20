import React, {Component} from 'react'
import {Col, ControlLabel, FormGroup, HelpBlock, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PropTypes from 'prop-types';
import moment from 'moment'

import EkoDatePicker from "../EkoDatePicker";
import TooltipService from "../../../services/TooltipService";

export default class EkoFormInputText extends Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        required: PropTypes.bool,
        errors: PropTypes.object,
        error: PropTypes.string,
        value: PropTypes.string,
        formData: PropTypes.object
    };

    static defaultProps = {
        value: '',
        type: '',
        labelMd: 5,
        colMd: 6,
        disabled: false,
    }

    componentWillMount() {
        this.props.onMount(this.props.id);
    }

    onDateChange(dateField, value, formattedValue) {
        let date = formattedValue ? moment(formattedValue, "DD-MM-YYYY").format("YYYY-MM-DD") : '';

        this.props.onChange(dateField, date);

    }


    renderInput() {
        const error = (this.props.errors && this.props.errors[this.props.id] ) ?
            <ControlLabel>{this.props.errors[this.props.id]}</ControlLabel> : false
        let tooltip = '';
        if(error){
            tooltip = (
                <Tooltip style={{zIndex: 99999999}} id="tooltip">{this.props.errors[this.props.id][0]}</Tooltip>
            );
        }
        const defaultValue = (this.props.formData && this.props.formData[this.props.id]) ?
            this.props.formData[this.props.id] : this.props.value
        return <div className="input-icon right">
            {error && this.props.tooltip ? <OverlayTrigger placement="left" overlay={tooltip}>
                <i style={{right: "35px"}} className="fa fa-warning tooltips"/>
            </OverlayTrigger> : ''}
            <EkoDatePicker onChange={this.onDateChange.bind(this)}
                           name={this.props.id}
                           disabled={this.props.disabled}
                           dateFormat="DD-MM-YYYY"
                           className="form-control form-control-inline date-picker"
                           value={defaultValue}
                           showClearButton={this.props.clearable}

            />
            {!this.props.clearable && <div className="form-control-focus"/>}
            {!this.props.clearable ? <i style={{zIndex: "999"}} className="icon-calendar"/> : null}
        </div>

    }

    render() {
        const error = (this.props.errors && this.props.errors[this.props.id] ) ?
            <ControlLabel>{this.props.errors[this.props.id]}</ControlLabel> : false
        let validationState = null;
        if (error) {
            validationState = "error";
        }
        const help = this.props.help ? <HelpBlock>{this.props.help}</HelpBlock> : ''
        return (
            !this.props.isVertical ?
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    <Col componentClass={ControlLabel} md={this.props.labelMd}>
                        {TooltipService.getLabelWithTooltip(this.props.id, this.props.label)}&nbsp; {this.props.required ?
                        <span className="required"> * </span> : ''}
                    </Col>
                    <Col md={this.props.colMd}>
                        {this.renderInput()}
                        {error ? error : help}
                    </Col>
                </FormGroup> :

                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {
                        this.props.label && <Col componentClass={ControlLabel} className="control-line">
                            {TooltipService.getLabelWithTooltip(this.props.id, this.props.label)}&nbsp; {this.props.required ?
                            <span className="required"> * </span> : ''}
                        </Col>
                    }
                    {this.renderInput()}
                    {error && !this.props.tooltip ? error : help}
                </FormGroup>
        )
    }
}
