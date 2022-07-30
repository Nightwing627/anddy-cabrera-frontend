import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "./Utils";

const Header = () => {
  const isAuthenticated = localStorage.getItem("accessToken");
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
                alt=""
                width="30"
                height="24"
              />
            </Link>
            <div className="collapse navbar-collapse justify-content-between" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" aria-current="page" to="#">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    About
                  </Link>
                </li>
              </ul>
              <span className="navbar-text ">
                <ul className="nav d-flex">
                  <Fragment>
                    {!isAuthenticated ? (
                      <Fragment>
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">
                            Sign in
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/register">
                            Sign up
                          </Link>
                        </li>
                      </Fragment>
                    ) : (
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                         <li className="nav-item">
                        <Link                          
                          className="nav-link"
                          to="/solutions"
                        >
                          Dashboard
                        </Link>
                      </li> 
                      <li className="nav-item">
                        <Link
                          onClick={handleLogout}
                          className="nav-link"
                          to="/"
                        >
                          Logout
                        </Link>
                      </li>
                     
                      </ul>
                    )}
                  </Fragment>
                </ul>
              </span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
