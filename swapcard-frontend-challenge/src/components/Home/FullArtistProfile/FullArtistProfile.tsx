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
      id: this.props.match.params.id,
      favorite: false
    })
    const artist = this.props.location.state.name;
    if (this.state.artist) {
      this.loadData(artist)
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

  setFavoriteHandler() {
    localStorage.clear();
    this.setState({ favorite: this.state.favorite === true ? false : true })
    setTimeout(() => this.saveToStorage(), 1000);
  }

  saveToStorage() {
    let newArray;
    let artistObj = {
      name: this.state.artist,
      id: this.state.id
    }
    if (this.state.favorite === true) {
      if (localStorage.getItem('favorites')) {
        const oldArray = localStorage.getItem('favorites');
        const oldArrayParse = oldArray !== null ? JSON.parse(oldArray) : null;
        if (!oldArrayParse.includes(artistObj)) {
          newArray = [...oldArrayParse, artistObj];
          localStorage.setItem('favorites', JSON.stringify(newArray));
        }
        else {
          return null
        }
      } else {
        localStorage.setItem('favorites', JSON.stringify([artistObj]))
      }
    }
    else {
      if (localStorage.getItem('favorites')) {
        const oldArray = localStorage.getItem('favorites');
        const oldArrayParse = oldArray !== null ? JSON.parse(oldArray) : null;
        const index = oldArrayParse.indexOf(artistObj);
        if (index !== -1) {
          oldArrayParse.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(oldArrayParse));
        }
      }
    }
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    if (this.state.artist) {
      post = (
        <div>
          <h3 style={{ textAlign: 'center' }}>{this.state.artist}</h3>
          <div onClick={() => this.setFavoriteHandler()}>
            <FavoriteIcon
              style={{ color: this.state.favorite === true ? red[500] : red[100] }} />
            {this.state.favorite === true ? <p>Remove Favorite</p> : <p>Save as Favorite</p>}
          </div>
          <Link to='/' onClick={this.props.click}>Back</Link>
        </div>
      )
    }

    return (
      <div>
        {post}
        <Route exact path="/" component={Home} onClick={this.props.click} />
      </div>
    )
  }
}

export default FullArtistProfile;