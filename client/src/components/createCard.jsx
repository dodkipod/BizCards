import React from "react";
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import cardService from "../services/cardService";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";


class CreateCard extends Form {
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
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow("")
  }

  doSubmit = async () => {

    const data = {...this.state.data};
    if(!data.bizImage) delete data.bizImage;
    await cardService.createCard(data);
    toast.success("Your card has been created!",{
      position: "top-center",
      autoClose: 2500,
    });
    this.props.history.replace('/my-cards');
  };

  render() {


    return (
      <div className="container">
        <PageHeader titleText="Card Creation Form" />
        <div className="row">
          <div className="col-12">
            <p>Please fill in your business card details</p>
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
              {this.renderButton("Create Card")}
              <Link className="btn btn-primary ml-2 btn-custom" to="/my-cards">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
