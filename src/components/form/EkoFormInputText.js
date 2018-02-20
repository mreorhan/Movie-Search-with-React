import React, {Component} from 'react'
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock, OverlayTrigger, Tooltip} from 'react-bootstrap'
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input'
import EkoMoneyText from '../EkoMoneyText'
import EkoPercentText from '../EkoPercentText'
import InputMask from 'react-input-mask'
import TooltipService from "../../../services/TooltipService";

export default class EkoFormInput extends Component {

    constructor(props){
        super(props);

        this.value = '';
        this.error = '';
    }

    componentWillMount() {
        this.props.onMount(this.props.id);
    }

    shouldComponentUpdate(nextProps){
        const value = nextProps.formData[nextProps.id] ? nextProps.formData[nextProps.id] : nextProps.value;
        const error = nextProps.errors[nextProps.id] ? nextProps.errors[nextProps.id] : nextProps.error;


        if (this.error !== error) {
            return true;
        }

        if (this.value !== value) {
            return true;
        }


        return false;
    }


    onChange(event) {
        if (!this.props.disabled) {
            switch (this.props.type) {
                case "number":
                    if (event) event = event.toString();
                    this.props.onChange(this.props.id, event); //event=value zaten
                    break;
                case "money":
                    this.props.onChange(this.props.id, event); //event=value zaten
                    break;
                case "percent":
                    this.props.onChange(this.props.id, event); //event=value zaten
                    break;
                default:
                    this.props.onChange(this.props.id, event.target.value);
            }
        }
    }


    renderInput() {

        const defaultValue = this.props.formData[this.props.id] ? this.props.formData[this.props.id]: this.props.value;
        this.value = defaultValue;

        let className = "form-control";
        if (this.props.className)
            className = this.props.className
        switch (this.props.type) {
            case "number":
                return <NumericInput disabled={this.props.disabled} className={className} value={defaultValue}
                                     precision={this.props.precision || 0}
                                     style={false}
                                     placeholder={this.props.placeHolder}
                                     maxLength={this.props.maxLength || 20} onChange={this.onChange.bind(this)}/>
            case "textarea":
                if (this.props.rows)
                    return <FormControl readOnly={this.props.readOnly} className={className}
                                        disabled={this.props.disabled} rows={this.props.rows} componentClass="textarea"
                                        value={defaultValue} onChange={this.onChange.bind(this)}
                                        placeholder={this.props.placeHolder}/>
                else return <FormControl readOnly={this.props.readOnly} className={className}
                                         disabled={this.props.disabled} componentClass="textarea" value={defaultValue}
                                         onChange={this.onChange.bind(this)} placeholder={this.props.placeHolder}/>
            case "money":
                return <EkoMoneyText value={defaultValue} justInput={this.props.justInput}
                                     precision={this.props.precision} thisClass={className}
                                     placeholder={this.props.placeHolder}
                                     disabled={this.props.disabled} onChange={this.onChange.bind(this)}/>
            case "percent":
                return <EkoPercentText value={defaultValue} justInput={this.props.justInput}
                                       placeholder={this.props.placeHolder}
                                       thisClass={className}
                                       disabled={this.props.disabled} onChange={this.onChange.bind(this)}/>
            case "mask":
                return <InputMask className={className} maskChar={this.props.maskChar} mask={this.props.mask}
                                  value={defaultValue} disabled={this.props.disabled}
                                  placeholder={this.props.placeHolder}
                                  onChange={this.onChange.bind(this)}/>
            default:
                return <FormControl className={className} style={this.props.style} disabled={this.props.disabled}
                                    placeholder={this.props.placeHolder} value={defaultValue} type={this.props.type}
                                    onChange={this.onChange.bind(this)}/>
        }
    }

    renderInputNew() {
        const errorValue = this.props.errors[this.props.id] ? this.props.errors[this.props.id]  : this.props.error;
        const error = errorValue ? <ControlLabel>{errorValue}</ControlLabel> : false;

        this.error = errorValue;

        let validationState = null;
        let tooltip = ''


        if (error) {
            validationState = "error";
            tooltip = (
                <Tooltip style={{zIndex: 99999999}} id="tooltip">{this.props.errors[this.props.id][0]}</Tooltip>
            );

        }
        const help = this.props.help ? <HelpBlock>{this.props.help}</HelpBlock> : ''


        let classNameForTooltip = ''

        if ((this.props.tooltip && error) || this.props.iconClass)
            classNameForTooltip = 'input-icon right'

        if (this.props.justInput) {
            return this.renderInput()
        }
        let tooltipId = this.props.tooltipId ? this.props.tooltipId : this.props.id;
        const label = TooltipService.getLabelWithTooltip(tooltipId, this.props.label);
        return (
            !this.props.isVertical ?
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {
                        this.props.label && <Col componentClass={ControlLabel} md={this.props.labelMd}>
                            {label}&nbsp; {this.props.required ? <span className="required"> * </span> : ''}
                        </Col>
                    }
                    <Col md={this.props.colMd}>
                        <div className={classNameForTooltip}>
                            {error && this.props.tooltip ? <OverlayTrigger placement="left" overlay={tooltip}>
                                <i className="fa fa-warning tooltips"/>
                            </OverlayTrigger> : ''}
                            {this.renderInput()}
                            {(this.props.childrenShow) ? this.props.children : ""}
                            {error && !this.props.tooltip ? error : help}
                        </div>
                    </Col>
                    {(this.props.childrenShow) ? "" : this.props.children}
                </FormGroup>
                :
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {this.props.label && <Col componentClass={ControlLabel} className="control-line">
                        {label}&nbsp;  {this.props.required ? <span className="required"> * </span> : ''}
                    </Col>}
                    <div className={classNameForTooltip}>
                        {error && this.props.tooltip ? <OverlayTrigger placement="left" overlay={tooltip}>
                            <i className="fa fa-warning tooltips"></i>
                        </OverlayTrigger> : ''}
                        {this.props.iconClass ? <i className={this.props.iconClass}></i> : ''}
                        {this.renderInput()}
                        {error && !this.props.tooltip ? error : help}
                    </div>

                </FormGroup>

        )
    }

    render() {

        return this.renderInputNew();
    }
}

EkoFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    readOnly: PropTypes.bool,
    tooltipId: PropTypes.string
};

EkoFormInput.defaultProps = {
    value: '',
    style: {},
    error: '',
    errors: {},
    formData: {},
    type: '',
    placeHolder: '',
    labelMd: 5,
    colMd: 6,
    disabled: false,
}