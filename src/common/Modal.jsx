import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function DModal(props) {

    const navigation = useNavigate();

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="text-center">
            Are you sure you want to delete this project?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onYes}>YES</Button>
          <Button onClick={props.onNo}>NO</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default DModal; 