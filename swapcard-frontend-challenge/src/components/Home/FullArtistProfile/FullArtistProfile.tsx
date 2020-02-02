import React from 'react';
import { Route, Link } from "react-router-dom";
import ApolloClient, { gql } from 'apollo-boost';
import Home from '../Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import './FullArtistProfile.css';



class FullArtistProfile extends React.Component<any, any> {

  state = {
    artist: null,
    favorite: null,
    id: null
  }

  client = new ApolloClient({
    uri: 'https://graphbrainz.herokuapp.com',
  });

  componentDidMount() {
    console.log(this.state)
    this.setState({
      artist: this.props.location.state.name,
      id: this.props.match.params.id,
      // favorite: false
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
        return artist;
      })
      this.setState({ artists: updatedSearchResults })
    })
  }

  setFavoriteHandler() {
    this.setState({ favorite: this.state.favorite === true ? false : true })
    setTimeout(() => this.saveToStorage(), 1000);
  }

  saveToStorage() {
    let newArray;
    let artistObj = {
      name: this.state.artist,
      id: this.state.id
    }
    // ADD NEW ITEM TO FAVORITES
    if (this.state.favorite === true) {
      if (localStorage.getItem('favorites') != null) {
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
    // REMOVE ITEM FROM FAVORITES
    else {
      if (localStorage.getItem('favorites')) {
        const oldArray = localStorage.getItem('favorites');
        const oldArrayParse = oldArray !== null ? JSON.parse(oldArray) : null;
        const index = oldArrayParse.indexOf(artistObj);
        if (index === -1) {
          oldArrayParse.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(oldArrayParse));
        }
      }
    }
  }

  render() {
    let artistInfo = <p className='center'>Loading...!</p>;
    if (this.state.artist) {
      artistInfo = (
        <div>
          <h3 className='center'>{this.state.artist}</h3>
        </div>
      )
    }

    let favoriteButton = <div> <FavoriteIcon style={{ color: red[100] }} /> <p>Save as Favorite</p></div>
    if (this.state.favorite === true) {
      favoriteButton = <div><FavoriteIcon style={{ color: red[500] }} /> <p>Remove Favorite</p> </div>
    }

    return (
      <div>
        {artistInfo}
        <div className='artistOptions'>
          <Button className='favoriteToggleBtn' variant="outlined" onClick={() => this.setFavoriteHandler()}>
            {favoriteButton}
          </Button>
        </div>
        <Link to='/' onClick={this.props.click}>Back</Link>
        <Route exact path="/" component={Home} onClick={this.props.click} />
      </div>
    )
  }
}

export default FullArtistProfile;