import React from "react";
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import userService from "../services/userService";
import {Redirect, Link} from "react-router-dom";



class SignIn extends Form {
  state = {
    data: { email: "", password: ""},
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    
  };

 doSubmit = async () => {

    const { email, password } = this.state.data;

    try {

      await userService.login(email, password);
      window.location='/';

    } catch(ex){
      if(ex.response && ex.response.status===400){
        this.setState({errors:{email:ex.response.data,password:ex.response.data}})
      }
    }

  }


  render() {

    if(userService.getCurrentUser()) return <Redirect to="/" />
    
    return (
      <div className="container">
        <PageHeader titleText="Sign In Page" />
        <div className="row">
          <div className="col-12">
            <p>Sign in to your account</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Signin")}
            </form>
          </div>
        </div>
        <div className="mt-3 test">
          <Link to="/signup" className="link">
            Don't have an account? Sign up for free!
          </Link>
        </div>
      </div>
    );
  }
}

export default SignIn;
