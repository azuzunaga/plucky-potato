'use strict';

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
  }

  componentDidMount() {
    this.fetchPage('api/v1/events/');
  }

  fetchPage = url => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const { limit, offset, next, previous, total_count } = res.meta;
        this.setState({
          events: res.objects,
          page: parseInt(offset / limit) + 1,
          pages: Math.ceil(total_count / limit),
          next,
          previous,
          url,
        });
      });
  };

  register = (eventId, registered) => {
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
  };

  render() {
    const pageInfo = {
      previous: this.state.previous,
      next: this.state.next,
      page: this.state.page,
      pages: this.state.pages,
    };
    return (
      <div className="center">
        <Pagination pageInfo={pageInfo} fetchPage={this.fetchPage} />
        <div className="events">
          {this.state.events.map(event => (
            <Event event={event} key={event.id} onClick={this.register} />
          ))}
        </div>
        <Pagination pageInfo={pageInfo} fetchPage={this.fetchPage} />
      </div>
    );
  }
}
