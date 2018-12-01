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

class Event extends React.Component {
  render() {
    const {
      id,
      name,
      status,
      start_date,
      participant_count,
      registered,
      description,
    } = this.props.event;
    return (
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
        <section>
          <p>Start date and time: {start_date}</p>
          <p>Status: {status}</p>
          <p>Participants: {participant_count}</p>
          <button
            onClick={() => this.props.onClick(id, registered)}
            data-eventid={id}
          >
            {registered ? 'Unregister' : 'Register'}
          </button>
        </section>
      </div>
    );
  }
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      page: 0,
      pages: 0,
      next: '',
      previous: '',
      url: '',
      error: '',
    };
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.fetchPage('api/v1/events');
  }

  fetchPage(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const { limit, offset, next, previous, total_count } = res.meta;
        this.setState({
          events: res.objects,
          page: parseInt(offset / limit) + 1,
          pages: total_count % limit,
          next,
          previous,
          url,
        });
      });
  }

  register(eventId, registered) {
    // This takes the current value of event.registered and does a POST
    // or DELETE request
    const method = registered ? 'DELETE' : 'POST';
    const url = `api/v1/events/${eventId}/register/`;
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(() => this.fetchPage(this.state.url))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div>
        <section>
          <button
            onClick={() => this.fetchPage(this.state.previous)}
            disabled={!this.state.previous}
          >
            ← Prev
          </button>
          <p>
            Page {this.state.page} of {this.state.pages}
          </p>
          <button
            onClick={() => this.fetchPage(this.state.next)}
            disabled={!this.state.next}
          >
            Next →
          </button>
        </section>
        {this.state.events.map(event => (
          <Event event={event} key={event.id} onClick={this.register} />
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
