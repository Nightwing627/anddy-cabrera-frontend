import React, { useEffect, useState } from "react";
import TableRows from "./tableRows";

function AddDeleteTableRows({ setFormData, formData, value }) {
  const [rowsData, setRowsData] = useState([
    {
      link: "",
    },
  ]);

  useEffect(() => {
    const modifiedData = [];
    value?.map((item) => {
      modifiedData.push({
        link: item.name,
      });
    });

    modifiedData.length > 0 && setRowsData(modifiedData);
  }, [value]);

  const addTableRows = (event) => {
    event.preventDefault();
    const rowsInput = {
      link: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index, event) => {
    event.preventDefault();
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);

    const getLinks = [...formData.links_in];
    getLinks.splice(index, 1);
    setFormData({
      ...formData,
      links_in: [...getLinks],
    });
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
    const getLinks = [...formData.links_in];
    getLinks[index] = { name: value };
    setFormData({
      ...formData,
      links_in: [...getLinks],
    });
  };
  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr className="text-center form-group font-weight-bold">
              <th className="border-top-0 border-bottom border-1">#</th>
              <th className="border-top-0 border-bottom border-1">Link(s)</th>
              <th className="border-top-0 border-bottom border-1">
                <button
                  className="btn btn-outline-success"
                  onClick={addTableRows}
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRows
              rowsData={rowsData}
              deleteTableRows={deleteTableRows}
              handleChange={handleChange}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AddDeleteTableRows;
