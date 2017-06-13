import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DEFAULT_EDITOR_CONFIG = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    },
    formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
};

class QRTEControl extends Component
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
        const { modules, formats, placeholder } = this.props;
        const activeModules = modules ? modules : DEFAULT_EDITOR_CONFIG.modules;
        const activeFormats = formats ? formats : DEFAULT_EDITOR_CONFIG.formats;

        return (
            <ReactQuill
                theme="snow"
                modules={activeModules}
                formats={activeFormats}
                placeholder={placeholder}
                value={this.state.controlValue}
                onChange={this.onChange}
            />
        );
    }
}

export default QRTEControl;