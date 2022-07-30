import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { EndPoint } from "../../common/Utils";

const endPointEmail = EndPoint("email");

function MModal(props) {

    const navigation = useNavigate();
    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(props.username);
    }, []);

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
                full_name: "there",
                template_name: "verification.html",
                subject: "MyStarLog Account Verification Mail"
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
                navigation("/login")        
            })
            .catch((error) => {
              
            });
        
      };
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          ⛔️Your account is not verified yet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Account Verification</h4>
          <p>
          Looks like your still don't verify your account. Before you can log in you need to verify your email. 
        Please check your email inbox and click on the link to confirm your account.         
          </p>
          <p>Didn't receive the email? <Link to="#" onClick={() => {Resend(); props.onHide();}} className="link-primary"  >Resend</Link></p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MModal; 