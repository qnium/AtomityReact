'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ckeditor = require('ckeditor');

var _ckeditor2 = _interopRequireDefault(_ckeditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import CKEditor from 'react-ckeditor-wrapper';

var DEFAULT_EDITOR_CONFIG = {};

var CKEditor = function (_Component) {
    _inherits(CKEditor, _Component);

    function CKEditor(props) {
        _classCallCheck(this, CKEditor);

        var _this = _possibleConstructorReturn(this, (CKEditor.__proto__ || Object.getPrototypeOf(CKEditor)).call(this, props));

        _this.state = {
            value: props.value,
            config: props.config || {},
            onChange: props.onChange
        };
        return _this;
    }

    _createClass(CKEditor, [{
        key: 'handleChange',
        value: function handleChange() {
            this.state.onChange(this.state.value);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            /*if (!window.CKEDITOR) {
                console.error("CKEditor not found");
                return;
            }*/

            this.instance = _ckeditor2.default.appendTo(_reactDom2.default.findDOMNode(this), this.state.config, this.state.value);
            this.instance.on("change", function () {
                _this2.state.value = _this2.instance.getData();
                _this2.handleChange();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (!this.instance) {
                return;
            }

            if (this.state.value !== props.value) {
                // setData will move the cursor to the begining of the input
                this.instance.setData(props.value);
            }

            if (props.config && this.state.config !== props.config) {
                if ("readOnly" in props.config) this.instance.setReadOnly(props.config.readOnly);
            }

            this.setState({
                value: props.value,
                config: props.config || {},
                onChange: props.onChange
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return CKEditor;
}(Component);

var QRTEControl = function (_React$Component) {
    _inherits(QRTEControl, _React$Component);

    function QRTEControl(props) {
        _classCallCheck(this, QRTEControl);

        var _this3 = _possibleConstructorReturn(this, (QRTEControl.__proto__ || Object.getPrototypeOf(QRTEControl)).call(this, props));

        _this3.state = {
            controlValue: _this3.props.entityObject[_this3.props.bindingField] || ""
        };

        _this3.onChange = _this3.onChange.bind(_this3);
        return _this3;
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
            return _react2.default.createElement(CKEditor, {
                config: editorConfig,
                value: this.state.controlValue,
                onChange: this.onChange
            });
        }
    }]);

    return QRTEControl;
}(_react2.default.Component);

exports.default = QRTEControl;