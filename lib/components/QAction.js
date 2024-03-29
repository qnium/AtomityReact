'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _Modal = require('react-bootstrap/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DialogService = require('../services/DialogService');

var _DialogService2 = _interopRequireDefault(_DialogService);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _ActionConfirmationForm = require('../dialogs/ActionConfirmationForm');

var _ActionConfirmationForm2 = _interopRequireDefault(_ActionConfirmationForm);

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QAction = function (_Component) {
    _inherits(QAction, _Component);

    function QAction(props) {
        _classCallCheck(this, QAction);

        var _this = _possibleConstructorReturn(this, (QAction.__proto__ || Object.getPrototypeOf(QAction)).call(this, props));

        var self = _this;

        _this.onClick = function () {
            if (self.props.disabled === true) {
                return;
            }

            if (self.props.workflow) {
                self.props.workflow.start(self.props.val, self.props.workflowParams);
                return;
            }

            if (self.props.useConfirmation === true) {
                _DialogService2.default.showDialog(_ActionConfirmationForm2.default).then(function (result) {
                    if (result.dialogResult === _DialogService.DialogResult.ok) {
                        self.doAction();
                    }
                });
            } else {
                self.doAction();
            }
        };
        return _this;
    }

    _createClass(QAction, [{
        key: 'doAction',
        value: function doAction() {
            if (this.props.isCustomAction === true) {
                (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.customAction).send({ targetName: this.props.targetListCtrlName, data: { action: this.props.action, data: this.props.val } });
            } else {
                (0, _qniumEvents2.default)(this.props.action).send({ targetName: this.props.targetListCtrlName, data: this.props.val });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var actionTemplate = void 0;

            if (this.props.children) {
                actionTemplate = _react2.default.createElement(
                    'span',
                    { className: (0, _classnames2.default)(this.props.className, this.props.disabled === true ? "q-action-disabled" : "q-action"), onClick: this.onClick },
                    this.props.children
                );
            } else {
                actionTemplate = _react2.default.createElement(
                    _Glyphicon2.default,
                    { className: (0, _classnames2.default)(this.props.className, this.props.disabled === true ? "q-action-disabled" : "q-action"), title: this.props.title, glyph: this.props.icon, onClick: this.onClick },
                    this.props.children
                );
            }
            return actionTemplate;
        }
    }]);

    return QAction;
}(_react.Component);

exports.default = QAction;