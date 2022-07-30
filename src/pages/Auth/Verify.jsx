import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EndPoint } from "../../common/Utils";

function Verify() {
  let {token} = useParams();
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const endpointverify = EndPoint(`email/verify/${token}`);
  EmailVerification();
  useEffect(() => {
    
    /*return () => { EmailVerification()};*/
      
  });

  function VerifyEmail() {
    return new Promise((resolve, reject) => {      
      fetch(endpointverify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: token,
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

  function EmailVerification() {
    VerifyEmail()
      .then((response) => {
        setError("");
        setMessage(response.message);
      })
      .catch((error) => {
        setError(error.detail);
        setMessage("");
      });
  };

  return (
    <div className="p-5 text-center bg-light">
      <h1 className="mb-3">MyStarlog</h1>
      <h4 className="mb-3">{message}</h4>
      <h4 className="mb-3">{error}</h4>
      <a
        onClick={() => navigation("/login")}
        role="button"
        className="btn btn-primary"
      >
        Go to login page
      </a>
    </div>
  );
}

export default Verify;