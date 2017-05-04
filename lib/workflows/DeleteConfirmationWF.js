'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DeleteConfirmationForm = require('../dialogs/DeleteConfirmationForm');

var _DeleteConfirmationForm2 = _interopRequireDefault(_DeleteConfirmationForm);

var _atomityCore = require('atomity-core');

var _atomityReact = require('atomity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteConfirmationWF = {
    start: function start(dialogData, params) {
        _atomityCore.DialogService.showDialog(_DeleteConfirmationForm2.default, { dialogData: dialogData, params: params }).then(function (result) {
            if (result.dialogResult === _atomityReact.DialogResult.ok) {
                console.log("delete record step 1 success", result);
            } else {
                console.log("delete record step 1 reject", result);
            }
        });
    }
};

exports.default = DeleteConfirmationWF;