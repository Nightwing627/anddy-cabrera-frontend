import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EndPoint } from "../../common/Utils";
import DropDownAction from "../../common/DropDownAction";
import DModal from "../../common/Modal";

const endPointProjects = EndPoint("projects/me?skip=0&limit=100");
const deleteProjects = EndPoint("projects/");

function ProjectPageComponent() {
  const token = localStorage.getItem("accessToken");
  const [projectList, setProjectList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [deletedId, setDeletedId] = useState("")
  const navigation = useNavigate();

  function get_projects() {
    return new Promise((resolve, reject) => {
      fetch(endPointProjects, {
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

  function delete_project(project_id) {
    return new Promise((resolve, reject) => {
      fetch(`${deleteProjects}${project_id}`, {
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
    get_projects()
      .then((res) => {
        setProjectList(res);
      })
      .catch((error) => {

      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onReturnData = async (data) => {
    if (data.type === "delete") {
      let selectedId = data.id
      setDeletedId(selectedId)
      setModalShow(true);      
    }
  }

  const handleYesClick = () => {
    setModalShow(false)
    delete_project(deletedId)
      .then((res) => {
        console.log("project comp delete")
        navigation("/projects", {
          state: { msg: "Project successfully Deleted." },
        });
        window.location.reload();
      })
      .catch((error) => {

      });
  }

  return (
    <div>
      <DModal
        show={modalShow}
        onYes={() => handleYesClick()}
        onNo={() => setModalShow(false)}
      />
      <div class="card shadow mb-4">
        <div class="card-body">
          <div id="dataTable_filter" class="d-flex align-items-center justify-content-between">
            <div />
            <label class="d-flex align-items-center">Search:
              <input
                type="search"
                class="ml-2 form-control form-control-sm"
                placeholder=""
                onChange={handleChange}
                value={searchInput}
                aria-controls="dataTable" />
            </label>
          </div>
          <div class="container-fluid">
            <div class="row">
              {projectList && projectList.length > 0 ? (
                projectList.filter((item) => {
                  if (searchInput === '') {
                    return item;
                  } else if (
                    (!!item.name && item.name.toLowerCase().includes(searchInput.toLowerCase())) ||
                    (!!item.description && item.description.toLowerCase().includes(searchInput.toLowerCase())) ||
                    (!!item.created_at && item.created_at.toLowerCase().includes(searchInput.toLowerCase()))
                  ) {
                    return item;
                  }
                }).map((item, key) => {
                  const DropDownData = {
                    values: [
                      { Title: "Edit Project", to: `projects/update-project/${item.id}` },
                      { Title: "Delete Project", id: item.id },
                      // { Title: "Show Detail" },
                    ],
                  };
                  return (
                    <div class="col-lg-6">
                      <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">{item.name}</h6>
                          <DropDownAction data={DropDownData} onReturn={(data) => onReturnData(data)} />
                        </div>
                        <div className="card-body">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )
                })) : (
                <div>
                  No project data available.
                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPageComponent;