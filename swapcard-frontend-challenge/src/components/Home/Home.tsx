import React from 'react';

import './Home.css';
import Artists from './Artists/Artists';


class Home extends React.Component {

  state = {
    userSearch: '',
  }

  newSearchHandler = (event: any) => {
    event.preventDefault();
    const searchResult = event.target.children[0].value
    this.setState({ userSearch: searchResult });
  }

  render() {
    const welcomeScreen = (
      <div>Hola que tal?</div>
    )

    const searchResult = <Artists userSearch={this.state.userSearch} />

    return (
      <div>
        <div className="Container">
          <h2>Search for an Artist 🚀</h2>
          <form onSubmit={this.newSearchHandler}>
            <input placeholder="Search for artist" ref="artist" />
            <input type="submit" value="Find Artist" />
          </form>
        </div>
        {this.state.userSearch !== '' ? searchResult : welcomeScreen}
      </div >
    )
  }
}

export default Home;

