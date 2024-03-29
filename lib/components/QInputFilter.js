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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QInputFilter = function (_Component) {
    _inherits(QInputFilter, _Component);

    function QInputFilter(props) {
        _classCallCheck(this, QInputFilter);

        var _this = _possibleConstructorReturn(this, (QInputFilter.__proto__ || Object.getPrototypeOf(QInputFilter)).call(this, props));

        _this.filterCtrl = null;


        _this.state = {
            value: props.value
        };

        _this.filterCtrl = new _atomityFrontendCommon.InputFilterController(_this.props);

        _this.onChangeFilterValue = function (e) {
            _this.setState({ value: e.target.value });
            _this.filterCtrl.applyFilter(e.target.value);
        };
        return _this;
    }

    _createClass(QInputFilter, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;

            this.setState({ value: value });
            if (typeof value !== 'undefined' && value !== null) {
                this.filterCtrl.applyFilter(value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _FormGroup2.default,
                { controlId: this.props.targetListCtrlName + this.props.filteringField },
                _react2.default.createElement(
                    _ControlLabel2.default,
                    null,
                    this.props.title
                ),
                _react2.default.createElement(_FormControl2.default, {
                    id: this.props.targetListCtrlName + this.props.filteringField,
                    type: 'text',
                    placeholder: this.props.placeholder,
                    value: this.state.value,
                    onChange: this.onChangeFilterValue
                })
            );
        }
    }]);

    return QInputFilter;
}(_react.Component);

exports.default = QInputFilter;