import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './Home.css';
import Artists from './Artists/Artists';
import FullArtistProfile from './FullArtistProfile/FullArtistProfile';
import { Breadcrumbs } from '@material-ui/core';

import Sidebar from './Sidebar/Sidebar';



class Home extends React.Component<any, any> {

  state = {
    userSearch: '',
  }

  newSearchHandler = (event: any) => {
    // event.preventDefault();
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

  searchInput = () => {
    return (
      <form onSubmit={this.newSearchHandler}>
        <input placeholder="Search for artist" />
        <input type="submit" value="Search" />
      </form>
    )
  }

  introScreen = () => {
    return (
      <div>
        <h4>Search for an Artist 🚀</h4>
        <form onSubmit={this.newSearchHandler}>
          <input placeholder="Search for artist" />
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }

  resetSearchHandler = () => {
    this.setState({ userSearch: '' })
  }

  searchResult = () => {
    return <Artists userSearch={this.state.userSearch} {...this.props} clicked={() => this.resetSearchHandler()} />
  }

  welcomeScreen = () => {
    return (
      <div>
        <h4>Search for an Artist 🚀</h4>
        <form onSubmit={this.newSearchHandler}>
          <input placeholder="Search for artist" />
          <input type="submit" value="Search" />
        </form>
        <p>Get info on your favorite artists</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={this.state.userSearch !== '' ? this.searchResult : this.welcomeScreen} />
          <Route exact path="/:id" component={FullArtistProfile} click={this.resetSearchHandler} />
        </Switch>
      </div >
    )
  }
}

export default withRouter(Home);

