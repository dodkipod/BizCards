import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card, clickDel, parent, clickFav, deleteFav,faved }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <div className="rounded">
        <div>
        <img width="100%" src={card.bizImage} alt={card.bizName} />
        </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <p className="card-text">{card.bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>tel: </b>
            {card.bizPhone} <br />
            <b>Address: </b>
            {card.bizAddress} <br />
            <b>Card Number: </b>
            {card.bizNumber} <br />
          </p>
          {parent==="myCards" && (
            <React.Fragment>
              <Link className="text-dark mr-1" to={`/my-cards/edit/${card._id}`}>Edit </Link><span className="text-dark">|</span>
              <a
                href="/"
                className="ml-1 text-dark"
                onClick={(e) => clickDel(card._id, e)}
              >
                Delete
              </a>
            </React.Fragment>
          )}
          {(parent ==="home" && !faved)&&(
            
            <a href="/" onClick={(e) => clickFav(e, card._id)}>
              <i className="far fa-heart text-danger heart"></i>
            </a>
          )}
          {(parent ==="home" && faved)&&(
            <a href="/" onClick={(e) => clickFav(e, card._id)}>
              <i className="fas fa-heart text-danger heart"></i>
            </a>
          )}
          {parent === "favorites" && 
            <a href="/" onClick={(e) => deleteFav(e, card._id)} className="btn btn-outline-dark">
              Remove
            </a>
          }
        </div>
      </div>
    </div>
  );
};
 
export default Card;
