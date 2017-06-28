'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _reactMaskedinput = require('react-maskedinput');

var _reactMaskedinput2 = _interopRequireDefault(_reactMaskedinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QMaskedInputControl = function (_React$Component) {
    _inherits(QMaskedInputControl, _React$Component);

    function QMaskedInputControl(props) {
        _classCallCheck(this, QMaskedInputControl);

        var _this = _possibleConstructorReturn(this, (QMaskedInputControl.__proto__ || Object.getPrototypeOf(QMaskedInputControl)).call(this, props));

        _this.state = {
            controlValue: _this.props.entityObject[_this.props.bindingField] || ""
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(QMaskedInputControl, [{
        key: 'onChange',
        value: function onChange(event) {
            var oldValue = this.state.controlValue;
            this.setState({ controlValue: event.target.value });

            if (this.props.onChange) {
                this.props.onChange({
                    oldValue: oldValue,
                    newValue: event.target.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                mask = _props.mask,
                inputRef = _props.inputRef,
                placeholder = _props.placeholder,
                placeholderChar = _props.placeholderChar;

            return _react2.default.createElement(_reactMaskedinput2.default, {
                className: 'form-control',
                mask: mask,
                id: id,
                placeholder: placeholder,
                placeholderChar: placeholderChar,
                value: this.state.controlValue,
                onChange: this.onChange
            });
        }
    }]);

    return QMaskedInputControl;
}(_react2.default.Component);

exports.default = QMaskedInputControl;