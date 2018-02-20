import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import TooltipService from "../../../services/TooltipService";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

export default class EkoTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            loading: false,
            label: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    fetchLabelsFromStorage() {
        if (this._ismounted) {
            this.setState({
                label: TooltipService.inputHasLabel(this.props.inputId),
                loading: false
            });
        }
    }

    toggle() {
        this.setState({
            opened: !this.state.opened
        });
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    componentDidMount() {
        this._ismounted = true;

        if (TooltipService.formId !== null) {
            if (TooltipService.dataFetched() === false) {
                Observable.interval(30000).merge(Observable.of(0))
                    .mergeMap(() => {
                        return Observable.fromPromise(TooltipService.fetching);
                    })
                    .map(result => {

                        // get datas and set them
                        return result.data.data;
                    })
                    .subscribe(scores => {
                        sessionStorage.setItem('tooltip_labels', JSON.stringify(scores));
                        this.fetchLabelsFromStorage();
                    });
            } else {
                this.fetchLabelsFromStorage();
            }
        }
    }

    renderEmptyLabel = () => {
        return this.props.checkbox ? <div>{this.props.label}</div> : <span>{this.props.label}</span>;
    };

    renderLabel = () => {
        const popover = <Popover style={this.state.label.style || {}} className={"tooltip"}
                                 id="popover-positioned-top"
                                 title={this.state.label.title}>
            <span dangerouslySetInnerHTML={{__html: this.state.label.content}}/>
        </Popover>;

        return this.props.checkbox ? <div>
            {this.props.label}

            <OverlayTrigger trigger={["hover", "focus"]} placement={this.state.label.placement || "top"}
                            overlay={popover}>
                <button className={"popover-button"}><i
                    className="fa fa-question-circle popovers popover-fa"/></button>
            </OverlayTrigger>
        </div> : <span>
                 {this.props.label}

            <OverlayTrigger trigger={["hover", "focus"]} placement={this.state.label.placement || "top"}
                            overlay={popover}>
                    <button className={"popover-button"}><i
                        className="fa fa-question-circle popovers popover-fa"/></button>
                </OverlayTrigger>
            </span>;
    };

    render() {
        return this.state.label !== false ? this.renderLabel() : this.renderEmptyLabel();
    }
}


EkoTooltip.propTypes = {
    inputId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checkbox: PropTypes.bool
};

EkoTooltip.defaultProps = {
    checkbox: false
};
