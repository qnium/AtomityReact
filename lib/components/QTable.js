'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('react-bootstrap/lib/Table');

var _Table2 = _interopRequireDefault(_Table);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _QTableHeader = require('./QTableHeader');

var _QTableHeader2 = _interopRequireDefault(_QTableHeader);

var _QColumn = require('./QColumn');

var _QColumn2 = _interopRequireDefault(_QColumn);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QTable = function (_Component) {
    _inherits(QTable, _Component);

    function QTable(props) {
        _classCallCheck(this, QTable);

        var _this = _possibleConstructorReturn(this, (QTable.__proto__ || Object.getPrototypeOf(QTable)).call(this, props));

        var self = _this;

        _this.state = {
            pageData: [],
            actionInProgress: false
        };

        _this.listCtrl = new _atomityFrontendCommon.ListController(_this.props);

        _this.ctrlStateListener = function (target) {
            self.setState({
                pageData: target.pageData,
                actionInProgress: target.actionInProgress
            });
        };
        (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.stateChanged).handle(function (event) {
            if (event.sourceName === _this.listCtrl.ctrlName) {
                _this.ctrlStateListener(event.data);
            }
        });

        if (_this.props.children) {

            var childrenArray = void 0;

            if (_this.props.children.length !== undefined) {
                childrenArray = _this.props.children;
            } else {
                childrenArray = [_this.props.children];
            }

            var tableHeader = [];

            childrenArray.forEach(function (item) {
                if (item.type === _QTableHeader2.default) tableHeader.push(item);
                if (item.length) tableHeader = tableHeader.concat(item.filter(function (el) {
                    return el.type === _QTableHeader2.default;
                }));
            });

            _this.headerTemplate = _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    tableHeader.map(function (headerItem, index) {
                        return _react2.default.createElement(_QTableHeader2.default, Object.assign({ key: index
                        }, headerItem.props, {
                            targetListCtrlName: headerItem.props.targetListCtrlName || _this.listCtrl.ctrlName
                        }));
                    })
                )
            );

            _this.columns = [];

            childrenArray.forEach(function (item) {
                if (item.type === _QColumn2.default) _this.columns.push(item);
                if (item.length) _this.columns = _this.columns.concat(item.filter(function (el) {
                    return el.type === _QColumn2.default;
                }));
            });
        }
        return _this;
    }

    _createClass(QTable, [{
        key: 'renderRow',
        value: function renderRow(pageItem) {
            if (this.columns) {
                return this.columns.map(function (column, index) {
                    if (column.type === _QColumn2.default) {
                        if (pageItem.dummy === true) {
                            return _react2.default.createElement(
                                'td',
                                { key: index, style: this.props.dummyStyle || { visibility: "hidden" } },
                                '\xA0'
                            );
                        } else {
                            return _react2.default.createElement(_QColumn2.default, Object.assign({}, column.props, { key: index, val: column.props.fieldName ? pageItem.data[column.props.fieldName] : pageItem.data,
                                pageItem: pageItem, columnChildren: column.props.children,
                                targetListCtrlName: column.props.targetListCtrlName || this.listCtrl.ctrlName
                            }));
                        }
                    } else {
                        return null;
                    }
                }, this);
            }
        }
    }, {
        key: 'renderOverlay',
        value: function renderOverlay() {
            if (this.state.actionInProgress) {
                return _react2.default.createElement(
                    'div',
                    { className: 'q-overlay text-center' },
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
            return (
                //<div style={{position: "relative"}}>
                _react2.default.createElement(
                    'div',
                    { className: 'q-table' },
                    _react2.default.createElement(
                        _Table2.default,
                        null,
                        this.headerTemplate,
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.state.pageData.map(function (pageItem, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    this.renderRow(pageItem)
                                );
                            }, this)
                        )
                    ),
                    this.renderOverlay()
                )
            );
        }
    }]);

    return QTable;
}(_react.Component);

exports.default = QTable;