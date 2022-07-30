import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EndPoint } from "../../common/Utils";

const endPointProjects = EndPoint("projects/me");
const updateProjects = EndPoint("projects/");

function UpdateProject() {
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    description: undefined,
    user_id: undefined,
  });

  let { project_id } = useParams();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");

  const location = useLocation();
  const [validate, setValidate] = useState(false);

  function post_projects(data) {
    return new Promise((resolve, reject) => {
      fetch(`${updateProjects}${project_id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          response.json().then((body) => {
            if (response.ok) {
              resolve(body);
            } else {
              reject(body);
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const handleDataSave = (e) => {
    e.preventDefault();

    if (!formData.name) {
      setValidate(true);
      return;
    }

    const data = { ...formData };

    post_projects(data)
      .then((res) => {
        navigate("/projects", {
          state: { msg: "Project successfully Updated." },
        });
      })
      .catch((error) => {
        setApiError(error.detail);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      });
  };

  const handleClose = () => {
    navigate("/projects");
  };

  function get_project() {
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
              reject(body);
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  useEffect(() => {
    get_project()
      .then((response) => {
        const getProject = response.filter(
          (item) => item.id === project_id
        );
        if (getProject.length > 0) {
          const modifiedData = {
            name: getProject[0].name,
            description: getProject[0].description || undefined,
            user_id: getProject[0].user_id || undefined,
          };

          setFormData(modifiedData);
        }
      })
      .catch((error) => {

      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 text-capitalize">Edit project</h1>
        <div>
            <a
              href="#"
              class="btn btn-secondary btn-icon-split btn-sm mr-2"
              onClick={handleClose}
            >
              <span class="icon text-white-50">
                <i class="fas fa-close"></i>
              </span>
              <span class="text">Close</span>
            </a>
            <a
              onClick={handleDataSave}
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-edit fa-sm text-white-50"></i> Update
            </a>
        </div>
      </div>
      {apiError && (
        <div class="alert alert-error" role="alert">
          {apiError}
        </div>
      )}

      <div className="d-flex justify-content-center align-items-start flex-column">
        <Card className="shadow mb-4 w-100">
          <Card.Body className="p-3">
            <form onSubmit={handleDataSave}>
              <div className="mb-4 row">
                <div className="col">
                  <Form
                    id="form-validation"
                    noValidate
                    validated={!formData.name && validate}
                    autocomplete="on"
                  >
                    <Form.Group className="mb-3">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Project Name:
                      </div>
                      <Form.Control
                        id="name"
                        type="text"
                        className="form-control background-remove"
                        name="name"
                        required
                        placeholder="Project Name"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Project Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                  <div className="form-group">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">
                      Project Description:
                    </div>
                    <textarea
                      class="form-control"
                      placeholder="Project Description"
                      rows="2"
                      name="description"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      value={formData.description}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <a
                  href="#"
                  class="btn btn-secondary btn-icon-split btn-sm mr-2"
                  onClick={handleClose}
                >
                  <span class="icon text-white-50">
                    <i class="fas fa-close"></i>
                  </span>
                  <span class="text">Close</span>
                </a>
                <button
                  type="submit"
                  class="btn btn-primary btn-icon-split btn-sm"
                >
                  <span class="icon text-white-50">
                    <i class="fas fa-edit"></i>
                  </span>
                  <span class="text">Update Project</span>
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProject;
