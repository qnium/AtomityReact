'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QAction = require('./QAction');

var _QAction2 = _interopRequireDefault(_QAction);

var _QRowChecker = require('./QRowChecker');

var _QRowChecker2 = _interopRequireDefault(_QRowChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QColumn = function (_Component) {
    _inherits(QColumn, _Component);

    function QColumn(props) {
        _classCallCheck(this, QColumn);

        var _this = _possibleConstructorReturn(this, (QColumn.__proto__ || Object.getPrototypeOf(QColumn)).call(this, props));

        _this.columnChildren = _this.props.columnChildren;
        return _this;
    }

    _createClass(QColumn, [{
        key: 'renderRecursively',
        value: function renderRecursively(children, index) {
            var _this2 = this;

            if (children.type === _QAction2.default) {
                return _react2.default.createElement(_QAction2.default, Object.assign({}, children.props, { className: this.props.isHoverButtons ? "q-row-button" : "", key: index, val: this.props.val }));
            }

            if (children.type === _QRowChecker2.default) {
                return _react2.default.createElement(_QRowChecker2.default, Object.assign({}, children.props, {
                    targetListCtrlName: children.props.targetListCtrlName || this.props.targetListCtrlName,
                    val: this.props.pageItem
                }));
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
        key: 'render',
        value: function render() {
            if (this.columnChildren) {
                return _react2.default.createElement(
                    'td',
                    null,
                    this.renderRecursively(this.columnChildren)
                );
            } else {
                return _react2.default.createElement(
                    'td',
                    null,
                    this.props.val
                );
            }
        }
    }]);

    return QColumn;
}(_react.Component);

exports.default = QColumn;