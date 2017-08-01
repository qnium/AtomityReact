'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

require('react-quill/dist/quill.snow.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_EDITOR_CONFIG = {
    modules: {
        toolbar: [[{ 'header': [1, 2, 3, 4, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ 'font': [] }], [{ 'align': 'left' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link', 'image'], ['clean']]
    },
    formats: ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']
};

var QRTEControl = function (_Component) {
    _inherits(QRTEControl, _Component);

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
            var _props = this.props,
                modules = _props.modules,
                formats = _props.formats,
                placeholder = _props.placeholder;

            var activeModules = modules ? modules : DEFAULT_EDITOR_CONFIG.modules;
            var activeFormats = formats ? formats : DEFAULT_EDITOR_CONFIG.formats;

            return _react2.default.createElement(_reactQuill2.default, {
                theme: 'snow',
                modules: activeModules,
                formats: activeFormats,
                placeholder: placeholder,
                value: this.state.controlValue,
                onChange: this.onChange
            });
        }
    }]);

    return QRTEControl;
}(_react.Component);

exports.default = QRTEControl;