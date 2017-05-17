'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QSelectFilter = function (_Component) {
    _inherits(QSelectFilter, _Component);

    function QSelectFilter(props) {
        _classCallCheck(this, QSelectFilter);

        var _this = _possibleConstructorReturn(this, (QSelectFilter.__proto__ || Object.getPrototypeOf(QSelectFilter)).call(this, props));

        var self = _this;

        var listCtrlParams = Object.assign({}, _this.props);
        _this.filterCtrl = new _atomityFrontendCommon.SelectFilterController(listCtrlParams);

        _this.state = {
            options: []
        };

        _this.onChangeFilterValue = function (e) {
            _this.filterCtrl.applyFilter(e.target.value);
        };

        if (_this.props.entitiesName) {
            (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.stateChanged).handle(function (event) {
                if (event.data.ctrlName === self.filterCtrl.listCtrl.ctrlName && self.props.entitiesName === event.data.entitiesName && !event.data.actionInProgress) {
                    self.setState({
                        options: event.data.pageData.map(function (item) {
                            return item.data;
                        })
                    });
                }
            });
        }
        return _this;
    }

    _createClass(QSelectFilter, [{
        key: 'renderOptions',
        value: function renderOptions() {
            var _this2 = this;

            return this.state.options.map(function (item, index) {
                return _react2.default.createElement(
                    'option',
                    { key: index, value: item[_this2.props.valueField || "id"] },
                    item[_this2.props.displayField || "name"]
                );
            }, this);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                null,
                _react2.default.createElement(
                    _FormGroup2.default,
                    { controlId: "SelectFilter" + this.props.targetListCtrlName + this.props.filteringField },
                    _react2.default.createElement(
                        _ControlLabel2.default,
                        null,
                        this.props.title
                    ),
                    _react2.default.createElement(
                        _FormControl2.default,
                        { id: "SelectFilter" + this.props.targetListCtrlName + this.props.filteringField, componentClass: 'select', defaultValue: '', onChange: this.onChangeFilterValue },
                        this.props.children,
                        this.renderOptions()
                    )
                )
            );
        }
    }]);

    return QSelectFilter;
}(_react.Component);

exports.default = QSelectFilter;