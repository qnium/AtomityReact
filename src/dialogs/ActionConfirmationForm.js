import React from 'react';
import QForm from '../components/QForm'

class ActionConfirmationForm extends React.Component
{   
    render = () => (
        <QForm okButtonText="Yes" disableConfirmation={true} cancelButtonText="No" title="Action confirmation..." onDialogClose={this.props.onDialogClose}>
            <form>
                <p className="text-center"><strong>Are you sure you want to perform this action?</strong></p>
            </form>
        </QForm>
    )
}

export default ActionConfirmationForm;
