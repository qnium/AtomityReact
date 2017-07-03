'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNumericInput = require('react-numeric-input');

var _reactNumericInput2 = _interopRequireDefault(_reactNumericInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NUMERIC_INPUT_PROP_NAMES = ['placeholder', 'min', 'max', 'step', 'precision', 'parse', 'format', 'disabled', 'readOnly', 'style', 'size', 'mobile'];

var QNumericInputControl = function (_Component) {
    _inherits(QNumericInputControl, _Component);

    function QNumericInputControl(props) {
        _classCallCheck(this, QNumericInputControl);

        var _this = _possibleConstructorReturn(this, (QNumericInputControl.__proto__ || Object.getPrototypeOf(QNumericInputControl)).call(this, props));

        _this.state = {
            controlValue: _this.props.entityObject[_this.props.bindingField] || ""
        };
        return _this;
    }

    _createClass(QNumericInputControl, [{
        key: 'onChange',
        value: function onChange(newValue) {
            var oldValue = this.state.controlValue;
            this.setState({ controlValue: newValue });

            if (this.props.onChange) {
                this.props.onChange({
                    oldValue: oldValue,
                    newValue: newValue
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var inputProps = {};
            NUMERIC_INPUT_PROP_NAMES.forEach(function (n) {
                return inputProps[n] = _this2.props[n];
            });

            return _react2.default.createElement(_reactNumericInput2.default, Object.assign({
                id: this.props.id,
                className: 'form-control',
                value: this.state.controlValue,
                onChange: this.onChange.bind(this)
            }, inputProps));
        }
    }]);

    return QNumericInputControl;
}(_react.Component);

exports.default = QNumericInputControl;