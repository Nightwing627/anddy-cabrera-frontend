import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AddDeleteTableRows from "../../common/addDeleteTableRows";
import SelectAutocomplete from "../../common/SelectAutocomplete";
import TagInput from "../../common/tagInput";
import { EndPoint } from "../../common/Utils";
import TablePageComponent from "./TableComp";

const endPointSolutions = EndPoint("solutions");
const endPointProject = EndPoint("projects/me?skip=0&limit=100");

function MainIndex() {
  const token = localStorage.getItem("accessToken");
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: undefined,
    note: undefined,
    language: undefined,
    code: undefined,
    project: undefined,
    task: undefined,
    is_public: false,
    task_id: undefined,
    user_id: undefined,
    tags_in: [],
    links_in: [],
  });

  const [showProjectError, setShowProjectError] = useState(false);
  const [showTaskError, setShowTaskError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [successEditMsg, setSuccessEditMsg] = useState("");
  const [validate, setValidate] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [projectsName, setProjectsName] = useState([]);
  const [tasksName, setTasksName] = useState([]);

  const handleClick = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
  };

  const suggestions = ["python", "JavaScript", "AWS"];

  const location = useLocation();

  useEffect(() => {
    const locationState = location?.state;

    setSuccessEditMsg(locationState?.msg);

    setTimeout(() => {
      setSuccessEditMsg("");
      window.history.replaceState({}, document.title);
    }, 3000);
  }, []);

  function get_project() {
    return new Promise((resolve, reject) => {
      fetch(
        endPointProject,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
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
        const getProjectsName = response.map((item) => item.name);
        setProjectsName(getProjectsName);
        setProjectList(response);
        setFormData({ ...formData, project: getProjectsName[0] });
      })
      .catch((error) => {
       
      });
  }, []);

  useEffect(() => {
    const getProject = projectList.filter(
      (item) => item.name === formData.project
    );
    if (getProject.length > 0) {
      const getTasksName = getProject[0].task.map((item) => item.name);
      setTasksName(getTasksName);
      setFormData({ ...formData, task: getTasksName[0] });
    }
  }, [formData.project]);

  useEffect(() => {
    const getProject = projectList.filter(
      (item) => item.name === formData.project
    );
    if (getProject.length > 0) {
      const getTask = getProject[0].task.filter(
        (item) => item.name === formData.task
      );
      setFormData({
        ...formData,
        task_id: getTask[0]?.id,
        user_id: getTask[0]?.user_id,
      });
    }
  }, [formData.task]);

  function post_solutions(data) {
    return new Promise((resolve, reject) => {
      fetch(endPointSolutions, {
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

    if (!formData.project) {
      setShowProjectError(true);
      setShowTaskError(true);
      return;
    }
    if (!formData.task) {
      setShowTaskError(true);
      return;
    }

    if (!formData.name) {
      setValidate(true);
      return;
    }

    const data = { ...formData };
    delete data.task;
    delete data.project;
    delete data.links_in;
    delete data.tags_in;

    const modifiedData = {
      solution_in: data,
    };

    if (formData.tags_in.length) {
      modifiedData.tags_in = formData.tags_in;
    }

    if (formData.links_in.length) {
      modifiedData.links_in = formData.links_in;
    }

    post_solutions(modifiedData)
      .then((res) => {
        setSuccessMsg("Solution successfully added.");

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
          <h1 className="h3 mb-0 text-gray-800">Solutions</h1>
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
          <h1 className="h3 mb-0 text-gray-800">Create Solution</h1>
          <p className="mb-4">
            Create Solution is a third party plugin that is used to generate the
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
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Project:
                      </div>
                      <SelectAutocomplete
                        suggestions={projectsName}
                        setSelection={(value) =>
                          setFormData({ ...formData, project: value })
                        }
                        requiredField={showProjectError}
                        value={formData.project}
                        isEditable
                      />
                    </div>

                    <Form
                      id="form-validation"
                      noValidate
                      validated={!formData.name && validate}
                      autocomplete="on"
                    >
                      <Form.Group className="mb-3">
                        <div className="pt-2 pb-2 mb-0 font-weight-bold">
                          Solution Name:
                        </div>
                        <Form.Control
                          id="name"
                          type="text"
                          className="form-control background-remove"
                          name="name"
                          required
                          placeholder="Solution Name"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          value={formData.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter Solution Name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Solution Description:
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Solution Description"
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
                    <div className="mb-3">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Solution Tags:
                      </div>
                      <TagInput setFormData={setFormData} formData={formData} />
                    </div>
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Solution Notes:
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Solution Notes"
                        rows="2"
                        name="note"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Task:
                      </div>
                      <SelectAutocomplete
                        suggestions={tasksName}
                        setSelection={(value) =>
                          setFormData({ ...formData, task: value })
                        }
                        requiredField={showTaskError}
                        value={formData.task}
                        isEditable
                      />
                    </div>
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Solution Links:
                      </div>
                      <AddDeleteTableRows
                        setFormData={setFormData}
                        formData={formData}
                      />
                    </div>
                    <div className="form-group">
                      <div className="pt-2 pb-2 mb-0 font-weight-bold">
                        Script:
                      </div>
                      <SelectAutocomplete
                        suggestions={suggestions}
                        setSelection={(value) =>
                          setFormData({ ...formData, language: value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Insert script here"
                        rows="2"
                        name="code"
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
                    <span className="text">Save Solution</span>
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
            <span className="text">Add Solution</span>
          </a>
        </div>
      )}
      {!openForm && <TablePageComponent />}
     

    </div>
  );
}

export default MainIndex;
