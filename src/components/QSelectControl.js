import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import {ListControllerEvents} from 'atomity-core';
import {ListController} from 'atomity-core';
import events from 'qnium-events';

class QSelectControl extends React.Component
{
    constructor(props)
    {
        super(props);

        if(!this.props.entityObject[this.props.bindingField]){
            this.props.entityObject[this.props.bindingField] = {};
            this.props.entityObject[this.props.bindingField][this.props.valueField] = 0;
        }
        this.state = {
            controlValue: this.props.entityObject[this.props.bindingField][this.props.valueField],
            selectOptions: []
        };
        this.selectCtrlInitialized = false;
    }

    onChange(event)
    {
        let oldValue = this.state.selectOptions.find(item => item[this.props.valueField] == this.state.controlValue);
        let selectedItem = this.state.selectOptions.find(item => item[this.props.valueField] == event.target.value);
        this.setState({controlValue: event.target.value});
        this.props.entityObject[this.props.bindingField] = selectedItem;
        
        if(this.props.onChange)
        {
            this.props.onChange({
                bindingField: this.props.bindingField,
                oldValue: oldValue,
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
                pageDataLength: 0,
                dataProviderName: this.props.dataProviderName
            });
            let self = this;
            
            this.eventRemover = events(ListControllerEvents.stateChanged).handle(event =>
            {
                if(event.data.ctrlName === self.listCtrl.ctrlName && self.props.relatedEntitiesName === event.data.entitiesName && !event.data.actionInProgress)
                {
                    self.setState({
                        selectOptions: event.data.pageData.map(item => item.data)
                    });
                    
                    if(!self.selectCtrlInitialized && event.data.pageData.length > 0 && self.props.onInit) {
                        self.selectCtrlInitialized = true;
                        self.props.onInit(
                            self.state.selectOptions.find(item => item[self.props.valueField] == self.state.controlValue)
                        );
                    }
                }
            });
        }
    }
    
    componentWillUnmount() {
        if(this.eventRemover) {
            this.eventRemover();
        }        
    }

    render() {
        this.initSelectCtrl();
        return (
            <FormControl id={this.props.id} inputRef={this.props.inputRef} componentClass="select" value={this.state.controlValue} onChange={this.onChange.bind(this)}>
                {this.props.children}
                {this.renderOptions()}
            </FormControl>
        );
    }
}

export default QSelectControl;