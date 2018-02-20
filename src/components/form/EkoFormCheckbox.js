import React, {Component} from 'react'
import {ControlLabel} from 'react-bootstrap'
import PropTypes from 'prop-types'
import TooltipService from "../../../services/TooltipService";

export default class EkoFormCheckbox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }
    }


    componentWillMount() {
        this.props.onMount(this.props.id)
        let checked = this.props.formData && this.props.formData[this.props.id] ? this.props.formData[this.props.id] : (this.props.value ? this.props.value : false)

        this.setState({checked: checked})
    }

    onChange() {

        const defaultValue = this.props.formData && this.props.formData[this.props.id] ? this.props.formData[this.props.id] : (this.props.value ? this.props.value : false)
        if (defaultValue) {
            this.props.onFalse()
        }


        this.setState({checked: !defaultValue}, function () {
            this.props.onChange(this.props.id, this.state.checked)
        })
    }

    renderCheckbox(tooltipId) {
        const defaultValue = this.props.formData && this.props.formData[this.props.id] ? this.props.formData[this.props.id] : (this.props.value ? this.props.value : false)
        return <input  id={tooltipId} checked={defaultValue} onChange={this.onChange.bind(this)} type="checkbox"/>
    }
    render() {

        let tooltipId = this.props.tooltipId ? this.props.tooltipId : this.props.id;
        const label = TooltipService.getLabelWithTooltipCheckbox(tooltipId, this.props.label);

        return (
            <div >

                <label htmlFor={tooltipId} className={this.props.className}>
                    {this.renderCheckbox(tooltipId)} {label}
                    <span/>
                </label>
                <br/>
                {this.props.errors && this.props.errors[this.props.id]
                    ? <div className="form-group has-error">
                        <ControlLabel className="has-error">
                            {this.props.errors[this.props.id]}
                        </ControlLabel>
                    </div>
                    : false}
            </div>
        )
    }
}


EkoFormCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    errors: PropTypes.object,
    error: PropTypes.string,
    value: PropTypes.string,
    formData: PropTypes.object
};

EkoFormCheckbox.defaultProps = {
    value: '',
    checked: false,
    className: 'mt-checkbox'
};
