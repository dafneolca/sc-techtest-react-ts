import React, { Component } from 'react';
import './Artists.css';
import { RouteComponentProps, Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArtistDetail from '../ArtistDetail/ArtistDetail';

import ApolloClient, { gql } from 'apollo-boost';

// import ApolloClient, { gql } from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

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


  render() {
    // TODO: ADD ROUTING AND SEPARATE ARTISTS ARRAY FROM ARTIST DETAIL
    let artistResults = this.state.artists.map((artist) => {
      return <ArtistDetail key={artist['id']} name={artist['name']} />;
    });

    return (
      <section className="Posts">
        {artistResults}
      </section>
    );
  }
}





export default Artists;
