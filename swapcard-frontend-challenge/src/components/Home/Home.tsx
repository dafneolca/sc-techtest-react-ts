import React from 'react';
import { Route } from 'react-router-dom';

import './Home.css';
import Artists from './Artists/Artists';
import FullArtistProfile from './FullArtistProfile/FullArtistProfile';
import { Breadcrumbs } from '@material-ui/core';

import Sidebar from './Sidebar/Sidebar';



class Home extends React.Component {

  state = {
    userSearch: '',
  }

  newSearchHandler = (event: any) => {
    event.preventDefault();
    const searchResult = event.target.children[0].value
    this.setState({ userSearch: searchResult });
  }

  // breadCrumbs = () => {
  //   return (
  //     <div>
  //       <Breadcrumbs aria-label="breadcrumb">
  //         <Link color="inherit" to="/">Home</Link>
  //         <Link color="inherit" to="/getting-started/installation/">{this.state.userSearch}</Link>
  //       </Breadcrumbs>
  //     </div>
  //   )
  // }

  searchResult = () => {
    return (
      <div>
        <Artists userSearch={this.state.userSearch} />
      </div>
    )
  }


  welcomeScreen = () => {
    return <div>Hola que tal?</div>
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="Container">
          <h4>Search for an Artist 🚀</h4>
          <form onSubmit={this.newSearchHandler}>
            <input placeholder="Search for artist" ref="artist" />
            <input type="submit" value="Search" />
          </form>
        </div>
        <Route exact path="/" component={this.state.userSearch !== '' ? this.searchResult : this.welcomeScreen} />
        <Route exact path="/:id" component={FullArtistProfile} />
      </div >
    )
  }
}

export default Home;

