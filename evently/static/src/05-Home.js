'use strict';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Nav />
        <Events />
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<Home />, domContainer);
