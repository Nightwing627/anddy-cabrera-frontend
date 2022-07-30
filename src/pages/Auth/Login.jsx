import React, { useState } from "react";
import { Form } from "react-bootstrap";
import{Link, useNavigate} from 'react-router-dom'
import MModal from "./Modal";
import { EndPoint } from "../../common/Utils";

const endPointLogin = EndPoint("auth/access-token");

async function loginUser(credentials) {
  return fetch(
    endPointLogin,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: credentials,
    }
  ).then((data) => data.json());
}

const Login = () => {
  const [username, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
    } else {
      setValidated(false);

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("password", password);

      e.preventDefault();
      const response = await loginUser(urlencoded);
      if ("access_token" in response) {
        localStorage.setItem("accessToken", response["access_token"]);
        navigation("/solutions");
      } else {
        setError(response.detail);
        if(response.detail==="Inactive user")        
        {
          setModalShow(true);
        }
        
      }
    }
  };

  return (
    <section className="h-100">
       <MModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        username={username}
      />
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
                <h1 className="card-title font-weight-bold mb-4">Login</h1>
                <Form
                  id="form-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  autocomplete="on"
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" for="email">
                      E-Mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"                      
                      required
                      autofocus
                      onChange={e => setUserEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">Email is invalid</div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" for="password">
                        Password
                      </label>
                      <Link to="/forgot" className="float-right">
                        Forgot Password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      onChange={e => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">Password is required</div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="form-check-input"
                      />
                      <label for="remember" className="form-check-label">
                        Remember Me
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary ml-auto">
                      Login
                    </button>                   
                  </div>
                  <p className="text-danger">{error}</p>
                </Form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-dark">
                    Create One
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
};

export default Login;