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

var _atomityFrontendCommon = require('atomity-frontend-common');

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

require('react-datetime/css/react-datetime.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Calendar from 'rc-calendar';
//import 'rc-calendar/dist/rc-calendar.css';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
//import 'react-datepicker/dist/react-datepicker.css';

//import DateTimeField from 'react-bootstrap-datetimepicker';
//import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css';

//import moment from 'moment';

var QDateFilter = function (_Component) {
    _inherits(QDateFilter, _Component);

    function QDateFilter(props) {
        _classCallCheck(this, QDateFilter);

        var _this = _possibleConstructorReturn(this, (QDateFilter.__proto__ || Object.getPrototypeOf(QDateFilter)).call(this, props));

        _this.filterCtrl = new _atomityFrontendCommon.InputFilterController(_this.props);
        var self = _this;

        _this.onChangeFilterValue = function (e) {
            self.filterCtrl.applyFilter(e);
        };
        return _this;
    }

    _createClass(QDateFilter, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                null,
                _react2.default.createElement(
                    _FormGroup2.default,
                    { controlId: this.props.targetListCtrlName + this.props.filteringField + this.props.filteringOperation },
                    _react2.default.createElement(
                        _ControlLabel2.default,
                        null,
                        this.props.title
                    ),
                    _react2.default.createElement(_reactDatetime2.default, { id: this.props.targetListCtrlName + this.props.filteringField + this.props.filteringOperation,
                        onChange: this.onChangeFilterValue,
                        utc: false, timeFormat: 'HH:mm',
                        inputProps: {
                            id: this.props.targetListCtrlName + this.props.filteringField + this.props.filteringOperation,
                            placeholder: this.props.placeholder
                        }
                    })
                )
            );
        }
    }]);

    return QDateFilter;
}(_react.Component);

exports.default = QDateFilter;