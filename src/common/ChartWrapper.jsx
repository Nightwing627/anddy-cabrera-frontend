import React from "react";
import DropDownAction from "./DropDownAction";

const DropDownData = {
  Title: "Dropdown Header:",
  values: [
    { Title: "Action" },
    { Title: "Another action" },
    { Title: "Something else here" },
  ],
};

function ChartWrapper() {
  return (
    <div className="row">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Earnings Overview
            </h6>
            <DropDownAction data={DropDownData} />
          </div>
          <div className="card-body">
            <div className="chart-area">
              <canvas id="myAreaChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Revenue Sources
            </h6>
            <DropDownAction data={DropDownData} />
          </div>
          <div className="card-body">
            <div class="chart-pie pt-4">
              <canvas id="myPieChart"></canvas>
            </div>
            <div className="mt-4 text-center small">
              <span className="mr-2">
                <i className="fas fa-circle text-primary"></i> Direct
              </span>
              <span className="mr-2">
                <i className="fas fa-circle text-success"></i> Social
              </span>
              <span className="mr-2">
                <i className="fas fa-circle text-info"></i> Referral
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartWrapper;
