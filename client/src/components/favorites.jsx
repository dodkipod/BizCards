import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import userService from "../services/userService";
import Card from "./card";
import Swal from "sweetalert2";

class Favorites extends Component {
  state = {
    favorites: [],
  };

  deleteFav = async (e,cardID)=>{
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "This card will removed from your favorites",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {

        await userService.deleteFavorite(cardID);
        const favs = [...this.state.favorites];
        const updatedFavs = favs.filter(card=>card._id!==cardID);
        this.setState({favorites: updatedFavs});
        Swal.fire("Card removed from favorites", " ", "success");
      }

    }); 

  }

  async componentDidMount() {
    const { data } = await userService.getFavorites();
    if (data.length > 0) this.setState({ favorites: data });
  }

  render() {
    let { favorites } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Your favorite cards" />
        <div className="row">
          <div className="col-12">
            <p>Your saved cards:</p>
            <div className="row">
              {favorites.length === 0 && <p>No favorites yet</p>}
              {favorites.length > 0 &&
                favorites.map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    parent={"favorites"}
                    deleteFav={this.deleteFav}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
