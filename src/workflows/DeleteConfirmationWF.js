import DeleteConfirmationForm from '../dialogs/DeleteConfirmationForm';
import {DialogService} from 'atomity-frontend-common';
import {DialogResult} from 'atomity-react';

let DeleteConfirmationWF =
{
    start: (dialogData, params) =>
    {
        DialogService.showDialog(DeleteConfirmationForm, {dialogData: dialogData, params: params}).then(result =>
        {
            if(result.dialogResult === DialogResult.ok) {
                console.log("delete record step 1 success", result);
            } else {
                console.log("delete record step 1 reject", result);
            }            
        });
    }
}

export default DeleteConfirmationWF;