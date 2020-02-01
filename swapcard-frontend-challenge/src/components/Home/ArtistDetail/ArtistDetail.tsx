import React from 'react';
import './ArtistDetail.css';


const artistDetail = (props: any) => {
  return (
    <div className="Artist">
      <h1>{props.name}</h1>
      {props.favorite ? <p>favoite? </p> : <button onClick={props.clicked}>Make artist favorite</button>}
    </div>
  )

}


export default artistDetail;

