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

var _atomityCore = require('atomity-core');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

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
            if (self.props.workflow) {
                self.props.workflow.start(self.props.val);
                return;
            }

            if (self.props.isCustomAction === true) {
                (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.customAction).send({ targetName: self.props.targetListCtrlName, data: { action: self.props.action, payload: self.props.val } });
            } else {
                (0, _qniumEvents2.default)(self.props.action).send({ targetName: self.props.targetListCtrlName, data: self.props.val });
            }
        };
        return _this;
    }

    _createClass(QAction, [{
        key: 'render',
        value: function render() {
            var actionTemplate = void 0;

            if (this.props.children) {
                actionTemplate = _react2.default.createElement(
                    'span',
                    { onClick: this.onClick },
                    this.props.children
                );
            } else {
                actionTemplate = _react2.default.createElement(
                    _Glyphicon2.default,
                    { title: this.props.title, glyph: this.props.icon, onClick: this.onClick },
                    this.props.children
                );
            }
            return _react2.default.createElement(
                'span',
                { className: 'q-action' },
                actionTemplate
            );
        }
    }]);

    return QAction;
}(_react.Component);

exports.default = QAction;