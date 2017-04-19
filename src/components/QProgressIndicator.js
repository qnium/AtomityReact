import React, { Component } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {ListControllerEvents} from 'atomity-core';

import events from 'qnium-events';

class QProgressIndicator extends Component
{
    constructor(props)
    {
        super(props);
        let self = this;
        this.targetCtrl = this.props.targetListCtrlName;
        this.state = {
            inProgress: false
        }

        this.ctrlStateListener = function(target) {
            self.setState({inProgress: target.actionInProgress});
        }
    }

    componentDidMount() {
        events(ListControllerEvents.stateChanged).handle(event => {
            if(event.sourceName === this.targetCtrl) {
                this.ctrlStateListener(event.data);
            }
        });
    };    
    
    componentWillUnmount() {
        //window.QEventEmitter.removeListener(this.ctrlStateListener);
    };

    render() {
        return (                
            <Glyphicon className="pull-right" glyph='repeat' style={{color: this.state.inProgress ? '#a0a0a0' : null}}>
                {this.props.children}
            </Glyphicon>
        );
    }    
}

export default QProgressIndicator;