'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCkeditorWrapper = require('react-ckeditor-wrapper');

var _reactCkeditorWrapper2 = _interopRequireDefault(_reactCkeditorWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_EDITOR_CONFIG = {};

var QRTEControl = function (_React$Component) {
    _inherits(QRTEControl, _React$Component);

    function QRTEControl(props) {
        _classCallCheck(this, QRTEControl);

        var _this = _possibleConstructorReturn(this, (QRTEControl.__proto__ || Object.getPrototypeOf(QRTEControl)).call(this, props));

        _this.state = {
            controlValue: _this.props.entityObject[_this.props.bindingField] || ""
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(QRTEControl, [{
        key: 'onChange',
        value: function onChange(value) {
            var oldValue = this.state.controlValue;
            this.setState({ controlValue: value });

            if (this.props.onChange) {
                this.props.onChange({
                    oldValue: oldValue,
                    newValue: value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var editorConfig = Object.assign({
                DEFAULT_EDITOR_CONFIG: DEFAULT_EDITOR_CONFIG
            }, this.props.config);
            return _react2.default.createElement(_reactCkeditorWrapper2.default, {
                config: editorConfig,
                value: this.state.controlValue,
                onChange: this.onChange
            });
        }
    }]);

    return QRTEControl;
}(_react2.default.Component);

exports.default = QRTEControl;