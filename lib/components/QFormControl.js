'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QFormControl = function (_React$Component) {
    _inherits(QFormControl, _React$Component);

    function QFormControl() {
        _classCallCheck(this, QFormControl);

        return _possibleConstructorReturn(this, (QFormControl.__proto__ || Object.getPrototypeOf(QFormControl)).apply(this, arguments));
    }

    _createClass(QFormControl, [{
        key: 'onChange',
        value: function onChange(event) {
            this.props.entityObject[this.props.bindingField] = event.newValue;
            if (this.props.onChange) {
                this.props.onChange(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(this.props.type, Object.assign({}, this.props, { onChange: this.onChange.bind(this) }), this.props.children);
        }
    }]);

    return QFormControl;
}(_react2.default.Component);

exports.default = QFormControl;