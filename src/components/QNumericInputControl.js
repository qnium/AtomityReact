import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

const NUMERIC_INPUT_PROP_NAMES = [
    'placeholder',
    'min',
    'max',
    'step',
    'precision',
    'parse',
    'format',
    'disabled',
    'readOnly',
    'style',
    'size',
    'mobile'
];

class QNumericInputControl extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField] || ""
        };
    }

    onChange(newValue) {
        let oldValue = this.state.controlValue;
        this.setState({controlValue: newValue});
        
        if(this.props.onChange) {
            this.props.onChange({
                oldValue: oldValue,
                newValue
            });
        }
    }

    render() {
        const inputProps = {};
        NUMERIC_INPUT_PROP_NAMES.forEach(n => inputProps[n] = this.props[n]);

        return (
            <NumericInput
                id={this.props.id}
                className="form-control"
                value={this.state.controlValue}
                onChange={this.onChange.bind(this)}
                {...inputProps}
            />
        );
    }
}

export default QNumericInputControl;