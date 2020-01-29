import React from 'react';
import './ArtistDetail.css';


class ArtistDetail extends React.Component<any>{
  render() {
    console.log(this.props)
    return (
      <div className="Artist">
        <h1>ARTIST IS HERE</h1>
        {/* <h1>{this.props.name}</h1> */}
      </div>
    )
  }
}


export default ArtistDetail;
