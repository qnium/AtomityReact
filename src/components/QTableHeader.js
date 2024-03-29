import React, { Component } from 'react';
import {ListControllerEvents} from 'atomity-frontend-common';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import QGroupActions from './QGroupActions';

import events from 'qnium-events';

class QTableHeader extends Component
{
    constructor(props)
    {
        super(props);
        let self = this;
        this.targetCtrl = this.props.targetListCtrlName;
        this.state = {
            sortingField: undefined,
            sortingValue: undefined
        }

        this.ctrlStateListener = function(target) {
            if(!target.actionInProgress){
                self.setState({
                    sortingField: target.currentSort.field,
                    sortingValue: target.currentSort.value
                });
            }
        }

        this.headerClick = header =>
        {
            if(header.props.sortingField)
            {
                let sortParams = {
                    sortingField: header.props.sortingField
                }
                events(ListControllerEvents.sort).send({targetName: this.targetCtrl, data: sortParams});
            }
        }        
    }

    componentDidMount() {
        this.handlerRemover = events(ListControllerEvents.stateChanged).handle(event => {
            if(event.sourceName === this.targetCtrl) {
                this.ctrlStateListener(event.data);
            }
        });
    };    
    
    componentWillUnmount() {
        this.handlerRemover();
    };

    renderSortIcon(){
        if(this.state.sortingField !== undefined && this.state.sortingField === this.props.sortingField){
            let icon = this.state.sortingValue ? "triangle-bottom" : "triangle-top";
            return <Glyphicon glyph={icon} />
        } else {
            return null;
        }
    }
    
    renderChildren() {
        if(this.props.children && this.props.children.type === QGroupActions 
            || this.props.children && this.props.children.props && this.props.children.props.groupActionsClass && this.props.children.type === this.props.children.props.groupActionsClass) {
                return React.createElement(this.props.children.props.groupActionsClass || QGroupActions, {...this.props, targetListCtrlName: this.props.children.props.targetListCtrlName || this.targetCtrl});
        } else {
            return this.props.children
        }
    }

    render() {
        return <th onClick={this.headerClick.bind(this, this)}>
            {this.renderChildren()}
            {this.renderSortIcon()}
        </th>
    }
}

export default QTableHeader;