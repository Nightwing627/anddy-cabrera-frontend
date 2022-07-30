import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "./Collapse";
import { useLocation } from "react-router-dom";

const components = {
  title: "Components",
  icon: "fas fa-fw fa-cog",
  values: [
    {
      title: "CUSTOM COMPONENTS:",
      values: [
        {
          title: "Buttons",
        },
        {
          title: "Cards",
        },
      ],
    },
  ],
};

const utilities = {
  title: "Utilities",
  icon: "fas fa-fw fa-wrench",
  values: [
    {
      title: "CUSTOM UTILITIES:",
      values: [
        {
          title: "Colors",
        },
        {
          title: "Borders",
        },
        {
          title: "Animations",
        },
        {
          title: "Other",
        },
      ],
    },
  ],
};

const pages = {
  title: "Pages",
  icon: "fas fa-fw fa-folder",
  values: [
    {
      title: "LOGIN SCREENS:",
      values: [
        {
          title: "Login",
        },
        {
          title: "Register",
        },
        {
          title: "Forgot Password",
        },
      ],
    },
    {
      title: "OTHER PAGES:",
      values: [
        {
          title: "404 Page",
        },
        {
          title: "Blank Page",
        },
      ],
    },
  ],
};

function SideBar() {
  const location = useLocation();
  const [route, setRoute] = useState();

  useEffect(() => {
    setRoute(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center "
          href="#"
        >
         
          <div className="sidebar-brand-text mx-3">
            MyStarLog
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/solutions">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Your Solutions</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Administration</div>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/projects">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Solution by Project</span>
          </Link>
        </li>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Solution by Task</span>
          </Link>
        </li>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Solution by User</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Share</div>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Your Shared Solutions</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Users</div>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Your Users</span>
          </Link>
        </li>

        <li className={`nav-item ${route === "/" && "active"}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Your Account</span>
          </Link>
        </li>



        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
        {route === "/dashboard" && (
          <div className="sidebar-card d-none d-lg-flex">
            <img
              className="sidebar-card-illustration mb-2"
              src="img/undraw_rocket.svg"
              alt="..."
            />
            <p className="text-center mb-2">
              <strong>MyStarLog</strong> is packed with premium features,
              components, and more!
            </p>
            <a
              className="btn btn-success btn-sm"
              href="#"
            >
              Upgrade to Pro!
            </a>
          </div>
        )}  
      </ul>
    </>
  );
}

export default SideBar;
