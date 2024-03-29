'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionConfirmationParams = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QForm = require('../components/QForm');

var _QForm2 = _interopRequireDefault(_QForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionConfirmationParams = {
    title: "Action confirmation...",
    message: "Are you sure you want to perform this action?",
    yesButton: "Yes",
    noButton: "No"
};

var ActionConfirmationForm = function (_React$Component) {
    _inherits(ActionConfirmationForm, _React$Component);

    function ActionConfirmationForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ActionConfirmationForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionConfirmationForm.__proto__ || Object.getPrototypeOf(ActionConfirmationForm)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            return _react2.default.createElement(
                _QForm2.default,
                { okButtonText: ActionConfirmationParams.yesButton, disableConfirmation: true, cancelButtonText: ActionConfirmationParams.noButton, title: ActionConfirmationParams.title, onDialogClose: _this.props.onDialogClose },
                _react2.default.createElement(
                    'p',
                    { className: 'text-center' },
                    _react2.default.createElement(
                        'strong',
                        null,
                        ActionConfirmationParams.message
                    )
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ActionConfirmationForm;
}(_react2.default.Component);

exports.ActionConfirmationParams = ActionConfirmationParams;
exports.default = ActionConfirmationForm;