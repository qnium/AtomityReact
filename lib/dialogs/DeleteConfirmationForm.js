'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _atomityReact = require('atomity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteConfirmationForm = function (_React$Component) {
    _inherits(DeleteConfirmationForm, _React$Component);

    function DeleteConfirmationForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DeleteConfirmationForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeleteConfirmationForm.__proto__ || Object.getPrototypeOf(DeleteConfirmationForm)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            return _react2.default.createElement(
                _atomityReact.QForm,
                { okButtonText: 'Yes', cancelButtonText: 'No', disableConfirmation: true, title: 'Delete record...', entityObject: _this.props.val.dialogData, entitiesName: _this.props.val.params.entitiesName,
                    entitiesToRefresh: _this.props.val.params.entitiesToRefresh, okAction: 'delete', onDialogClose: _this.props.onDialogClose, useArray: true },
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(
                        'p',
                        { className: 'text-center' },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Are you sure you want to delete record?'
                        )
                    )
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return DeleteConfirmationForm;
}(_react2.default.Component);

exports.default = DeleteConfirmationForm;