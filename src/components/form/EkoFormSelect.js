import React, {Component} from 'react'
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside'
import {Col, ControlLabel, FormGroup, HelpBlock, OverlayTrigger, Tooltip} from 'react-bootstrap'
import TooltipService from "../../../services/TooltipService";


class EkoFormSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedItem: '',
            searchedValue: ''
        }
    };

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        formData: PropTypes.object,
        id: PropTypes.string.isRequired,
        optionId: PropTypes.string,
        optionValue: PropTypes.string,
        searchFilter: PropTypes.string,
        options: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        clearable: PropTypes.bool,
        searchable: PropTypes.bool,
        onAddNewItemClick: PropTypes.func,
        readOnly: PropTypes.bool,
        tooltipId: PropTypes.string,
        width: PropTypes.string
    };

    static defaultProps = {
        options: [],
        optionId: 'id',
        optionValue: 'name',
        disabled: false,
        defaultText: 'BİRİNİ SEÇİNİZ',
        clearable: false,
        searchable: false,
        labelMd: 5,
        colMd: 6,
    }

    componentWillMount() {
        this.props.onMount(this.props.id);

        this.listenKeyPress();
    }

    componentWillUnmount(){
        this.removeListener();
    }


    handleClickOutside() {
        this.setState({open: false});
    }

    openCloseList() {
        if (!this.props.disabled && !this.props.readOnly) {
            this.setState({open: !this.state.open}, () => {
                if (this.props.searchable && this.state.open) {
                    this.searchInput.focus();
                }
            })
        }
    }

    selectItem(item, hide = true) {

        if (hide !== false) {
            this.setState({open: !this.state.open})
        }

        this.props.onChange(this.props.id, item[this.props.optionId]);
    }

    onClickClear() {
        if (!this.props.readOnly) {
            this.props.onChange(this.props.id, this.props.value);
        }
    }

    onSearchableChange(e) {
        this.setState({searchedValue: e.target.value})
    }

    turkishToUpper(value) {
        if (!(value instanceof String)) {
            value = value.toString();
        }

        const letters = {"i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I"};
        return value.replace(/[#iışğüçö]/g, (letter) => letters[letter]).toUpperCase();
    }

    onAddNewItemClick() {
        this.props.onAddNewItemClick()
        this.openCloseList()
    }

    /**
     * şu anda seçili olan itemi bulur
     *
     * @return  itemi bulur ve getirir
     */
    findSelectedItem = () => {
      const value = ((this.props.formData && this.props.formData[this.props.id]) || this.props.formData[this.props.id] === 0) ?
          this.props.formData[this.props.id] : this.props.value;

      return this.props.options.map((option, index) => {

          if (option[this.props.optionId] === value) {
              return index;
          }

          return undefined;

      }).filter((item) => {
          return item !== undefined;
      });
    }


    /**
     * i
     * @param mixed up
     * @return void
     */
    handleUpDown = (up) => {
        let selectedItem = this.findSelectedItem();

        if (selectedItem.length > 0) {
            selectedItem = selectedItem[0];
        } else {
            selectedItem = -1;
        }

        let nextItem = 0;
        if (up === 'up') {
            if (selectedItem < this.props.options.length - 1) {
                nextItem = selectedItem + 1;

                this.selectItem(this.props.options[nextItem], false);
            }
        } else {

            if (selectedItem >= 1) {
                nextItem = selectedItem - 1;

                this.selectItem(this.props.options[nextItem], false);
            }
        }
    }

    /**
     * @param e
     *
     * yukarı ve aşağıya tıklamayı algılar
     *
     */
    handler = (e) =>  {

        if (this.state.open === false) {
            return true;
        }

        if (e.keyCode === 38) {
            this.handleUpDown('down');
            e.preventDefault();

        } else if (e.keyCode === 40) {
            this.handleUpDown('up');

            e.preventDefault();
        }else if (e.keyCode === 13){
            this.setState({open: !this.state.open})

            e.preventDefault();
        }
    }



    listenKeyPress = () => {
        window.addEventListener('keydown', this.handler);
    }

    removeListener = () => {
        window.removeEventListener('keydown', this.handler);
    }


    renderInput() {
        let options = this.props.options
        const self = this;
        let dropdownClassName = 'dropdown-list '
        if (this.state.open) {
            dropdownClassName += 'openBlock'
        } else {
            dropdownClassName += 'closeBlock'
        }
        const defaultText = this.props.defaultText
        const clearable = this.props.clearable
        const searchable = this.props.searchable
        const value = ((this.props.formData && this.props.formData[this.props.id]) || this.props.formData[this.props.id] === 0) ?
            this.props.formData[this.props.id] : this.props.value
        const selectedItem = options.filter(option => option[this.props.optionId] === value)[0]
        const defaultCaretStyle = {marginTop: '-10px'}
        if (!selectedItem && defaultText === '') {
            defaultCaretStyle.marginTop = '5px'
        }
        const defaultStyle = {float: 'left', marginRight: '0px', width: '80%'}
        const dropdownStyle = {width: '80%', marginTop: '34px'}
        if (!clearable) {
            defaultStyle.width = '100%'
            dropdownStyle.width = '100%'
        }
        else {
            defaultStyle.width = '90%'
            dropdownStyle.width = '90%'
        }
        if (this.props.width) dropdownStyle.width = this.props.width;
        const emptyDropdownStyle = {...defaultStyle, height: '34px'}
        let buttonDefaultStyle = selectedItem ? defaultStyle : emptyDropdownStyle


        const searchedValue = this.turkishToUpper(this.state.searchedValue)
        let searchFilter = this.props.searchFilter ? this.props.searchFilter : this.props.optionValue;
        options = options.filter(option => {
            return option[searchFilter] && self.turkishToUpper(option[searchFilter]).includes(searchedValue)
        });
        if (options.length === 0 && this.props.defaultKey) {
            const defaultKey = self.turkishToUpper(this.props.defaultKey);
            options = this.props.options.filter(option => {
                return option[searchFilter] && self.turkishToUpper(option[searchFilter]).includes(defaultKey)
            });
        }

        let selectedOptionValue = this.props.selectedOptionValue || this.props.optionValue

        let readOnlyStyle = this.props.readOnly ? {backgroundColor: '#EEF1F5', cursor: 'not-allowed'} : {}
        //  const errorStyle = (this.props.tooltip && this.props.errors && this.props.errors[this.props.id]) ? {backgroundColor:'red',color:'white'} : {}
        //  readOnlyStyle = Object.assign(readOnlyStyle,errorStyle);
        buttonDefaultStyle = {...buttonDefaultStyle, ...readOnlyStyle}

        if (this.state.open) {
            this.listenKeyPress();
        }else{
            this.removeListener();
        }

        return <div className="row btn-group  bootstrap-select bs-select form-control" style={readOnlyStyle}>

            <div onClick={this.openCloseList.bind(this)}
                 disabled={this.props.disabled}
                 className="btn dropdown-toggle btn-default dropdown-button"
                 style={buttonDefaultStyle}>
                <div style={{textOverflow: 'ellipsis', width: '85%', overflow: 'hidden'}}>
                    {selectedItem ? selectedItem[selectedOptionValue] : defaultText}

                </div>
                <span className="caret pull-right" style={defaultCaretStyle}></span></div>
                {
                clearable ?
                    <div id="clearButton" className="clear-button" onClick={this.onClickClear.bind(this)}
                         style={{
                             height: '34px',
                             color: '#555',
                             textAlign: 'center',
                             border: '1px solid #ccc',
                             width: '10%',
                             float: 'left',
                             paddingTop: '5px'
                         }}>
                        <i className="fa fa-times"/>
                    </div>
                    : ''
            }
            <div className={dropdownClassName} style={dropdownStyle}>
                <ul>
                    {
                        searchable ?
                            <li>
                                <input type="text"
                                       ref={(input) => {
                                           this.searchInput = input;
                                       }}
                                       className="form-control"
                                       onChange={this.onSearchableChange.bind(this)}
                                       value={this.state.searchedValue ? this.state.searchedValue : ''}
                                />
                            </li>
                            : ''
                    }
                    {
                        (this.props.onAddNewItemClick) ?
                            <li className="no-results" onClick={this.onAddNewItemClick.bind(this)}>
                                <i className="fa fa-plus"></i>Yeni Ekle
                            </li>
                            : ''
                    }
                    {
                        options.map((e, key) => {
                            return <li
                                style={{textAlign: "left"}}
                                key={key}
                                onClick={this.selectItem.bind(this, e)}
                                className={selectedItem && selectedItem[this.props.optionId] === e[this.props.optionId] ? 'selectedItemColor' : ''}
                            >
                                {e[this.props.optionValue]}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>

    }

    render() {
        let validationState = null;
        let tooltip = ""
        const error = (this.props.errors && this.props.errors[this.props.id]) ?
            <ControlLabel>{this.props.errors[this.props.id]}</ControlLabel> : false
        if (error) {
            validationState = "error";
            tooltip = (
                <Tooltip id="tooltip">{this.props.errors[this.props.id][0]}</Tooltip>
            );

            /* tooltip = (
               <Popover id="popover-positioned-left" title="Hata">
                <strong>{this.props.errors[this.props.id][0]}</strong>
                </Popover>
             )*/
        }

        let classForTooltip = ''
        if (this.props.tooltip && error)
            classForTooltip = "input-icon right"
        const help = this.props.help ? <HelpBlock>{this.props.help}</HelpBlock> : ''
        let tooltipId = this.props.tooltipId ? this.props.tooltipId : this.props.id;

        if (this.props.justInput)
            return this.renderInput()
        return (
            !this.props.isVertical ?
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {this.props.label && <Col componentClass={ControlLabel} md={this.props.labelMd}>
                        {TooltipService.getLabelWithTooltip(tooltipId, this.props.label)}&nbsp; {this.props.required ?
                        <span className="required"> * </span> : ''}
                    </Col>}
                    <Col md={this.props.colMd}>
                        <div className={classForTooltip}>
                            {error && this.props.tooltip ? <OverlayTrigger placement="left" overlay={tooltip}>
                                <i className="fa fa-warning tooltips"></i>
                            </OverlayTrigger> : ''}
                            {this.renderInput()}

                            {error && !this.props.tooltip ? error : help}
                        </div>
                    </Col></FormGroup> :
                <FormGroup controlId={this.props.id} validationState={validationState}>
                    {this.props.label && <Col componentClass={ControlLabel}
                                              className="control-line">{TooltipService.getLabelWithTooltip(this.props.id, this.props.label)}&nbsp; {this.props.required ?
                        <span className="required"> * </span> : ''}
                    </Col>}
                    <div className={classForTooltip}>
                        {this.renderInput()}
                        {error && this.props.tooltip ? <OverlayTrigger placement="left" overlay={tooltip}>
                            <i className="fa fa-warning tooltips"></i>
                        </OverlayTrigger> : ''}
                        {error && !this.props.tooltip ? error : help}
                    </div>
                </FormGroup>
        )
    }
}

export default enhanceWithClickOutside(EkoFormSelect);
