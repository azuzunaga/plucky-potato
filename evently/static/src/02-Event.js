'use strict';

class Event extends React.Component {
  formatDateTime = dateTimeString => {
    const jsDateTime = new Date(dateTimeString + 'z');
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    return jsDateTime.toLocaleString('en-us', options);
  };

  render() {
    const {
      id,
      name,
      short_location,
      status,
      start_date,
      participant_count,
      registered,
      description,
    } = this.props.event;
    return (
      <div className="event">
        <header>
          <h4>{name}</h4>
          <h5>{short_location}</h5>
          <hr />
        </header>
        <p>{description}</p>
        <hr />
        <section>
          <span>
            <strong>When:</strong>
            {this.formatDateTime(start_date)}
          </span>
          <span>
            <strong>Status:</strong>
            {status}
          </span>
          <span>
            <strong>Participants:</strong>
            {participant_count}
          </span>
          <button
            onClick={e => this.props.onClick(id, registered)}
            data-eventid={id}
            className={registered ? 'registered' : undefined}
          >
            {registered ? 'Unregister' : 'Register'}
          </button>
        </section>
      </div>
    );
  }
}
