import React from "react";
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import cardService from "../services/cardService";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";


class EditCard extends Form {
  state = {
    data: {
    bizName:"",
    bizDescription: "",
    bizAddress: "",
    bizPhone: "",
    bizImage: ""
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow("")
  }

  async componentDidMount(){
    const cardId = this.props.match.params.id;
    const {data}=await cardService.getCard(cardId);
    // hey
    console.log("data: ",data);
    //----------------
    this.setState({data:this.mapToViewModel(data)});
  }

  mapToViewModel(card){
    return {
    _id:card._id,
    bizName:card.bizName,
    bizDescription: card.bizDescription,
    bizAddress: card.bizAddress,
    bizPhone: card.bizPhone,
    bizImage: card.bizImage
    };
  }

  doSubmit = async () => {
    const {data}= this.state;
    await cardService.editCard(data);
    toast.success("Card updated",{
      position: "top-center",
      autoClose: 2500,
    });
    this.props.history.replace('/my-cards');
  };


  render() {


    return (
      <div className="container">
        <PageHeader titleText="Card edit Form" />
        <div className="row">
          <div className="col-12">
            <p>Please update your business card details</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("bizName", "Business name")}          
              {this.renderInput("bizDescription", "Business description")}          
              {this.renderInput("bizAddress", "Business address")}          
              {this.renderInput("bizPhone", "Business phone number")}          
              {this.renderInput("bizImage", "Business image")}          
              {this.renderButton("Update Card")}
              <Link className="btn btn-primary btn-custom ml-2" to="/my-cards">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
