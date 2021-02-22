import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
     
      <nav className="navbar navbar-expand-lg shadow-sm navbar-custom ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BizCards
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                  Favorites
                </NavLink>
              </li>
              {user && user.biz && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-cards">
                    My Cards
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/biz-signup">
                      Business
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link main-font" to="/logout">
                    log out {user.name}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
     
    );
  }
}

export default Navbar;
