import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

class QTextAreaControl extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField] || ""
        };
    }

    onChange(event)
    {
        let oldValue = this.state.controlValue;
        this.setState({controlValue: event.target.value});
        
        if(this.props.onChange)
        {
            this.props.onChange({
                bindingField: this.props.bindingField,
                oldValue: oldValue,
                newValue: event.target.value
            });
        }
    }

    render() {
        return (
            <FormControl id={this.props.id} inputRef={this.props.inputRef} componentClass="textarea" placeholder={this.props.placeholder} value={this.state.controlValue}
                onChange={this.onChange.bind(this)}
            />
        )
    }
}

export default QTextAreaControl;