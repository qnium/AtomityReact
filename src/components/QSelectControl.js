import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import {ListControllerEvents} from 'atomity-frontend-common';
import {ListController} from 'atomity-frontend-common';
import events from 'qnium-events';

class QSelectControl extends React.Component
{
    constructor(props)
    {
        super(props);

        if(!this.props.entityObject[this.props.bindingField] && this.props.foreignField) {
            this.props.entityObject[this.props.bindingField] = {};
        }
        
        let val = this.props.entityObject[this.props.bindingField];
        if(this.props.foreignField){
            val = val[this.props.foreignField];
        }
        this.state = {
            controlValue: val,
            selectOptions: []
        };
        this.selectCtrlInitialized = false;

        this.valField = this.props.valueField || "id";
        this.dispField = this.props.displayField || "name";
    }

    onChange(event)
    {
        let oldValue;
        let newValue;
        if(this.props.foreignField) {
            // eslint-disable-next-line
            oldValue = this.state.selectOptions.find(item => item[this.valField] == this.state.controlValue);
            // eslint-disable-next-line
            newValue = this.state.selectOptions.find(item => item[this.valField] == event.target.value);
        } else {
            oldValue = this.state.controlValue;
            newValue = event.target.value;
        }
        this.setState({controlValue: event.target.value});
        this.props.entityObject[this.props.bindingField] = newValue;
        
        if(this.props.onChange)
        {
            this.props.onChange({
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    renderOptions()
    {
        return this.state.selectOptions.map((item, index) => {
            return (<option key={index} value={item[this.valField]}>{item[this.dispField]}</option>)
        }, this);
    }    

    initSelectCtrl()
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
                        // eslint-disable-next-line
                        self.state.selectOptions.find(item => item[self.valField] == self.state.controlValue)
                    );
                }
            }
        });
    }
    
    componentWillUnmount() {
        if(this.eventRemover) {
            this.eventRemover();
        }        
    }

    render() {
        if(this.props.relatedEntitiesName && !this.listCtrl) {
            this.initSelectCtrl();
        }
        return (
            <FormControl id={this.props.id} inputRef={this.props.inputRef} componentClass="select" value={this.state.controlValue} onChange={this.onChange.bind(this)}>
                {this.props.children}
                {this.renderOptions()}
            </FormControl>
        );
    }
}

export default QSelectControl;