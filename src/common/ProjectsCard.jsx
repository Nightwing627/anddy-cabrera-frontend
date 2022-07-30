import React from "react";
import { Card } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

let ProjectsProgressData = [
  { Title: "Server Migration", Price: 20, class: "danger" },
  { Title: "Sales Tracking", Price: 40, class: "warning" },
  { Title: "Customer Database", Price: 60, class: "primary" },
  { Title: "Payout Details", Price: 80, class: "info" },
  { Title: "Account Setup", Price: 100, class: "success" },
];

let ProjectsCardData = [
  { Title: "Primary", Color: "#4e73df", class: "primary" },
  { Title: "Success", Color: "#1cc88a", class: "success" },
  { Title: "Info", Color: "#36b9cc", class: "info" },
  { Title: "Warning", Color: "#f6c23e", class: "warning" },
  { Title: "Danger", Color: "#e74a3b", class: "danger" },
  { Title: "Secondary", Color: "#858796", class: "secondary" },
  { Title: "Light", Color: "#f8f9fc", class: "light" },
  { Title: "Dark", Color: "#5a5c69", class: "dark" },
];

function ProjectsCard() {
  return (
    <div className="col-lg-6 mb-4">
      <Card className="shadow mb-4">
        <Card.Header className="py-3">
          <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
        </Card.Header>
        <Card.Body>
          {ProjectsProgressData.map((item, index) => {
            return (
              <>
                <h4 className="small font-weight-bold">
                  {item.Title}
                  <span className="float-right">
                    {item.Price === 100 ? "Complete!" : item.Price + "%"}
                  </span>
                </h4>
                <ProgressBar
                  className={
                    index + 1 !== ProjectsProgressData.length ? "mb-4" : ""
                  }
                  variant={item.class}
                  now={item.Price}
                />
              </>
            );
          })}
        </Card.Body>
      </Card>
      <div className="row">
        {ProjectsCardData.map((item, index) => {
          return (
            <div className="col-lg-6 mb-4" key={index}>
              <div
                className={`card bg-${item.class} text-${
                  item.class == "light" ? "black" : "white"
                } shadow`}
              >
                <div className="card-body">
                  {item.Title}
                  <div
                    className={`text-${
                      item.class == "light" ? "black" : "white"
                    }-50 small`}
                  >
                    {item.Color}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsCard;
