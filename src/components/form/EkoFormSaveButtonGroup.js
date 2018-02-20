import React, {Component} from 'react';
import EkoFormButtonGroup from "./EkoFormButtonGroup";
import EkoFormButton from "./EkoFormButton";
import PropTypes from 'prop-types';

export default class EkoFormSaveButtonGroup extends Component {

    render() {
        return <div className="buttonProccess actionButtons">
            <div>

                {this.props.onSaveAndAddNew ? <EkoFormButtonGroup label={this.props.saveLabel}
                                                                  faClass="fa fa-plus"
                                                                  className="btn blue mt-ladda-btn ladda-button"
                                                                  isLoading={this.props.saving}
                                                                  onClick={this.props.onSave}
                                                                  buttons={[
                                                                      {
                                                                          onClick: this.props.onSaveAndAddNew,
                                                                          labelText: 'Kaydet ve Yeni Ekle'
                                                                      }
                                                                  ]}
                /> : <EkoFormButton label={this.props.saveLabel || 'Kaydet'}
                                    faClass="fa fa-plus"
                                    className="btn blue mt-ladda-btn ladda-button"
                                    isLoading={this.props.saving}
                                    onClick={this.props.onSave}
                />}


                &nbsp;
                <EkoFormButton label={this.props.cancelLabel} className="btn dark btn-outline"
                               onClick={() => {
                                   this.props.onCancel()
                               }}
                />
            </div>
        </div>
    }
}

EkoFormSaveButtonGroup.propTypes = {
    saveLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    saving: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onSaveAndAddNew: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
};

EkoFormSaveButtonGroup.defaultProps = {
    saveLabel: 'Kaydet',
    cancelLabel: 'İptal',
    saving: false,
};