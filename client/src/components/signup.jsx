import React from "react";
import Joi from "joi-browser";
import {toast} from "react-toastify";

import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import http from "../services/httpService";
// import { apiUrl } from "../config.json";
import userService from "../services/userService";
import {Redirect,Link} from "react-router-dom";

class SignUp extends Form {
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
    const data = { ...this.state.data };
    const apiUrl = process.env.PORT;
    data.biz = false;
    try {
      await http.post(`${apiUrl}/users`, data);
      toast("Signup successful!")
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {

    if(userService.getCurrentUser()) return <Redirect to="/" />

    return (
      <div className="container">
        <PageHeader titleText="Sign Up Page" />
        <div className="row">
          <div className="col-12">
            <p>Open new account today!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/signin" className="link">
            Already have an account? Sign in here
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
