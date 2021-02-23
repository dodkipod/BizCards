import React from "react";
import Joi from "joi-browser";

import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import userService from "../services/userService";
import {Redirect} from "react-router-dom";

class BizSignUp extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    // const apiUrl = process.env.PORT;
    const data = { ...this.state.data };
    data.biz = true;

    try{
      await http.post(`${apiUrl}/users`,data);
      await userService.login(data.email,data.password);
      window.location = '/create-card';
    }catch(ex){
        if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    console.log(apiUrl);
    if(userService.getCurrentUser()) return <Redirect to="/" />

    return (
      <div className="container">
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <p>Open a new business account today!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BizSignUp;
