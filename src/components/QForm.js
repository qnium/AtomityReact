import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {DataProviderRegistry, ListControllerEvents} from 'atomity-core';
import events from 'qnium-events';

import QFormControl from './QFormControl';

class QForm extends React.Component {
    
    constructor(props)
    {
        super(props);
        let self = this;
        this.dataProvider = DataProviderRegistry.get(this.props.dataProviderName);
        this.state = {showDialog : true}
        
        this.closeDialog = function(ev){
            self.setState({showDialog: false});
        }

        this.cancel = function() {
            self.closeDialog();
            self.props.onDialogClose("'dialogCancel'");
        }

        this.ok = function()
        {
            let entityObject = self.props.entityObject;
            if(self.props.transformExp){
                entityObject = eval(self.props.transformExp);
            }
            self.dataProvider.executeAction(self.props.entitiesName, self.props.okAction, entityObject).then(result => {
                self.closeDialog();
                self.props.onDialogClose("'dialogOk'");
                let entitiesToRefresh = [self.props.entitiesName];
                if(self.props.entitiesToRefresh) {
                    entitiesToRefresh = entitiesToRefresh.concat(self.props.entitiesToRefresh);
                }
                events(ListControllerEvents.updateEntities).send(entitiesToRefresh);
            });
        }
    }

    renderRecursively(children, index)
    {        
        if(!children) {
            return;
        }

        if(children.type === QFormControl) {
            return (
                <QFormControl key={index} inputRef={children.ref} {...children.props} entityObject={this.props.entityObject}>
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

    render() {
        return (
            <Modal show={this.state.showDialog} onHide={this.cancel}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderRecursively(this.props.children)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.cancel}>{this.props.cancelButtonText}</Button>
                    <Button bsStyle="primary" onClick={this.ok}>{this.props.okButtonText}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default QForm;
