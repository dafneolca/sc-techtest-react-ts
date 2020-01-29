import React, { Component } from 'react';
import './Artists.css';
import { RouteComponentProps, Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ArtistDetail from '../ArtistDetail/ArtistDetail';
// import ApolloClient, { gql } from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

const Artists = (props: any) => {
  console.log(props)

  // state = {
  //   artists: [],
  //   search: '',
  // };



  // render() {
  //   console.log('state', this.state);
  //   console.log('props', this.props);

  // console.log('state: ', this.state)
  // console.log('props: ', this.props)
  // const artistSearchResults = this.state.artists.map((res: any) => {
  //   return (
  //     <div className="ArtistBox" key={res.id}>
  //       Name:
  //       <Link to={`/${res.name}`}>{res.name}</Link>
  //     </div>
  //   )
  // })

  return (

    <div className="ArtistBox" key={props.id}>
      Name:{props.userSearch.name}

      {/* <Router>
        <ArtistDetail path=":artistId" />
      </Router> */}
      {/* <Link to={`/${props.userSearch.name}`}>{props.userSearch.name}</Link> */}
    </div>

    // <ApolloProvider client={this.client} >
    //   {artistSearchResults}
    //   /* <div className="Artist">
    //     <h1>{this.props.name}</h1>
    //     <Link to={`/${this.props.name}`}>See Details</Link>
    //   </div> */
    // </ApolloProvider >


  )
}
// }


export default Artists;
