import React, { Component } from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {SelectFilterController} from 'atomity-frontend-common';
import {ListControllerEvents} from 'atomity-frontend-common';
import events from 'qnium-events';

class QSelectFilter extends Component 
{    
    constructor(props)
    {
        super(props);
        let self = this;
        
        let listCtrlParams = Object.assign({}, this.props);
        this.filterCtrl = new SelectFilterController(listCtrlParams);
        
        this.state = {
            options: []
        };

        this.onChangeFilterValue = (e) => {
            this.filterCtrl.applyFilter(e.target.value);
        }
        
        if(this.props.entitiesName) {
            events(ListControllerEvents.stateChanged).handle(event =>
            {
                if(event.data.ctrlName === self.filterCtrl.listCtrl.ctrlName && self.props.entitiesName === event.data.entitiesName && !event.data.actionInProgress) {
                    self.setState({
                        options: event.data.pageData.map(item => item.data)
                    });
                }
            });
        }
    }
    
    renderOptions()
    {
        return this.state.options.map((item, index) => {
            return (<option key={index} value={item[this.props.valueField || "id"]}>{item[this.props.displayField || "name"]}</option>)
        }, this);
    }
    
    render()
    {
        return (
            <form>
                <FormGroup controlId={"SelectFilter" + this.props.targetListCtrlName + this.props.filteringField}>
                    <ControlLabel>{this.props.title}</ControlLabel>
                    <FormControl id={"SelectFilter" + this.props.targetListCtrlName + this.props.filteringField} componentClass="select" defaultValue="" onChange={this.onChangeFilterValue}>
                        {this.props.children}
                        {this.renderOptions()}
                    </FormControl>
                </FormGroup>
            </form>
        )
    }
}

export default QSelectFilter;