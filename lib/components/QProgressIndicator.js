'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _atomityCore = require('atomity-core');

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QProgressIndicator = function (_Component) {
    _inherits(QProgressIndicator, _Component);

    function QProgressIndicator(props) {
        _classCallCheck(this, QProgressIndicator);

        var _this = _possibleConstructorReturn(this, (QProgressIndicator.__proto__ || Object.getPrototypeOf(QProgressIndicator)).call(this, props));

        var self = _this;
        _this.targetCtrl = _this.props.targetListCtrlName;
        _this.state = {
            inProgress: false
        };

        _this.ctrlStateListener = function (target) {
            self.setState({ inProgress: target.actionInProgress });
        };
        return _this;
    }

    _createClass(QProgressIndicator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _qniumEvents2.default)(_atomityCore.ListControllerEvents.stateChanged).handle(function (event) {
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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Glyphicon2.default,
                { className: 'pull-right', title: this.props.title, glyph: 'repeat', style: { color: this.state.inProgress ? '#a0a0a0' : null } },
                this.props.children
            );
        }
    }]);

    return QProgressIndicator;
}(_react.Component);

exports.default = QProgressIndicator;