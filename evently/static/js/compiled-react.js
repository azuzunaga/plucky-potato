'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'nav',
        null,
        React.createElement(
          'a',
          { href: '/locations' },
          'Locations'
        )
      );
    }
  }]);

  return Nav;
}(React.Component);

var Event = function Event(props) {
  var _props$event = props.event,
      name = _props$event.name,
      status = _props$event.status,
      start_date = _props$event.start_date,
      participant_count = _props$event.participant_count,
      registered = _props$event.registered,
      description = _props$event.description;


  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      name
    ),
    React.createElement(
      'p',
      null,
      description
    ),
    React.createElement(
      'section',
      null,
      React.createElement(
        'p',
        null,
        'Start date and time: ',
        start_date
      ),
      React.createElement(
        'p',
        null,
        'Status: ',
        status
      ),
      React.createElement(
        'p',
        null,
        'Participants: ',
        participant_count
      ),
      React.createElement(
        'button',
        null,
        registered ? 'Unregister' : 'Register'
      )
    )
  );
};

var Events = function (_React$Component2) {
  _inherits(Events, _React$Component2);

  function Events(props) {
    _classCallCheck(this, Events);

    var _this2 = _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, props));

    _this2.state = {
      events: [],
      numPages: 0,
      next: '',
      previous: ''
    };
    return _this2;
  }

  _createClass(Events, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchPage('api/v1/events');
    }
  }, {
    key: 'fetchPage',
    value: function fetchPage(page) {
      var _this3 = this;

      fetch(page).then(function (res) {
        return res.json();
      }).then(function (res) {
        var _res$meta = res.meta,
            limit = _res$meta.limit,
            next = _res$meta.next,
            previous = _res$meta.previous,
            total_count = _res$meta.total_count;

        _this3.setState({
          events: res.objects,
          numPages: total_count % limit,
          next: next,
          previous: previous
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.events.map(function (event) {
          return React.createElement(Event, { event: event });
        })
      );
    }
  }]);

  return Events;
}(React.Component);

var Home = function (_React$Component3) {
  _inherits(Home, _React$Component3);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Nav, null),
        React.createElement(Events, null)
      );
    }
  }]);

  return Home;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(Home, null), domContainer);
