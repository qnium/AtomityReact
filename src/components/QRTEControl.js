import React from 'react';
import CKEditor from 'react-ckeditor-wrapper';

const DEFAULT_EDITOR_CONFIG = {

};

class QRTEControl extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField] || ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(value)
    {
        let oldValue = this.state.controlValue;
        this.setState({controlValue: value});
        
        if(this.props.onChange)
        {
            this.props.onChange({
                oldValue: oldValue,
                newValue: value
            });
        }
    }

    render() {
        const editorConfig = {
            DEFAULT_EDITOR_CONFIG,
            ...this.props.config
        };
        return (
            <CKEditor
                config={editorConfig}
                value={this.state.controlValue}
                onChange={this.onChange}
            />
        );
    }
}

export default QRTEControl;