import React from 'react';
import QForm from '../components/QForm'

const ActionConfirmationParams = {
    title: "Action confirmation...",
    message: "Are you sure you want to perform this action?",
    yesButton: "Yes",
    noButton: "No"
}

class ActionConfirmationForm extends React.Component {
    render = () => (
        <QForm okButtonText={ActionConfirmationParams.yesButton} disableConfirmation={true} cancelButtonText={ActionConfirmationParams.noButton} title={ActionConfirmationParams.title} onDialogClose={this.props.onDialogClose}>
            <p className="text-center"><strong>{ActionConfirmationParams.message}</strong></p>
        </QForm>
    )
}

export { ActionConfirmationParams };
export default ActionConfirmationForm;
