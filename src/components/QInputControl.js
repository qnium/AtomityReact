import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

class QInputControl extends React.Component
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
                oldValue: oldValue,
                newValue: event.target.value
            });
        }
    }

    render() {
        return (
            <FormControl id={this.props.id} inputRef={this.props.inputRef} type="text" placeholder={this.props.placeholder} value={this.state.controlValue}
                onChange={this.onChange.bind(this)}
            />
        )
    }
}

export default QInputControl;