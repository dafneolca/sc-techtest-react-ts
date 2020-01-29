import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { render } from "react-dom"
import { RouteComponentProps, Link } from "@reach/router"

import './Home.css';
import Artists from './Artists/Artists';
import ArtistDetail from './ArtistDetail/ArtistDetail';

import ApolloClient, { gql } from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';


class Home extends React.Component {

  state = {
    artists: [],
    userSearch: '',
  }


  client = new ApolloClient({
    uri: 'https://graphbrainz.herokuapp.com',
  });

  componentDidMount() {
    if (this.state.userSearch !== '') {
      this.getData(this.state.userSearch)
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

  newSearchHandler = (event: any) => {
    event.preventDefault();
    const searchResult = event.target.children[0].value
    this.setState({ userSearch: searchResult });
    this.getData(searchResult);
  }

  render() {
    const welcomeScreen = (
      <div>Hola que tal?</div>
    )

    const searchResult = this.state.artists.map(artist => {
      return <Artists userSearch={artist}></Artists>
    });

    return (
      <div>
        <div className="Container">
          <h2>Search for an Artist 🚀</h2>
          <form onSubmit={this.newSearchHandler}>
            <input placeholder="Search for artist" ref="artist" />
            <input type="submit" value="Find Artist" />
          </form>
        </div>
        {this.state.userSearch != '' ? <Route exact path="/" render={() => searchResult} /> : welcomeScreen}
      </div>
    )
  }
}

export default Home;

// interface ArtistsProps extends RouteComponentProps {
//   artistName?: string;
// }

// const Artist = (props: ArtistsProps) => (
//   <div>
//     <h1>Invoice {props.artistName}</h1>
//   </div>
// )