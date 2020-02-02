import React, { Component } from 'react';
import './Artists.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArtistDetail from '../ArtistDetail/ArtistDetail';
import FullArtistProfile from '../FullArtistProfile/FullArtistProfile'

import ApolloClient, { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';

import Home from '../Home';

class Artists extends React.Component<any, any> {

  state = {
    artists: [],
    userSearchResult: this.props.userSearch,
  }

  client = new ApolloClient({
    uri: 'https://graphbrainz.herokuapp.com',
  });

  componentDidMount() {
    if (this.state.userSearchResult) {
      this.getData(this.state.userSearchResult)
    }
  }

  getData(searchResult: string) {
    this.client.query({
      query: gql`
          {
            search {
              artists(query: "${searchResult}") {
                nodes {
                  id
                  name
                }
              }
            }
          }
        `
    }).then(res => {
      const artists = res.data.search.artists.nodes;
      const updatedSearchResults = artists.map((artist: any) => {
        artist.favorite = false;
        return artist;
      })
      this.setState({ artists: updatedSearchResults })
    })
  }

  selectArtistHandler(id: string) {
    console.log('clicked')
    console.log(id)
  }

  goBackHandler() {
    console.log('go back handler')
    console.log(this.props)
    this.props.history.goBack()
  }

  render() {
    let artistResults = this.state.artists.map((artist) => {
      let id = artist['id']
      let name = artist['name']
      return (
        <Grid container spacing={5}
          direction="row"
          justify="center"
          alignItems="center"
          key={id}>
          <Link to={{ pathname: id, state: { name: name } }} key={id} >
            <ArtistDetail
              key={id}
              id={id}
              name={artist['name']}
              {...this.props}
              clicked={() => this.selectArtistHandler(id)} />
          </Link>
        </Grid>
      )
    });

    return (
      <div>
        <div onClick={this.props.clicked}>Back to Search</div>
        <h3>Results for {this.state.userSearchResult}</h3>
        <section className="Posts">
          {artistResults}
          <Switch>
            <Route exact path="/:id" component={FullArtistProfile} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default Artists;
