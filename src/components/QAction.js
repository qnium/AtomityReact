import React, { Component } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import {ListControllerEvents} from 'atomity-core';

import events from 'qnium-events';

class QAction extends Component {

    constructor(props){
        super(props);
        
        let self = this;

        this.onClick = function()
        {
            if(self.props.workflow) {
                self.props.workflow.start(self.props.val, self.props.workflowParams);
                return;
            }
            
            if(self.props.isCustomAction === true) {
                events(ListControllerEvents.customAction).send({targetName: self.props.targetListCtrlName, data: {action: self.props.action, payload: self.props.val}});
            } else {
                events(self.props.action).send({targetName: self.props.targetListCtrlName, data: self.props.val});
            }
        }
    }

    render()
    {
        let actionTemplate;

        if(this.props.children){
            actionTemplate = (<span className={this.props.className} style={{cursor: this.props.cursor || 'pointer'}} onClick={this.onClick}>{this.props.children}</span>)
        } else {
            actionTemplate = (
                <Glyphicon title={this.props.title} glyph={this.props.icon} onClick={this.onClick}>
                    {this.props.children}
                </Glyphicon>
            )
        }
        return (actionTemplate)
    }
}

export default QAction;