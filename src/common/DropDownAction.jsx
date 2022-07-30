import React from "react";
import "../App.css";

function DropDownAction({ data, onReturn }) {
  const handleDropDown = (item) => {
    let id = item.id
    onReturn({
      id,
      type: 'delete',
    })
  }
  return (
    <>
      <div className="dropdown no-arrow">
        <a
          className="dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
          aria-labelledby="dropdownMenuLink"
        >
          <div className="dropdown-header">{data.Title}</div>
          {data.values.map((item, index) => {
            return (
              <>
                <a onClick={() => handleDropDown(item)} className="dropdown-item dropdown-cursor" href={item.to} key={index}>
                  {item.Title}
                </a>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DropDownAction;
