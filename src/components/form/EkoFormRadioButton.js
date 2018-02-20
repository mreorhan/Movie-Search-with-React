import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ControlLabel} from 'react-bootstrap'

export default class EkoFormRadioButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: ''
        }
    }

    static propTypes = {
        buttons: PropTypes.array.isRequired,
        checked: PropTypes.string,
        errors: PropTypes.object,
        error: PropTypes.string,
        value: PropTypes.string,
        formData: PropTypes.object
    }

    static defaultProps = {
        value: '',
        checked: '',
        className: 'iradio_square-grey'
    }

    componentWillMount() {
        this.props.onMount(this.props.id)
        let checked = this.props.formData && this.props.formData[this.props.id] ? this.props.formData[this.props.id] : this.props.value
        this.setState({checked: checked})
    }

    onChange() {
        if (this.state.checked) {
            this.props.onFalse()
        }
        this.setState({checked: !this.state.checked}, function () {
            this.props.onChange(this.props.id, this.state.checked)
        })
    }

    selectButton(id, val) {
        this.props.formData.type = val
        this.setState(
            {
                checked: id
            },
            () => {
                this.props.onChange(this.props.id, this.state.checked)
            }
        )
    }

    renderButtons() {
        const checked = this.state.checked
        let className = this.props.className
        return this.props.buttons.map(button =>
            <label id={button.id} key={button.radio_id}
                   onClick={() => this.selectButton(button.radio_id, button.value)}>
                <div
                    className={(!checked && button.checked) || checked === button.radio_id ? className + ' checked' : className}/>
                {button.label}
            </label>
        )
    }

    render() {
        return (
            <div className="icheck-inline checkinline">
                {this.renderButtons()}
                <br/>
                {this.props.errors && this.props.errors[this.props.buttons[0].id]
                    ? <div className="form-group has-error">
                        <ControlLabel className="has-error">
                            {this.props.errors[this.props.buttons[0].id]}
                        </ControlLabel>
                    </div>
                    : false}
            </div>
        )
    }
}
