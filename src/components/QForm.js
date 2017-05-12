import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Alert from 'react-bootstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import DialogService, {DialogResult} from '../services/DialogService';
import { DataProviderRegistry, ListControllerEvents, ValidationController } from 'atomity-frontend-common';
import events from 'qnium-events';
import QFormControl from './QFormControl';
import ActionConfirmationForm from '../dialogs/ActionConfirmationForm';

class QForm extends React.Component {
    
    constructor(props)
    {
        super(props);
        let self = this;
        
        if(this.props.entitiesName)
        {
            this.dataProvider = DataProviderRegistry.get(this.props.dataProviderName);

            this.validationCtrl = new ValidationController({
                dataProviderName: this.props.dataProviderName,
                entitiesName: this.props.entitiesName
            });
        }

        this.state = {
            showDialog : true,
            validationError: null,
            actionAllowed: true,
            actionInProgress: false
        }
        
        this.closeDialog = function(ev){
            self.setState({showDialog: false});
        }

        this.cancel = function() {
            self.closeDialog();
            self.props.onDialogClose({dialogResult: DialogResult.cancel});
        }

        this.doAction = function()
        {
            if(self.props.entitiesName && self.props.okAction)
            {
                let entityObject = self.props.entityObject;
                if(self.props.useArray === true){
                    entityObject = [self.props.entityObject];
                }
                self.setState({validationError: null, actionInProgress: true, actionAllowed: false});
                self.dataProvider.executeAction(self.props.entitiesName, self.props.okAction, entityObject).then(result => {
                    self.closeDialog();
                    self.props.onDialogClose({dialogResult: DialogResult.ok, entityObject: self.props.entityObject});
                    let entitiesToRefresh = [self.props.entitiesName];
                    if(self.props.entitiesToRefresh) {
                        entitiesToRefresh = entitiesToRefresh.concat(self.props.entitiesToRefresh);
                    }
                    events(ListControllerEvents.updateEntities).send(entitiesToRefresh);
                }).catch(err => {
                    let errorMessage = null;
                    if(err.errorCode != -177){
                        self.dataProvider.errorHandler(err.error);
                    } else {
                        errorMessage = err.error;
                    }
                    
                    self.setState({
                        validationError: errorMessage,
                        // eslint-disable-next-line
                        actionAllowed: err.errorCode == -177 ? false : true,
                        actionInProgress: false
                    });
                });
            } else {
                self.closeDialog();
                self.props.onDialogClose({dialogResult: DialogResult.ok});
            }
        }
        
        this.ok = function()
        {
            if(self.props.disableConfirmation === true) {
                self.doAction();
            } else {
                DialogService.showDialog(ActionConfirmationForm).then(result =>
                {
                    if(result.dialogResult === DialogResult.ok) {
                        self.doAction();
                    }            
                });            
            }
        }
    }

    onChange(childHandler, event)
    {
        if(childHandler) {
            childHandler(event);
        }
        
        let err = this.validationCtrl.validateField({
            entityObject: this.props.entityObject,
            fieldName: event.bindingField,
            validateOtherFields: true,
            includeUnchangedFields: false
        });

        this.setState({validationError: err, actionAllowed: err == null});
    }

    renderRecursively(children, index)
    {        
        if(!children) {
            return;
        }

        if(children.type === QFormControl) {
            return (
                <QFormControl key={index} inputRef={children.ref} {...children.props} onChange={this.onChange.bind(this, children.props.onChange)}
                    entityObject={this.props.entityObject}>
                    {children.props.children}
                </QFormControl>
            );
        }

        if(typeof children === "object" && children.length !== undefined){
            return children.map((child, index) => this.renderRecursively(child, index));
        }

        if(children.props && children.props.children){
            return React.createElement(children.type, {key: index, ...children.props}, this.renderRecursively(children.props.children));
        }

        if(typeof children === "function"){
            return children(this.props.val);
        }

        return children;
    }    

    renderError()
    {
        if(this.state.validationError) {
            return (
                <Alert bsStyle="danger"><strong>Error: </strong>{this.state.validationError}</Alert>
            );
        } else {
            return null;
        }
    }
    
    renderOverlay() {
        if(this.state.actionInProgress){
            return (
                <div className="q-form-overlay text-center">
                    <div className="q-center"><FontAwesome name="refresh" size="3x" spin /></div>
                </div>)
        } else {
            return null
        }        
    }

    render() {
        return (
            <Modal show={this.state.showDialog} onHide={this.cancel}>
                {this.renderOverlay()}
                <div>
                <Modal.Header closeButton={true}>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderError()}
                    {this.renderRecursively(this.props.children)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.cancel}>{this.props.cancelButtonText}</Button>
                    <Button bsStyle="primary" disabled={!this.state.actionAllowed} onClick={this.ok}>
                        {this.state.actionInProgress ? <FontAwesome name="spinner" spin /> : null}
                        {this.props.okButtonText}
                    </Button>
                </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

export {DialogResult};
export default QForm;
