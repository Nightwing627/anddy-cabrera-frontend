import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import PasswordAndConfirmPasswordValidation from "./PasswordAndConfirmPasswordValidation";
import { EndPoint } from "../../common/Utils";

function Reset() {

  let {token} = useParams();
  const [password, setUserPassword] = useState();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigate();

  const endpointReset = EndPoint(`email/reset-password/${token}`);
  
  const SetPassword = (pass) => {
    setUserPassword(pass);
  };

  function ResetPassword() {
    return new Promise((resolve, reject) => {      
      fetch(endpointReset, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"password": password}),
      })
        .then((response) => {            
          response.json().then((body) => {
            if (response.ok) {
              
              resolve(body);              
            } else {
              reject(body);
            }
          });
        })
        .catch((error) => {
          
          reject(error);
        });
    });
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
    } else {      
      setValidated(false);      
      ResetPassword()
        .then((response) => {		  
          setError("");
          navigation("/login");      
         
        })
        .catch((error) => {
          setError(error.detail);
          setMessage("");
        });
    }
  };

    return (
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
              <Link className="navbar-brand" to="/">
                <img
                  src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
                  alt="logo"
                  width="100"
                />
              </Link>
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title font-weight-bold mb-4">Reset Password</h1>
                  <Form
                    id="form-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    autocomplete="off"
                  >
                   <PasswordAndConfirmPasswordValidation
                    SetPassword={SetPassword}
                  />
                     <p className="text-danger">{error}.</p>
                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="logout_devices"
                          id="logout"
                          className="form-check-input"
                        />
                        <label for="logout" className="form-check-label">
                          Logout all devices
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary ml-auto">
                        Reset Password
                      </button>                     
                    </div>
                  </Form>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">
                Copyright &copy; 2022 &mdash; Starlogs
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Reset;