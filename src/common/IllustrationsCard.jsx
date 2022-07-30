import React from "react";
import { Card } from "react-bootstrap";

function IllustrationsCard() {
  return (
    <Card className="shadow mb-4">
      <Card.Header className="py-3">
        <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
      </Card.Header>
      <Card.Body>
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "25rem" }}
            src="img/undraw_posting_photo.svg"
            alt="..."
          />
        </div>
        <p>
          Add some quality, svg illustrations to your project courtesy of{" "}
          <a target="_blank" rel="nofollow" href="https://undraw.co/">
            unDraw
          </a>
          , a constantly updated collection of beautiful svg images that you can
          use completely free and without attribution!
        </p>
        <a target="_blank" rel="nofollow" href="https://undraw.co/">
          Browse Illustrations on unDraw &rarr;
        </a>
      </Card.Body>
    </Card>
  );
}

export default IllustrationsCard;
