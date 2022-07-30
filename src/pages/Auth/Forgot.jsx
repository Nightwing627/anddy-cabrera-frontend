import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { EndPoint } from "../../common/Utils";

const endPointEmail = EndPoint("email");

function Forgot() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setUserEmail] = useState();
  const navigation = useNavigate();

  function send_reset() {
    return new Promise((resolve, reject) => {
      fetch(endPointEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: [email],
          body: {            
            template_name: "forgot.html",
            subject: "MyStarLog to reset your password",
          },
        }),
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
  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
    } else {
      setValidated(false);
      send_reset()
        .then((response) => {		  
          setError("");
          navigation("/forgot-sent", {state:{email: email}});
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
                <h1 className="fs-4 card-title font-weight-bold mb-4">
                  Forgot Password
                </h1>
                <Form
                  id="form-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  autocomplete="on"
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 text-muted" for="email">
                      E-Mail Address
                    </Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      placeholder="Enter email"
                      autofocus
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Email is invalid.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <p className="text-danger">{error}</p>
                  <p className="text-success">{message}</p>
                  <p className="form-text text-muted mb-3">
                    Please enter your email to recieve a link to reset your
                    password.
                  </p>

                  <div className="align-items-center d-flex">
                    <button type="submit" className="btn btn-primary ml-auto">
                      Send Link
                    </button>
                  </div>
                </Form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Remember your password?{" "}
                  <Link to="/login" className="text-dark">
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 text-muted">
            Copyright &copy; 2022 &mdash; MyStarLog
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;