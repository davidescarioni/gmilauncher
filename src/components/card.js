import React from 'react';

export default function Card(props) {
  return (
    <>
      {props.download_url!==undefined && (
      <li className="card">
        {props.image!==undefined && (<div className="card__image" style={{ backgroundImage: `url(${props.image})` }}></div>)}
        {props.title!==undefined && (<div className="card__title">{props.title}</div>)}
        {props.author!==undefined && (<div className="card__author">di {props.author}</div>)}
        {props.description!==undefined && (<div className="card__description">{props.description}</div>)}
        <div className="btn-download__container">
          <a className="btn-download__link" href={props.download_url} title={props.title + " Download"}>Download</a>
        </div>
      </li>
      )}
    </>
  )
}