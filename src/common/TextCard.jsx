import React from "react";
import { Card } from "react-bootstrap";

function TextCard({ title, value }) {
  return (
    <div className="col-lg-12 mb-4">
      <Card className="shadow mb-4">
        <Card.Header className="py-3">
          <h6 class="m-0 font-weight-bold text-primary">{title}</h6>
        </Card.Header>
        <Card.Body>
          <p>{value}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TextCard;
