import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import {FileDataProvider as dataProvider} from 'atomity-core'
import {ListControllerEvents} from 'atomity-core';
import {ListController} from 'atomity-core';
import events from 'qnium-events';

class QFormControl extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField],
            selectOptions: []
        };
        this.selectCtrlInitialized = false;
    }

    onChange(event)
    {
        this.setState({controlValue: event.target.value});
        this.props.entityObject[this.props.bindingField] = event.target.value;
    }

    onInputChange(event)
    {
        this.onChange(event);
        
        if(this.props.onChange) {
            this.props.onChange({
                bindingField: this.props.bindingField,
                newValue: event.target.value
            });
        }
    }
    
    onSelectChange(event)
    {
        this.onChange(event);
        
        if(this.props.onChange)
        {
            let selectedItem = this.state.selectOptions.find(item => item[this.props.valueField] == event.target.value);
            this.props.onChange({
                bindingField: this.props.bindingField,
                newValue: selectedItem
            });
        }
    }

    renderOptions()
    {
        return this.state.selectOptions.map((item, index) => {
            return (<option key={index} value={item[this.props.valueField]}>{item[this.props.displayField]}</option>)
        }, this);
    }    

    initSelectCtrl()
    {
        if(!this.listCtrl)
        {
            this.listCtrl = new ListController({
                entitiesName: this.props.relatedEntitiesName,
                readAction: this.props.readAction,
                pageDataLength: 0
            });
            let self = this;
            events(ListControllerEvents.stateChanged).handle(event =>
            {
                if(event.data.ctrlName === self.listCtrl.ctrlName && self.props.relatedEntitiesName === event.data.entitiesName && !event.data.actionInProgress) {
                    self.setState({
                        selectOptions: event.data.pageData.map(item => item.data)
                    });
                }
                if(!self.selectCtrlInitialized && event.data.pageData.length > 0) {
                    self.selectCtrlInitialized = true;
                    self.onSelectChange({target: {value: self.state.controlValue}});
                }
            });
        }
    }

    renderControl()
    {
        switch(this.props.type)
        {
            case "text":
                return (
                    <FormControl id={this.props.id} inputRef={this.props.inputRef} type="text" placeholder={this.props.placeholder} value={this.state.controlValue}
                        onChange={this.onInputChange.bind(this)}
                    />
                )
                break;
            
            case "select":
                //this.loadOptions();
                this.initSelectCtrl();
                return (
                    <FormControl id={this.props.id} inputRef={this.props.inputRef} componentClass="select" value={this.state.controlValue} onChange={this.onSelectChange.bind(this)}>
                        {this.props.children}
                        {this.renderOptions()}
                    </FormControl>
                )

            default: return (
                <FormControl.Static>
                    Unknown control type
                </FormControl.Static>
            );
        }
    }

    render() {
        return (
            this.renderControl()
        );
    }
}

export default QFormControl;