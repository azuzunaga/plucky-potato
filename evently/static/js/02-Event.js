'use strict';

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
