'use strict';

var Nav = function Nav() {
  return React.createElement(
    'h1',
    null,
    'Welcome to Evently!'
  );
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Event = function (_React$Component) {
  _inherits(Event, _React$Component);

  function Event() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Event);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Event.__proto__ || Object.getPrototypeOf(Event)).call.apply(_ref, [this].concat(args))), _this), _this.formatDateTime = function (dateTimeString) {
      var jsDateTime = new Date(dateTimeString + 'z');
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      };
      return jsDateTime.toLocaleString('en-us', options);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Event, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$event = this.props.event,
          id = _props$event.id,
          name = _props$event.name,
          short_location = _props$event.short_location,
          status = _props$event.status,
          start_date = _props$event.start_date,
          participant_count = _props$event.participant_count,
          registered = _props$event.registered,
          description = _props$event.description;

      return React.createElement(
        'div',
        { className: 'event' },
        React.createElement(
          'header',
          null,
          React.createElement(
            'h4',
            null,
            name
          ),
          React.createElement(
            'h5',
            null,
            short_location
          ),
          React.createElement('hr', null)
        ),
        React.createElement(
          'p',
          null,
          description
        ),
        React.createElement('hr', null),
        React.createElement(
          'section',
          null,
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'When:'
            ),
            this.formatDateTime(start_date)
          ),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Status:'
            ),
            status
          ),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Participants:'
            ),
            participant_count
          ),
          React.createElement(
            'button',
            {
              onClick: function onClick(e) {
                return _this2.props.onClick(id, registered);
              },
              'data-eventid': id,
              className: registered ? 'registered' : undefined
            },
            registered ? 'Unregister' : 'Register'
          )
        )
      );
    }
  }]);

  return Event;
}(React.Component);
var Pagination = function Pagination(props) {
  var _props$pageInfo = props.pageInfo,
      previous = _props$pageInfo.previous,
      next = _props$pageInfo.next,
      page = _props$pageInfo.page,
      pages = _props$pageInfo.pages;

  return React.createElement(
    "div",
    { className: "pagination" },
    React.createElement(
      "button",
      { onClick: function onClick() {
          return props.fetchPage(previous);
        }, disabled: !previous },
      "\u2190 Prev"
    ),
    React.createElement(
      "span",
      null,
      "Page ",
      page,
      " of ",
      pages
    ),
    React.createElement(
      "button",
      { onClick: function onClick() {
          return props.fetchPage(next);
        }, disabled: !next },
      "Next \u2192"
    )
  );
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = function (_React$Component) {
  _inherits(Events, _React$Component);

  function Events(props) {
    _classCallCheck(this, Events);

    var _this = _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, props));

    _this.fetchPage = function (url) {
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (res) {
        var _res$meta = res.meta,
            limit = _res$meta.limit,
            offset = _res$meta.offset,
            next = _res$meta.next,
            previous = _res$meta.previous,
            total_count = _res$meta.total_count;

        _this.setState({
          events: res.objects,
          page: parseInt(offset / limit) + 1,
          pages: Math.ceil(total_count / limit),
          next: next,
          previous: previous,
          url: url
        });
      });
    };

    _this.register = function (eventId, registered) {
      // This takes the current value of event.registered and does a POST
      // or DELETE request
      var method = registered ? 'DELETE' : 'POST';
      var url = 'api/v1/events/' + eventId + '/register/';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        var events = [].concat(_toConsumableArray(_this.state.events));
        events.forEach(function (event, i) {
          if (event.id === res.id) {
            _this.setState(function (prevState) {
              return {
                events: [].concat(_toConsumableArray(prevState.events.slice(0, i)), [res], _toConsumableArray(prevState.events.slice(i + 1)))
              };
            });
          }
        });
      }).catch(function (error) {
        return _this.setState({ error: error });
      });
    };

    _this.state = {
      events: [],
      page: 0,
      pages: 0,
      next: '',
      previous: '',
      url: '',
      error: ''
    };
    return _this;
  }

  _createClass(Events, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchPage('api/v1/events/');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pageInfo = {
        previous: this.state.previous,
        next: this.state.next,
        page: this.state.page,
        pages: this.state.pages
      };
      return React.createElement(
        'div',
        { className: 'center' },
        React.createElement(Pagination, { pageInfo: pageInfo, fetchPage: this.fetchPage }),
        React.createElement(
          'div',
          { className: 'events' },
          this.state.events.map(function (event) {
            return React.createElement(Event, { event: event, key: event.id, onClick: _this2.register });
          })
        ),
        React.createElement(Pagination, { pageInfo: pageInfo, fetchPage: this.fetchPage })
      );
    }
  }]);

  return Events;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'home' },
        React.createElement(Nav, null),
        React.createElement(Events, null)
      );
    }
  }]);

  return Home;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(Home, null), domContainer);
