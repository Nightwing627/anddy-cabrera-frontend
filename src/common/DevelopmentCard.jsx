import React from "react";
import { Card } from "react-bootstrap";

function DevelopmentCard() {
  return (
    <Card className="shadow mb-4">
      <Card.Header className="py-3">
        <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
      </Card.Header>
      <Card.Body>
        <p>
          SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order
          to reduce CSS bloat and poor page performance. Custom CSS classes are
          used to create custom components and custom utility classes.
        </p>
        <p className="mb-0">
          Before working with this theme, you should become familiar with the
          Bootstrap framework, especially the utility classes.
        </p>
      </Card.Body>
    </Card>
  );
}

export default DevelopmentCard;
