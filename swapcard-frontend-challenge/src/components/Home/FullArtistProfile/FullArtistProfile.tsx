import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ApolloClient, { gql } from 'apollo-boost';
import Home from '../Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';


class FullArtistProfile extends React.Component<any, any> {

  state = {
    artist: null,
    favorite: false,
    id: null
  }

  client = new ApolloClient({
    uri: 'https://graphbrainz.herokuapp.com',
  });

  componentDidMount() {
    this.setState({
      artist: this.props.location.state.name,
      favorite: false,
      id: this.props.match.params.id
    })
    const artist = this.props.location.state.name;
    if (this.state.artist) {
      this.loadData(artist)
    }
  }

  setFavoriteHandler() {
    this.setState({ favorite: !this.state.favorite })
    let newArray;
    if (this.state.favorite === true) {
      if (localStorage.getItem('favorites')) {
        const oldArray = localStorage.getItem('favorites');
        const oldArrayParse = oldArray !== null ? JSON.parse(oldArray) : null;
        newArray = [...oldArrayParse, this.state.artist];
        localStorage.setItem('favorites', JSON.stringify(newArray));
      } else {
        localStorage.setItem('favorites', JSON.stringify([this.state.artist]))
      }
    }
    else {
      if (localStorage.getItem('favorites')) {
        const oldArray = localStorage.getItem('favorites');
        const oldArrayParse = oldArray !== null ? JSON.parse(oldArray) : null;
        const index = oldArrayParse.indexOf(this.state.artist);
        if (index !== -1) {
          oldArrayParse.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(oldArrayParse));
        }
      }
    }
  }

  loadData(artist?: string) {
    this.client.query({
      query: gql`
          {
            search {
              artists(query: "${artist}") {
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
    let post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    if (this.state.artist) {
      post = (
        <Router>
          <div>
            <h3 style={{ textAlign: 'center' }}>{this.state.artist}</h3>
            <div>
              <FavoriteIcon
                onClick={() => this.setFavoriteHandler()}
                style={{ color: this.state.favorite ? red[100] : red[500] }} />
            </div>
            <Link to='/'>Back</Link>
          </div>
        </Router>
      )
    }

    return (
      <div>
        {post}
        <Route exact path="/" component={Home} />
      </div>
    )
  }
}

export default FullArtistProfile;