import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { EndPoint } from "../../common/Utils";
import ProjectPageComponent from "./ProjectComp";

const endPointProjects = EndPoint("projects");
const endPointMe = EndPoint("users/me");

function MainPIndex() {
  const token = localStorage.getItem("accessToken");
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: undefined,
  });

  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [successEditMsg, setSuccessEditMsg] = useState("");
  const [validate, setValidate] = useState(false);

  const [userId, setUserId] = useState("");

  const handleClick = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
  };

  const location = useLocation();

  useEffect(() => {
    async function getMe() {
      return fetch(
        endPointMe,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        response.json().then((body) => {
          const userId = body.id
          setUserId(userId)
        });
      }).catch((error) => {
        console.log("error=>", error)
      });
    }
    getMe();

    const locationState = location?.state;

    setSuccessEditMsg(locationState?.msg);

    setTimeout(() => {
      setSuccessEditMsg("");
      window.history.replaceState({}, document.title);
    }, 3000);

  }, []);

  function post_projects(data) {
    return new Promise((resolve, reject) => {
      fetch(endPointProjects, {
        method: "POST",
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

    const data = { ...formData, "user_id": userId };

    post_projects(data)
      .then((res) => {
        setSuccessMsg("Project successfully added.");

        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
        setOpenForm(false);
      })
      .catch((error) => {
        setApiError(error.detail);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      });
  };

  return (
    <div className="container-fluid">
      {!openForm ? (
        <>
          <h1 className="h3 mb-0 text-gray-800">Projects</h1>
          <p className="mb-4">
            Dashboard is a third party plugin that is used to generate the demo
            table below. For more information about DataTables, please visit the{" "}
            <a target="_blank" href="https://datatables.net">
              official DataTables documentation
            </a>
            .
          </p>
          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
          {successEditMsg && (
            <div className="alert alert-success" role="alert">
              {successEditMsg}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="h3 mb-0 text-gray-800">Create Project</h1>
          <p className="mb-4">
            Create Project is a third party plugin that is used to generate the
            demo table below. For more information about DataTables, please
            visit the{" "}
            <a target="_blank" href="https://datatables.net">
              official DataTables documentation
            </a>
            .
          </p>
          {apiError && (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          )}
        </>
      )}
      {openForm ? (
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
                        className="form-control"
                        placeholder="Project Description"
                        rows="2"
                        name="description"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <a
                    href="#"
                    className="btn btn-secondary btn-icon-split btn-sm mr-2"
                    onClick={handleClose}
                  >
                    <span className="icon text-white-50">
                      <i className="fas fa-close"></i>
                    </span>
                    <span className="text">Close</span>
                  </a>
                  <button
                    type="submit"
                    className="btn btn-primary btn-icon-split btn-sm"
                  >
                    <span className="icon text-white-50">
                      <i className="fas fa-save"></i>
                    </span>
                    <span className="text">Save Project</span>
                  </button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="mb-4">
          <a
            className="btn btn-primary btn-icon-split btn-sm"
            onClick={handleClick}
          >
            <span className="icon text-white-50">
              <i className="fas fa-plus"></i>
            </span>
            <span className="text">Add Project</span>
          </a>
        </div>
      )}
      {!openForm && <ProjectPageComponent />}
    </div>
  );
}

export default MainPIndex;
