import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import { EndPoint } from "../../common/Utils";
import DropDownAction from "../../common/DropDownAction";

const endPointSolutions = EndPoint("solutions/me?skip=0&limit=100");
const deleteSolutions = EndPoint("solutions/");

var tableColumns = [
  { title: "Name", prop: "Name" },
  { title: "Description", prop: "Description"},
  { title: "Note", note: "Note" },
  { title: "Language", prop: "Language" },
  { title: "Visibility", prop: "Visibility" },
  { title: "Created", prop: "Created" },
  { title: "", prop: "" },
];

function TablePageComponent() {
  const token = localStorage.getItem("accessToken");
  const [solutionList, setSolutiontList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigation = useNavigate();

  function get_solutions() {
    return new Promise((resolve, reject) => {
      fetch(endPointSolutions, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((body) => {
            if (response.ok) {
              resolve(body);
            } else {
              console.log(response.status);
              reject(body);
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function delete_solution(solution_id) {
    return new Promise((resolve, reject) => {
      fetch(`${deleteSolutions}${solution_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            resolve("yes")
          } else {
            reject("no")
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  useEffect(() => {
    get_solutions()
      .then((res) => {
        setSolutiontList(res);
      })
      .catch((error) => {
       
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleRowClick = (row) => {
    navigation(`solution-detail/${row}`, {state:{solutionList: solutionList}});
  }

  const onReturnData = async (data) => {
    if(data.type === "delete") {
      let selectedId = data.id
      delete_solution(selectedId)
        .then((res) => {
          console.log("table comp delete")
          navigation("/solutions", {
            state: { msg: "Solution successfully Deleted." },
          });
          window.location.reload();
        })
        .catch((error) => {
         
        });
    }
  }  

  return (
    <div>
      {/* <h1 class="h3 mb-2 text-gray-800">Tables</h1>
      <p class="mb-4">
        DataTables is a third party plugin that is used to generate the demo
        table below. For more information about DataTables, please visit the{" "}
        <a target="_blank" href="https://datatables.net">
          official DataTables documentation
        </a>
        .
      </p> */}

      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Your Solutions</h6>          
        </div>
        <div class="card-body">
          <div id="dataTable_filter" class="d-flex align-items-center justify-content-between">
            <div/>
            <label class="d-flex align-items-center">Search: 
              <input 
                  type="search" 
                  class="ml-2 form-control form-control-sm" 
                  placeholder="" 
                  onChange={handleChange}
                  value={searchInput}
                  aria-controls="dataTable"/>
            </label>
          </div>
          <div class="table-responsive">
            <table
              class="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  {tableColumns.map((item) => (
                    <th>{item.title}</th>
                  ))}
                </tr>
              </thead>
              <tfoot>
                <tr>
                  {tableColumns.map((item) => (
                    <th>{item.title}</th>
                  ))}
                </tr>
              </tfoot>
              <tbody>
                {solutionList && solutionList.length > 0 ? (
                  solutionList.filter((item) => {
                    if(searchInput === '') {
                      return item;
                    } else if(
                      (!!item.name && item.name.toLowerCase().includes(searchInput.toLowerCase())) || 
                      (!!item.description && item.description.toLowerCase().includes(searchInput.toLowerCase())) ||
                      (!!item.note && item.note.toLowerCase().includes(searchInput.toLowerCase())) ||
                      (!!item.language && item.language.toLowerCase().includes(searchInput.toLowerCase())) ||
                      (!!item.created_at && item.created_at.toLowerCase().includes(searchInput.toLowerCase()))
                    ) {
                      return item;
                    }
                  }).map((item, key) => {
                    const DropDownData = {
                      values: [
                        { Title: "Edit Solution", to: `solutions/update-solution/${item.id}`},
                        { Title: "Delete Solution", id: item.id },
                        { Title: "Show Detail" },
                      ],
                    };
                    return (
                    <tr key={key}>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{item.name}</td>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{item.description}</td>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{item.note}</td>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{item.language}</td>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{item.is_public ? "Public" : "Private"}</td>
                      <td style={{ cursor: 'pointer' }} onClick={()=> handleRowClick(item.id)}>{Moment(item.created_at).format("MMM Do YY")}</td>
                      <td className="text-center"> 
                      <DropDownAction data={DropDownData} onReturn={(data) => onReturnData(data)} />   
                      </td>
                    </tr>
                  )})
                ) : (
                  <tr class="odd">
                    <td valign="top" colspan="6" class="dataTables_empty">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablePageComponent;
