import React from "react";

function Collapse({ data }) {
  return (
    <>
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target={"#collapse" + data.title}
        aria-expanded="true"
        aria-controls={"collapse" + data.title}
      >
        <i className={data.icon}></i>
        <span>{data.title}</span>
      </a>
      <div
        id={"collapse" + data.title}
        className="collapse"
        aria-labelledby={"heading" + data.title}
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          {data.values.map((item) => {
            return (
              <>
                <h6 className="collapse-header">{item.title}</h6>
                {item.values.map((item2) => {
                  return (
                    <>
                      <a className="collapse-item" href="#">
                        {item2.title}
                      </a>
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Collapse;
