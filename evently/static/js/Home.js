'use strict';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <a href="/locations">Locations</a>
      </nav>
    );
  }
}

const Event = props => {
  const {
    name,
    status,
    start_date,
    participant_count,
    registered,
    description,
  } = props.event;

  return (
    <div>
      <h4>{name}</h4>
      <p>{description}</p>
      <section>
        <p>Start date and time: {start_date}</p>
        <p>Status: {status}</p>
        <p>Participants: {participant_count}</p>
        <button>{registered ? 'Unregister' : 'Register'}</button>
      </section>
    </div>
  );
};

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      numPages: 0,
      next: '',
      previous: '',
    };
  }

  componentDidMount() {
    this.fetchPage('api/v1/events');
  }

  fetchPage(page) {
    fetch(page)
      .then(res => res.json())
      .then(res => {
        const { limit, next, previous, total_count } = res.meta;
        this.setState({
          events: res.objects,
          numPages: total_count % limit,
          next,
          previous,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.events.map(event => (
          <Event event={event} />
        ))}
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Events />
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<Home />, domContainer);
