import React, { Component } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import DialogService, {DialogResult} from '../services/DialogService';
import {ListControllerEvents} from 'atomity-frontend-common';
import ActionConfirmationForm from '../dialogs/ActionConfirmationForm';
import events from 'qnium-events';
import classNames from 'classnames';

class QAction extends Component {

    constructor(props)
    {
        super(props);
        
        let self = this;

        this.onClick = function()
        {
            if(self.props.disabled === true) {
                return;
            }
            
            if(self.props.workflow) {
                self.props.workflow.start(self.props.val, self.props.workflowParams);
                return;
            }
            
            if(self.props.useConfirmation === true) {
                DialogService.showDialog(ActionConfirmationForm).then(result =>
                {
                    if(result.dialogResult === DialogResult.ok) {
                        self.doAction();
                    }            
                });            
            } else {
                self.doAction();
            }
        }
    }

    doAction()
    {
        if(this.props.isCustomAction === true) {
            events(ListControllerEvents.customAction).send({targetName: this.props.targetListCtrlName, data: {action: this.props.action, data: this.props.val}});
        } else {
            events(this.props.action).send({targetName: this.props.targetListCtrlName, data: this.props.val});
        }
    }

    render()
    {
        let actionTemplate;

        if(this.props.children){
            actionTemplate = (<span className={classNames(this.props.className, this.props.disabled === true ? "q-action-disabled" : "q-action")} onClick={this.onClick}>{this.props.children}</span>)
        } else {
            actionTemplate = (
                <Glyphicon className={classNames(this.props.className, this.props.disabled === true ? "q-action-disabled" : "q-action")} title={this.props.title} glyph={this.props.icon} onClick={this.onClick}>
                    {this.props.children}
                </Glyphicon>
            )
        }
        return (actionTemplate)
    }
}

export default QAction;