import React, { Component } from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {InputFilterController} from 'atomity-frontend-common';

class QInputFilter extends Component 
{    
    constructor(props)
    {
        super(props);

        this.state = {
            value: props.value
        }
        
        this.filterCtrl = new InputFilterController(this.props);

        this.onChangeFilterValue = (e) => {
            this.setState({value: e.target.value});
            this.filterCtrl.applyFilter(e.target.value);
        }
    }

    filterCtrl = null;

    componentWillReceiveProps(nextProps)
    {
        const { value } = nextProps;
        this.setState({ value });
        if (typeof value !== 'undefined' && value !== null)
        {
            this.filterCtrl.applyFilter(value);
        }
    }
    
    render()
    {
        return (
                <FormGroup controlId={this.props.targetListCtrlName + this.props.filteringField}>
                    <ControlLabel>{this.props.title}</ControlLabel>
                    <FormControl 
                        id={this.props.targetListCtrlName + this.props.filteringField}
                        type="text" 
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.onChangeFilterValue}
                    />
                </FormGroup>
        )
    }
}

export default QInputFilter;