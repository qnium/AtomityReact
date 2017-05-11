'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _QGroupActions = require('./QGroupActions');

var _QGroupActions2 = _interopRequireDefault(_QGroupActions);

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QTableHeader = function (_Component) {
    _inherits(QTableHeader, _Component);

    function QTableHeader(props) {
        _classCallCheck(this, QTableHeader);

        var _this = _possibleConstructorReturn(this, (QTableHeader.__proto__ || Object.getPrototypeOf(QTableHeader)).call(this, props));

        var self = _this;
        _this.targetCtrl = _this.props.targetListCtrlName;
        _this.state = {
            sortingField: undefined,
            sortingValue: undefined
        };

        _this.ctrlStateListener = function (target) {
            if (!target.actionInProgress) {
                self.setState({
                    sortingField: target.currentSort.field,
                    sortingValue: target.currentSort.value
                });
            }
        };

        _this.headerClick = function (header) {
            if (header.props.sortingField) {
                var sortParams = {
                    sortingField: header.props.sortingField
                };
                (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.sort).send({ targetName: _this.targetCtrl, data: sortParams });
            }
        };
        return _this;
    }

    _createClass(QTableHeader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.stateChanged).handle(function (event) {
                if (event.sourceName === _this2.targetCtrl) {
                    _this2.ctrlStateListener(event.data);
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //window.QEventEmitter.removeListener(this.ctrlStateListener);
        }
    }, {
        key: 'renderSortIcon',
        value: function renderSortIcon() {
            if (this.state.sortingField !== undefined && this.state.sortingField === this.props.sortingField) {
                var icon = this.state.sortingValue ? "triangle-bottom" : "triangle-top";
                return _react2.default.createElement(_Glyphicon2.default, { glyph: icon });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            if (this.props.children && this.props.children.type === _QGroupActions2.default) {
                return _react2.default.createElement(_QGroupActions2.default, Object.assign({}, this.props, { targetListCtrlName: this.props.children.props.targetListCtrlName || this.targetCtrl }));
            } else {
                return this.props.children;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'th',
                { onClick: this.headerClick.bind(this, this) },
                this.renderChildren(),
                this.renderSortIcon()
            );
        }
    }]);

    return QTableHeader;
}(_react.Component);

exports.default = QTableHeader;