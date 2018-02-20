import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Dropdown, MenuItem} from 'react-bootstrap'

export default class EkoFormButtonGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        isLoading: PropTypes.bool,
        faClass: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        faClass: "",
        spinner: false,
        className: "btn btn-default blue",
        isLoading: false
    };


    render() {
        let labelText = this.props.label;
        let labelClass = ''
        if (this.props.faClass)
            labelClass = <i className={this.props.faClass}>&nbsp;</i>;

        const menuItemView = this.props.buttons.map((menuItem, index) =>
            <MenuItem eventKey={menuItem.id} key={index}
                      onSelect={menuItem.onClick}>{menuItem.labelText}</MenuItem>
        );
        return <div className="btn-group">

            <button disabled={this.props.isLoading} style={{marginRight: "0"}} className={this.props.className}
                    onClick={this.props.onClick}>
                {this.props.isLoading ?
                    <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                    :
                    <span>{labelClass} {labelText}</span>
                }
            </button>


            <Dropdown disabled={this.props.isLoading} id="dropdown-custom-1">
                <Dropdown.Toggle title="" noCaret className="btn blue dropdown-toggle mt-ladda-button ladda-button"><i
                    className="fa fa-angle-down"></i></Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-align dropdown-menu">  {menuItemView}</Dropdown.Menu>

            </Dropdown>
        </div>;
    }
}

EkoFormButtonGroup.propTypes = {
    label: PropTypes.string.isRequired,
    labelClass: PropTypes.string,
    isLoading: PropTypes.bool
};