import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EkoFormButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    // "0" === 0 false

    static propTypes = {
        label: PropTypes.string.isRequired,
        isLoading: PropTypes.bool,
        disabled: PropTypes.bool,
        faClass: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        faClass: "",
        spinner: false,
        className: "btn btn-default blue",
        isLoading: false,
        disabled: false
    };


    render() {
        let labelText = this.props.label;
        let labelClass = '';

        if (this.props.faClass)
            labelClass = <i className={this.props.faClass}>&nbsp;</i>

        return (
            <button disabled={this.props.disabled || this.props.isLoading} style={{marginRight: "5px"}}
                    className={this.props.className} onClick={this.props.onClick}>
                {this.props.isLoading ?
                    <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                    :
                    <span>{labelClass} {labelText}</span>
                }
            </button>
        );
    }

}
