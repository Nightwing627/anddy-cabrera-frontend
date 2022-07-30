import React, { useState, useEffect} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { EndPoint } from "../../common/Utils";

const endPointEmail = EndPoint("email");

function ForgotSent() {
  const location = useLocation();
  const navigation = useNavigate();
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(10);

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

  const Resend = async () => {      
      send_reset()
        .then((response) => {		  
          setError("");
          setMessage(response.message);          
        })
        .catch((error) => {
          setError(error.detail);
          setMessage("");
        });
    
  };

  const ResetCount = async () => {
    setCounter(10);
    Resend();    
  }

  useEffect(() => {    
    location.state !== null && setEmail(location.state.email);
    
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);  
    if(counter ===0)
    {
        setMessage("");
        setError("");
    }  
  }, [counter]);

  if (email !== undefined ) {
    return (
      <div className="p-5 text-center bg-light">
        <h1 className="mb-3">MyStarlog</h1>        
        <h4 className="mb-3">Recovery email sent.</h4>
        <p className="mb-3">We have sent a recovery email to {email}.</p>
        <p className="mb-3">Please check your email inbox and click on the link to reset your password.</p>
        <p className="mb-3">Didn't receive the email? <Link to="#"  className={counter === 0 ? "link-primary" : "link-dark"} onClick={() => ResetCount()} style={{pointerEvents: counter === 0 ? 'auto' : 'none'}}>Resend</Link></p>
        <p className="mb-3">in <b>{counter}</b> second(s)</p>        
        <a onClick={() => navigation("/login")} role="button" className="btn btn-primary">Go to login page</a>
        <p className="text-success">{message}.</p>
        <p className="text-danger">{error}.</p>
      </div>
    );
  }else
  {
    return (
        <div className="p-5 text-center bg-light">
          <h1 className="mb-3">MyStarlog</h1>        
          <h4 className="mb-3">Something went wrong!</h4>            
          <a onClick={() => navigation("/login")} role="button" className="btn btn-primary">Go to login page</a>        
        </div>
      );
  }

}

export default ForgotSent;