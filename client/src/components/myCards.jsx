import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import cardService from "../services/cardService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class MyCards extends Component {
  state = {
    cards: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    if (data.length > 0) this.setState({ cards: data });
  }

  filterCards = (cardId) => {
    const cards = [...this.state.cards];
    return cards.filter((card) => card._id !== cardId);
  };

  deleteCard = (cardId, e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "This card will be lost forever",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete card",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {
        this.setState({ cards: this.filterCards(cardId) });
        await cardService.deleteCard(cardId);
        Swal.fire("Card deleted!", " ", "success");
      }
    });
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Your Cards" />
        <div className="row">
          <div className="col-12">
            <p>
              <Link className="btn btn-outline-secondary btn-custom" to="/create-card">
                <i className="fas fa-plus-circle"></i> Add card
              </Link>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>Below are your cards:</p>
          </div>
        </div>

        <div className="row">
          {cards.length === 0 && 
            <div className="col-12 mt-3">
              <p>No cards yet</p>
            </div>
          }
          {cards.length > 0 &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                clickDel={this.deleteCard}
                parent={"myCards"}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MyCards;
