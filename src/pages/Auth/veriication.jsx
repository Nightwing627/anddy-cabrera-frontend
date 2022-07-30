import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Verification() {
  const location = useLocation();
  const navigation = useNavigate();
    return (
      <div className="p-5 text-center bg-light">
        <h1 className="mb-3">MyStarlog</h1>
        <h4 className="mb-3">Thanks for choosing MyStarlog {location.state.full_name}.</h4>
        <p className="mb-3">We have sent a confirmation email to {location.state.email}.</p>
        <p className="mb-3">Please check your email inbox and click on the link to confirm your registration.</p>
        <a onClick={() => navigation("/login")} role="button" className="btn btn-primary">Go to login page</a>
      </div>
    );

}

export default Verification;