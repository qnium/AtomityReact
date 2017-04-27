import React from 'react';

class QFormControl extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entityObject[this.props.bindingField] === undefined) {
            this.props.entityObject[this.props.bindingField] = "";
        }
    }

    onChange(event)
    {
        this.props.entityObject[this.props.bindingField] = event.newValue;
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        return (
            React.createElement(this.props.type, {...this.props, onChange: this.onChange.bind(this)} , this.props.children)
        );
    }
}

export default QFormControl;