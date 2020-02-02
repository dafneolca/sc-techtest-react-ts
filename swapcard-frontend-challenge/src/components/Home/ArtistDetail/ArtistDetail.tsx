import React from 'react';
import './ArtistDetail.css';

const artistDetail = (props: any) => {
  return (
    <div className="Artist">
      <h1>{props.name}</h1>
    </div>
  )
}


export default artistDetail;

