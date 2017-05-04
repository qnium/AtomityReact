'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DropdownButton = require('react-bootstrap/lib/DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _atomityCore = require('atomity-core');

var _QAction = require('./QAction');

var _QAction2 = _interopRequireDefault(_QAction);

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QGroupActions = function (_Component) {
    _inherits(QGroupActions, _Component);

    function QGroupActions(props) {
        _classCallCheck(this, QGroupActions);

        var _this = _possibleConstructorReturn(this, (QGroupActions.__proto__ || Object.getPrototypeOf(QGroupActions)).call(this, props));

        var self = _this;
        _this.targetCtrl = _this.props.targetListCtrlName;

        _this.state = {
            allChecked: false,
            actionsAllowed: false,
            checkedItems: []
        };

        _this.ctrlStateListener = function (target) {
            if (!target.actionInProgress) {
                var checkedItems = target.pageData.filter(function (item) {
                    return item.checked;
                }).map(function (item) {
                    return item.data;
                });
                var checkedCounter = checkedItems.length;
                var allChecked = checkedCounter === target.pageData.filter(function (item) {
                    return !item.dummy;
                }).length && checkedCounter > 0;
                self.setState({
                    allChecked: allChecked,
                    actionsAllowed: checkedCounter > 0,
                    checkedItems: checkedItems
                });
            }
        };
        (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.stateChanged).handle(function (event) {
            if (event.sourceName === _this.targetCtrl) {
                _this.ctrlStateListener(event.data);
            }
        });

        _this.checkBoxClick = function () {
            (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.setAllChecked).send({ targetName: self.targetCtrl, data: { newState: !self.state.allChecked } });
        };
        return _this;
    }

    _createClass(QGroupActions, [{
        key: 'renderMenuItems',
        value: function renderMenuItems() {
            var _this2 = this;

            return _react2.default.Children.map(this.props.children.props.children, function (menuItem, index) {
                var actionTemplate = void 0;

                if (menuItem.type === _QAction2.default) {
                    actionTemplate = _react2.default.createElement(
                        _QAction2.default,
                        Object.assign({}, menuItem.props, { val: _this2.state.checkedItems, targetListCtrlName: _this2.targetCtrl }),
                        menuItem.props.title
                    );
                } else {
                    return null;
                    actionTemplate = menuItem;
                }

                return _react2.default.createElement(
                    _MenuItem2.default,
                    { key: index, disabled: !_this2.state.actionsAllowed },
                    actionTemplate
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _ButtonGroup2.default,
                null,
                _react2.default.createElement(
                    _Button2.default,
                    { bsSize: 'small', onClick: this.checkBoxClick },
                    _react2.default.createElement('input', { type: 'checkbox', checked: this.state.allChecked })
                ),
                _react2.default.createElement(
                    _DropdownButton2.default,
                    { id: 'input-dropdown-addon', title: '' },
                    this.renderMenuItems()
                )
            );
        }
    }]);

    return QGroupActions;
}(_react.Component);

exports.default = QGroupActions;