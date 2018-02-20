import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Util from '../../../util/Util'
import enhanceWithClickOutside from 'react-click-outside'
import {Col, ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap'

class EkoFormAutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            value: props.value || '',
            selectedItem: '',
            defaultText: ''
        }
    };

    static propTypes = {
        optionValue: PropTypes.string,
        value: PropTypes.string,
        formData: PropTypes.object,
        id: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        dropdownStyle: PropTypes.object
        //  onSelectAutoComplete: PropTypes.function
    };

    static defaultProps = {
        options: [],
        optionValue: 'name',
        value: '',
        type: '',
        labelMd: 5,
        colMd: 6,
        disabled: false,
    }

    componentWillMount() {
        this.props.onMount(this.props.id);
    }

    openList() {
        this.setState({open: true})
    }

    handleClickOutside() {
        this.setState({open: false})
    }

    closeList() {
        this.setState({open: false})
    }

    selectItem(item) {
        this.setState({selectedItem: item, open: !this.state.open, value: item[this.props.optionValue]})
        //  this.props.onSelectAutoComplete(item[this.props.optionValue],this.props.name)
        this.props.onSelect(this.props.id, item[this.props.optionValue]);
    }

    onChange(e) {
        this.setState({open: true, value: e.target.value})
        this.props.onChange(this.props.id, e.target.value);
    }

    renderInput() {
        let options = this.props.options
        let dropdownClassName = 'dropdown-list '
        if (this.state.open) {
            dropdownClassName += 'openBlock'
        } else {
            dropdownClassName += 'closeBlock'
        }
        const selectedItem = this.state.selectedItem
        const defaultText = this.state.defaultText
        // this.props.formData[this.props.optionValue]
        const value = this.props.formData[this.props.optionValue]
        options = options.filter(option => option[this.props.optionValue] && option[this.props.optionValue].includes(value))

        return (
            <div className={this.props.className || ''}>
                <input type="text"
                       className="form-control"
                       onChange={this.onChange.bind(this)}
                       value={value ? value : defaultText}
                />

                {
                    !Util.isEmpty(options) ?
                        <div className={dropdownClassName} style={this.props.dropdownStyle}>
                            <ul>
                                {
                                    options.map(e => {
                                        return <li
                                            key={e[this.props.optionValue]}
                                            onClick={this.selectItem.bind(this, e)}
                                            className={selectedItem && selectedItem[this.props.optionValue] === e[this.props.optionValue] ? 'selectedItemColor' : ''}
                                        >
                                            {e[this.props.optionValue]}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        : ''
                }

            </div>
        )
    }

    render() {
        const key = this.props.alias_id || this.props.id;

        const error = (this.props.errors && this.props.errors[key] ) ?
            <ControlLabel>{this.props.errors[key]}</ControlLabel> : false
        let validationState = null;
        if (error) {
            validationState = "error";
        }
        const help = this.props.help ? <HelpBlock>{this.props.help}</HelpBlock> : ''

        return (
            !this.props.isVertical ?
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {this.props.label && <Col componentClass={ControlLabel} md={this.props.labelMd}>
                        {this.props.label}&nbsp; {this.props.required ? <span className="required"> * </span> : ''}
                    </Col>}
                    <Col md={this.props.colMd}>
                        {this.renderInput()}
                        {error ? error : help}
                    </Col>
                    {this.props.children}
                </FormGroup> :
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {this.props.label &&
                    <Col componentClass={ControlLabel} md={this.props.labelMd || '5'} className="control-line">
                        {this.props.label}&nbsp; {this.props.required ? <span className="required"> * </span> : ''}
                    </Col>}
                    {this.renderInput()}
                    {error ? error : help}

                </FormGroup>
        )
    }
}

export default enhanceWithClickOutside(EkoFormAutoComplete)
