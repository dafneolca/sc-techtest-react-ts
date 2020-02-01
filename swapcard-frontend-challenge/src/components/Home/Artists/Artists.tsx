import React, { Component } from 'react';
import './Artists.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArtistDetail from '../ArtistDetail/ArtistDetail';
import FullArtistProfile from '../FullArtistProfile/FullArtistProfile'

import ApolloClient, { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';

interface ArtistProps {
  userSearch?: string;
}

interface ArtistState { }

class Artists extends React.Component<ArtistProps, ArtistState> {

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

  artistDetailView() {
    return <FullArtistProfile />
  }

  render() {
    let artistResults = this.state.artists.map((artist) => {
      let id = artist['id']
      let name = artist['name']
      return (
        <Link to={{ pathname: id, state: { name: name } }} key={id} >
          <Grid container spacing={5}
            direction="row"
            justify="center"
            alignItems="center">
            <ArtistDetail
              key={id}
              id={id}
              name={artist['name']}
              {...this.props}
              clicked={() => this.selectArtistHandler(id)} />
          </Grid>
        </Link>
      )
    });

    return (
      <div>
        <h2>ALL ARTISTS</h2>
        <section className="Posts">
          {artistResults}
        </section>

        <Route exact path="/:id" component={FullArtistProfile} />
        {/* <Route path="/:id" exact render={(props) => <FullArtistProfile {...this.props} />} /> */}
        {/* <Route path="/:id" exact component={this.artistDetailView} {...this.props} /> */}
      </div>
    );
  }
}

export default Artists;
