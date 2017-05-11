'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QRowChecker = function (_Component) {
    _inherits(QRowChecker, _Component);

    function QRowChecker(props) {
        _classCallCheck(this, QRowChecker);

        var _this = _possibleConstructorReturn(this, (QRowChecker.__proto__ || Object.getPrototypeOf(QRowChecker)).call(this, props));

        _this.targetCtrl = _this.props.targetListCtrlName;
        _this.checkBoxClick = function (rowIndex) {
            (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.setRowChecked).send({ targetName: _this.targetCtrl, data: { rowIndex: rowIndex } });
        };
        return _this;
    }

    _createClass(QRowChecker, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { className: 'q-row-checker' },
                _react2.default.createElement('input', { type: 'checkbox', checked: this.props.val.checked, onClick: this.checkBoxClick.bind(this, this.props.val.index) })
            );
        }
    }]);

    return QRowChecker;
}(_react.Component);

exports.default = QRowChecker;