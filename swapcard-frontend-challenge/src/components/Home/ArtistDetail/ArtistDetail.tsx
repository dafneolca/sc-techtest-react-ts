import React from 'react';
import './ArtistDetail.css';


const artistDetail = (props: any) => {

  console.log(props)
  return (
    <div className="Artist">
      <h1>{props.name}</h1>
      <p>favoite? {props.favorite}</p>
    </div>
  )

}


export default artistDetail;

