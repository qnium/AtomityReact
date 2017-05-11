import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {ListControllerEvents} from 'atomity-frontend-common';
import QAction from './QAction';

import events from 'qnium-events';

class QGroupActions extends Component
{
    constructor(props)
    {
        super(props);
        let self = this;
        this.targetCtrl = this.props.targetListCtrlName;
        
        this.state = {
            allChecked: false,
            actionsAllowed: false,
            checkedItems: []
        };

        this.ctrlStateListener = function(target)
        {
            if(!target.actionInProgress) {
                let checkedItems = target.pageData.filter(item => item.checked).map(item => item.data);
                let checkedCounter = checkedItems.length;
                let allChecked = checkedCounter === target.pageData.filter(item => !item.dummy).length && checkedCounter > 0;
                self.setState({
                    allChecked: allChecked,
                    actionsAllowed: checkedCounter > 0,
                    checkedItems: checkedItems
                });
            }
        }
        events(ListControllerEvents.stateChanged).handle(event => {
            if(event.sourceName === this.targetCtrl) {
                this.ctrlStateListener(event.data);
            }
        });

        this.checkBoxClick = () => {
            events(ListControllerEvents.setAllChecked).send({targetName: self.targetCtrl, data: {newState: !self.state.allChecked}});
        }        
    }

    renderMenuItems()
    {
        return React.Children.map(this.props.children.props.children, (menuItem, index) =>
        {
            let actionTemplate;

            if(menuItem.type === QAction) {
                actionTemplate = <QAction disabled={!this.state.actionsAllowed} {...menuItem.props} val={this.state.checkedItems} targetListCtrlName={this.targetCtrl}>{menuItem.props.title}</QAction>
            } else {
                return null;
                actionTemplate = menuItem;
            }

            return <MenuItem key={index} disabled={!this.state.actionsAllowed}>{actionTemplate}</MenuItem>
        });
    }

    render() {
        return (
            <ButtonGroup>
                <Button bsSize="small" onClick={this.checkBoxClick}>
                    <input type="checkbox" checked={this.state.allChecked} />
                </Button>
                <DropdownButton id="input-dropdown-addon" title="">
                    {this.renderMenuItems()}
                </DropdownButton>
            </ButtonGroup>
        );
    }
}

export default QGroupActions;