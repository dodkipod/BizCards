import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import userService from "../services/userService";
import Card from "./card";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

class Home extends Component {
  state = {
    cards: [],
    favIDs: [],
  };

  allcards;

  search = async(e)=>{
    const term = e.target.value.trim().toLowerCase();
    const cards = this.allcards;
    let cardsWterm = [];
    const byName = cards.filter((card)=>card.bizName.toLowerCase().includes(term));
    const byDes = cards.filter((card)=>card.bizDescription.toLowerCase().includes(term));
    const byAddress = cards.filter((card)=>card.bizAddress.toLowerCase().includes(term));
    const byNum = cards.filter((card)=>card.bizNumber.includes(term));
    if(byName.length>0){
      cardsWterm = cardsWterm.concat(byName);
    }
    if(byDes.length>0){
      cardsWterm = cardsWterm.concat(byDes);
    }
    if(byNum.length>0){
      cardsWterm = cardsWterm.concat(byNum);
    }
    if(byAddress.length>0){
      cardsWterm = cardsWterm.concat(byAddress);
    }
    const uniques = [...new Set(cardsWterm)];
   
    this.setState({cards:uniques});
    if(term===''){
      this.setState({cards:this.allcards});
    }
  }

  async componentDidMount() {
    const req = await cardService.getAllCards();
    this.allcards = req.data;
    const cards = this.allcards;
    const { data: favorites } = await userService.getFavorites();
    const favIDs = favorites.map((fav) => fav._id);
    if (cards.length > 0 && favIDs.length > 0)
      return this.setState({ cards, favIDs });
    if (cards.length > 0) this.setState({ cards });
    if (favIDs.length > 0) this.setState({ favIDs });
  }
  checkFaved(cardID){
    const favIDs = [...this.state.favIDs];
    const faved = favIDs.find((id) => id === cardID);
    if(faved) return true;
    return false;

  }

  clickFav = async (e, cardID) => {
    e.preventDefault();
    let favIDs = [...this.state.favIDs];
    const existingFav = favIDs.find((id) => id === cardID);
    if (!existingFav) {
      
      try {
        const res = await userService.addFavorite(cardID);
        favIDs.push(cardID);
        this.setState({favIDs});

        toast.success(res.data,{
          position: "top-center",
          autoClose: 2500,
        });
      } catch (err) {
        Swal.fire({
          title: "You are not logged in",
          text: "Please log in to add cards to your favorites",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Log in",
          confirmButtonColor: "#dc3545",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.value) {
            this.props.history.push("/signIn");
          }
        });
      }
    } else {
    toast.error('Card already in your favorites',{
      position: "top-center",
      autoClose: 2500,
      
    })

    }
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Home Page" />
        <div className="row">
          <div className="col-12">
            <h4>A place for digital business cards.</h4>
            <p>Look at all these cards!</p>
          </div>
        </div>
          <div className="row">
            <div className="col-lg-5">
            <div className="input-group ">
              <input className="form-control " id="search" name="search" type="search" placeholder="search" onInput={this.search}/>
            </div>
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
                  faved={this.checkFaved(card._id)}
                  card={card}
                  parent={"home"}
                  clickFav={this.clickFav}
                />
              ))}
          </div>
        </div>
      
    );
  }
 
}

export default Home;
