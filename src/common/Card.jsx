import React from "react";

let cardData = [
  {
    Title: "Earnings (Monthly)",
    Price: "$40,000",
    class: "primary",
    icon: "fa-brands fa-aws",
  },
  {
    Title: "Earnings (Annual)",
    Price: "$215,000",
    class: "success",
    icon: "fa-brands fa-js",
  },
  {
    Title: "Tasks",
    Price: "50%",
    class: "info",
    icon: "fa-brands fa-python",
  },
  {
    Title: "Pending Requests",
    Price: "18",
    class: "warning",
    icon: "fa-brands fa-python",
  },
];
function Card() {
  return (
    <div className="row">
      {cardData.map((item, index) => {
        return (
          <div className="col-xl-3 col-md-6 mb-4" key={index}>
            <div className={`card border-left-${item.class} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      className={`text-xs font-weight-bold text-${item.class} text-uppercase mb-1`}
                    >
                      {item.Title}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {item.Title == "Tasks" ? "" : item.Price}
                    </div>
                    {item.Title == "Tasks" ? (
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            50%
                          </div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div
                              className="progress-bar bg-info w-50"
                              role="progressbar"
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-auto">
                    <i className={`${item.icon} fa-2x `}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
