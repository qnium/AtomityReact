'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DialogResult = undefined;

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

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _DialogService = require('../services/DialogService');

var _DialogService2 = _interopRequireDefault(_DialogService);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

var _QFormControl = require('./QFormControl');

var _QFormControl2 = _interopRequireDefault(_QFormControl);

var _ActionConfirmationForm = require('../dialogs/ActionConfirmationForm');

var _ActionConfirmationForm2 = _interopRequireDefault(_ActionConfirmationForm);

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

        if (_this.props.entitiesName) {
            _this.dataProvider = _atomityFrontendCommon.DataProviderRegistry.get(_this.props.dataProviderName);

            _this.validationCtrl = new _atomityFrontendCommon.ValidationController({
                dataProviderName: _this.props.dataProviderName,
                entitiesName: _this.props.entitiesName
            });
        }

        _this.state = {
            showDialog: true,
            validationError: null,
            actionAllowed: true,
            actionInProgress: false
        };

        _this.closeDialog = function (ev) {
            self.setState({ showDialog: false });
        };

        _this.cancel = function () {
            self.closeDialog();
            self.props.onDialogClose({ dialogResult: _DialogService.DialogResult.cancel });
        };

        _this.doAction = function () {
            if (self.props.entitiesName && self.props.okAction) {
                var entityObject = self.props.entityObject;
                if (self.props.useArray === true) {
                    entityObject = [self.props.entityObject];
                }
                self.setState({ validationError: null, actionInProgress: true, actionAllowed: false });
                self.dataProvider.executeAction(self.props.entitiesName, self.props.okAction, entityObject).then(function (result) {
                    self.closeDialog();
                    self.props.onDialogClose({ dialogResult: _DialogService.DialogResult.ok, entityObject: self.props.entityObject });
                    var entitiesToRefresh = [self.props.entitiesName];
                    if (self.props.entitiesToRefresh) {
                        entitiesToRefresh = entitiesToRefresh.concat(self.props.entitiesToRefresh);
                    }
                    (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.updateEntities).send(entitiesToRefresh);
                }).catch(function (err) {
                    var errorMessage = null;
                    if (err.errorCode != -177) {
                        self.dataProvider.errorHandler(err.error);
                    } else {
                        errorMessage = err.error;
                    }

                    self.setState({
                        validationError: errorMessage,
                        // eslint-disable-next-line
                        actionAllowed: err.errorCode == -177 ? false : true,
                        actionInProgress: false
                    });
                });
            } else {
                self.closeDialog();
                self.props.onDialogClose({ dialogResult: _DialogService.DialogResult.ok });
            }
        };

        _this.ok = function () {
            if (self.props.disableConfirmation === true) {
                self.doAction();
            } else {
                _DialogService2.default.showDialog(_ActionConfirmationForm2.default).then(function (result) {
                    if (result.dialogResult === _DialogService.DialogResult.ok) {
                        self.doAction();
                    }
                });
            }
        };
        return _this;
    }

    _createClass(QForm, [{
        key: 'onChange',
        value: function onChange(childHandler, event) {
            if (childHandler) {
                childHandler(event);
            }

            var err = this.validationCtrl.validateField({
                entityObject: this.props.entityObject,
                fieldName: event.bindingField,
                validateOtherFields: true,
                includeUnchangedFields: false
            });

            this.setState({ validationError: err, actionAllowed: err == null });
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
                return children(this.props.entityObject);
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
        key: 'renderOverlay',
        value: function renderOverlay() {
            if (this.state.actionInProgress) {
                return _react2.default.createElement(
                    'div',
                    { className: 'q-form-overlay text-center' },
                    _react2.default.createElement(
                        'div',
                        { className: 'q-center' },
                        _react2.default.createElement(_reactFontawesome2.default, { name: 'refresh', size: '3x', spin: true })
                    )
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
                this.renderOverlay(),
                _react2.default.createElement(
                    'div',
                    null,
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
                            { bsStyle: 'primary', disabled: !this.state.actionAllowed, onClick: this.ok },
                            this.state.actionInProgress ? _react2.default.createElement(_reactFontawesome2.default, { name: 'spinner', spin: true }) : null,
                            this.props.okButtonText
                        )
                    )
                )
            );
        }
    }]);

    return QForm;
}(_react2.default.Component);

exports.DialogResult = _DialogService.DialogResult;
exports.default = QForm;