import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Favorites from "./components/favorites";
import SignUp from "./components/signup";
import BizSignUp from "./components/bizSignup";
import CreateCard from "./components/createCard";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";
import SignIn from "./components/signin";
import SignOut from "./components/logout";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  callapi(){
    fetch("/api")
    .then(res=>res.json())
    .then(res=>{
      console.log(JSON.stringify(res))
    })
  }

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main className="minh-650 main-font">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/logout" component={SignOut} />
            <Route path="/biz-signup" component={BizSignUp} />
            <ProtectedRoute
              path="/favorites"
              component={Favorites}
            />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
            />
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute path="/my-cards" component={MyCards} biz={true} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
