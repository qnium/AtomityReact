import React, { Component } from 'react';
import {ListControllerEvents} from 'atomity-frontend-common';
import Pagination from 'react-bootstrap/lib/Pagination';

import events from 'qnium-events';

class QPagination extends Component
{
    constructor(props)
    {
        super(props);
        let self = this;
        this.targetCtrl = this.props.targetListCtrlName;
        this.maxButtons = this.props.maxButtons || 5;
        this.state = {
            activePage: 1,
            totalPages: 1,
            nextPageAvailable: false,
            prevPageAvailable: false
        }

        this.ctrlStateListener = function(target) {
            if(!target.actionInProgress){
                self.setState({
                    activePage: target.currentPage,
                    totalPages: target.totalPages,
                    nextPageAvailable: target.nextPageAvailable,
                    prevPageAvailable: target.prevPageAvailable
                });
            }
        }

        this.handleSelect = (eventKey) => {   
            events(ListControllerEvents.selectPage).send({targetName: this.targetCtrl, data: eventKey});            
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

    render() {
        return (
            <Pagination                
                prev
                next
                first
                last
                items={this.state.totalPages}
                maxButtons={this.maxButtons}
                activePage={this.state.activePage}
                onSelect={this.handleSelect}
                ellipsis={this.props.ellipsis === undefined ? true : this.props.ellipsis}
                boundaryLinks={this.props.boundaryLinks === undefined ? true : this.props.boundaryLinks}
                buttonComponentClass={this.props.buttonComponentClass}
            />
        );
    }    
}

export default QPagination;