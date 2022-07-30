import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import PasswordAndConfirmPasswordValidation from "./PasswordAndConfirmPasswordValidation";
import { EndPoint } from "../../common/Utils";

const endPointopen = EndPoint("users/open");
const endPointEmail = EndPoint("email");

function Register() {
  const [full_name, setFullName] = useState();
  const [password, setUserPassword] = useState();
  const [email, setUserEmail] = useState();
  const [user_name, setUserName] = useState(null);
  const navigation = useNavigate();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const SetPassword = (pass) => {
    setUserPassword(pass);
  };

  function create_user() {
    return new Promise((resolve, reject) => {
      fetch(endPointopen, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, password, email, user_name }),
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

  function send_confirmation(response) {
    return new Promise((resolve, reject) => {
      fetch(endPointEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: [response.email],
          body: {
            full_name: response.full_name,
            template_name: "verification.html",
            subject: "MyStarLog Account Verification Mail",
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
      create_user()
        .then((response) => {
          setError("");
          send_confirmation(response)
            .then((response) => {
              navigation("/verification", {
                state: { full_name: full_name, email: email },
              });
              setError("");
            })
            .catch((error) => {
              setError(error.detail);
            });
        })
        .catch((error) => {
          setError(error.detail);
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
                  Register
                </h1>
                <Form
                  id="form-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  autocomplete="on"
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 text-muted" for="name">
                      Full Name
                    </Form.Label>
                    <Form.Control
                      id="ful-name"
                      type="text"
                      className="form-control"
                      name="full-name"
                      required
                      autofocus
                      placeholder="Enter Fullname"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Full Name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 text-muted" for="email">
                      Email address
                    </Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      placeholder="Enter Email"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a Email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 text-muted" for="username">
                      Username
                    </Form.Label>
                    <Form.Control
                      id="username"
                      type="tel"
                      className="form-control"
                      name="username"
                      required
                      placeholder="Enter a Username"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <PasswordAndConfirmPasswordValidation
                    SetPassword={SetPassword}
                  />
                  <p className="text-danger">{error}.</p>
                  <p className="form-text text-muted mb-3">
                    By registering you agree with our terms and condition.
                  </p>

                  <div className="align-items-center d-flex">
                    <button type="submit" className="btn btn-primary ml-auto">
                      Register
                    </button>
                  </div>
                </Form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-dark">
                    Login
                  </Link>
                </div>
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

export default Register;
