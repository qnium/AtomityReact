import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import MaskedInput from 'react-maskedinput';

class QMaskedInputControl extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField] || ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        let oldValue = this.state.controlValue;
        this.setState({controlValue: event.target.value});
        
        if(this.props.onChange)
        {
            this.props.onChange({
                oldValue: oldValue,
                newValue: event.target.value
            });
        }
    }

    render() {
        const { id, mask, inputRef, placeholder, placeholderChar } = this.props;
        return (
            <MaskedInput
                className="form-control"
                mask={mask}
                id={id}
                inputRef={inputRef}
                placeholder={placeholder}
                placeholderChar={placeholderChar}
                value={this.state.controlValue}
                onChange={this.onChange}
            />
        )
    }
}

export default QMaskedInputControl;