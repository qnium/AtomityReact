'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _atomityCore = require('atomity-core');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QSelectControl = function (_React$Component) {
    _inherits(QSelectControl, _React$Component);

    function QSelectControl(props) {
        _classCallCheck(this, QSelectControl);

        var _this = _possibleConstructorReturn(this, (QSelectControl.__proto__ || Object.getPrototypeOf(QSelectControl)).call(this, props));

        _this.state = {
            controlValue: _this.props.entityObject[_this.props.bindingField],
            selectOptions: []
        };
        _this.selectCtrlInitialized = false;
        return _this;
    }

    _createClass(QSelectControl, [{
        key: 'onChange',
        value: function onChange(event) {
            var _this2 = this;

            var oldValue = this.state.controlValue;
            this.setState({ controlValue: event.target.value });

            if (this.props.onChange) {
                var selectedItem = this.state.selectOptions.find(function (item) {
                    return item[_this2.props.valueField] == event.target.value;
                });
                this.props.onChange({
                    bindingField: this.props.bindingField,
                    oldValue: oldValue,
                    newValue: event.target.value,
                    selectedItem: selectedItem
                });
            }
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var _this3 = this;

            return this.state.selectOptions.map(function (item, index) {
                return _react2.default.createElement(
                    'option',
                    { key: index, value: item[_this3.props.valueField] },
                    item[_this3.props.displayField]
                );
            }, this);
        }
    }, {
        key: 'initSelectCtrl',
        value: function initSelectCtrl() {
            if (!this.listCtrl) {
                this.listCtrl = new _atomityCore.ListController({
                    entitiesName: this.props.relatedEntitiesName,
                    readAction: this.props.readAction,
                    pageDataLength: 0,
                    dataProviderName: this.props.dataProviderName
                });
                var self = this;

                this.eventRemover = (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.stateChanged).handle(function (event) {
                    if (event.data.ctrlName === self.listCtrl.ctrlName && self.props.relatedEntitiesName === event.data.entitiesName && !event.data.actionInProgress) {
                        self.setState({
                            selectOptions: event.data.pageData.map(function (item) {
                                return item.data;
                            })
                        });

                        if (!self.selectCtrlInitialized && event.data.pageData.length > 0 && self.props.onInit) {
                            self.selectCtrlInitialized = true;
                            self.props.onInit(self.state.selectOptions.find(function (item) {
                                return item[self.props.valueField] == self.state.controlValue;
                            }));
                        }
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.eventRemover) {
                this.eventRemover();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.initSelectCtrl();
            return _react2.default.createElement(
                _FormControl2.default,
                { id: this.props.id, inputRef: this.props.inputRef, componentClass: 'select', value: this.state.controlValue, onChange: this.onChange.bind(this) },
                this.props.children,
                this.renderOptions()
            );
        }
    }]);

    return QSelectControl;
}(_react2.default.Component);

exports.default = QSelectControl;