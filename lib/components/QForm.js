'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('react-bootstrap/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Alert = require('react-bootstrap/lib/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _atomityCore = require('atomity-core');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

var _QFormControl = require('./QFormControl');

var _QFormControl2 = _interopRequireDefault(_QFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QForm = function (_React$Component) {
    _inherits(QForm, _React$Component);

    function QForm(props) {
        _classCallCheck(this, QForm);

        var _this = _possibleConstructorReturn(this, (QForm.__proto__ || Object.getPrototypeOf(QForm)).call(this, props));

        var self = _this;

        _this.dataProvider = _atomityCore.DataProviderRegistry.get(_this.props.dataProviderName);

        _this.dataProvider.executeAction(self.props.entitiesName, "validators").then(function (result) {
            _this.validators = {};

            if (result) {
                result.forEach(function (validator) {
                    var fn = void 0;
                    _this.validators[validator.fieldName] = {
                        validate: eval("fn = " + validator.validationCode),
                        fieldValidated: false
                    };
                });
            }
        });

        _this.state = {
            showDialog: true,
            validationError: null
        };

        _this.closeDialog = function (ev) {
            self.setState({ showDialog: false });
        };

        _this.cancel = function () {
            self.closeDialog();
            self.props.onDialogClose("'dialogCancel'");
        };

        _this.ok = function () {
            var entityObject = self.props.entityObject;
            if (self.props.transformExp) {
                entityObject = eval(self.props.transformExp);
            }
            self.dataProvider.executeAction(self.props.entitiesName, self.props.okAction, entityObject).then(function (result) {
                self.closeDialog();
                self.props.onDialogClose("'dialogOk'");
                var entitiesToRefresh = [self.props.entitiesName];
                if (self.props.entitiesToRefresh) {
                    entitiesToRefresh = entitiesToRefresh.concat(self.props.entitiesToRefresh);
                }
                (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.updateEntities).send(entitiesToRefresh);
            });
        };
        return _this;
    }

    _createClass(QForm, [{
        key: 'validateField',
        value: function validateField(validationParams) {
            var err = null;
            var validator = this.validators[validationParams.fieldName];
            if (validator) {
                err = validator.validate(validationParams.value);
                validator.fieldValidated = true;
                this.setState({ validationError: err });
            }
            return err;
        }
    }, {
        key: 'validateForm',
        value: function validateForm(includeUnchangedFields) {
            for (var key in this.validators) {
                if (includeUnchangedFields || this.validators[key].fieldValidated) {
                    var err = this.validateField({
                        fieldName: key,
                        value: this.props.entityObject[key]
                    });
                    if (err) {
                        break;
                    }
                }
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(childHandler, event) {
            if (childHandler) {
                childHandler(event);
            }
            var err = this.validateField({
                fieldName: event.bindingField,
                value: event.newValue
            });
            if (!err) {
                this.validateForm();
            }
        }
    }, {
        key: 'renderRecursively',
        value: function renderRecursively(children, index) {
            var _this2 = this;

            if (!children) {
                return;
            }

            if (children.type === _QFormControl2.default) {
                return _react2.default.createElement(
                    _QFormControl2.default,
                    Object.assign({ key: index, inputRef: children.ref }, children.props, { onChange: this.onChange.bind(this, children.props.onChange),
                        entityObject: this.props.entityObject }),
                    children.props.children
                );
            }

            if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) === "object" && children.length !== undefined) {
                return children.map(function (child, index) {
                    return _this2.renderRecursively(child, index);
                });
            }

            if (children.props && children.props.children) {
                return _react2.default.createElement(children.type, Object.assign({ key: index }, children.props), this.renderRecursively(children.props.children));
            }

            if (typeof children === "function") {
                return children(this.props.val);
            }

            return children;
        }
    }, {
        key: 'renderError',
        value: function renderError() {
            if (this.state.validationError) {
                return _react2.default.createElement(
                    _Alert2.default,
                    { bsStyle: 'danger' },
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Error: '
                    ),
                    this.state.validationError
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Modal2.default,
                { show: this.state.showDialog, onHide: this.cancel },
                _react2.default.createElement(
                    _Modal2.default.Header,
                    { closeButton: true },
                    _react2.default.createElement(
                        _Modal2.default.Title,
                        null,
                        this.props.title
                    )
                ),
                _react2.default.createElement(
                    _Modal2.default.Body,
                    null,
                    this.renderError(),
                    this.renderRecursively(this.props.children)
                ),
                _react2.default.createElement(
                    _Modal2.default.Footer,
                    null,
                    _react2.default.createElement(
                        _Button2.default,
                        { onClick: this.cancel },
                        this.props.cancelButtonText
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        { bsStyle: 'primary', disabled: this.state.validationError ? true : false, onClick: this.ok },
                        this.props.okButtonText
                    )
                )
            );
        }
    }]);

    return QForm;
}(_react2.default.Component);

exports.default = QForm;