'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _atomityFrontendCommon = require('atomity-frontend-common');

var _Pagination = require('react-bootstrap/lib/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _qniumEvents = require('qnium-events');

var _qniumEvents2 = _interopRequireDefault(_qniumEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QPagination = function (_Component) {
    _inherits(QPagination, _Component);

    function QPagination(props) {
        _classCallCheck(this, QPagination);

        var _this = _possibleConstructorReturn(this, (QPagination.__proto__ || Object.getPrototypeOf(QPagination)).call(this, props));

        var self = _this;
        _this.targetCtrl = _this.props.targetListCtrlName;
        _this.maxButtons = _this.props.maxButtons || 5;
        _this.state = {
            activePage: 1,
            totalPages: 1,
            nextPageAvailable: false,
            prevPageAvailable: false
        };

        _this.ctrlStateListener = function (target) {
            if (!target.actionInProgress) {
                self.setState({
                    activePage: target.currentPage,
                    totalPages: target.totalPages,
                    nextPageAvailable: target.nextPageAvailable,
                    prevPageAvailable: target.prevPageAvailable
                });
            }
        };

        _this.handleSelect = function (eventKey) {
            (0, _qniumEvents2.default)(_atomityFrontendCommon.ListControllerEvents.selectPage).send({ targetName: _this.targetCtrl, data: eventKey });
        };
        return _this;
    }

    _createClass(QPagination, [{
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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Pagination2.default, {
                prev: true,
                next: true,
                first: true,
                last: true,
                items: this.state.totalPages,
                maxButtons: this.maxButtons,
                activePage: this.state.activePage,
                onSelect: this.handleSelect,
                ellipsis: this.props.ellipsis === undefined ? true : this.props.ellipsis,
                boundaryLinks: this.props.boundaryLinks === undefined ? true : this.props.boundaryLinks
            });
        }
    }]);

    return QPagination;
}(_react.Component);

exports.default = QPagination;