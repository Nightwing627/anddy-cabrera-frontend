import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddDeleteTableRows from "../../common/addDeleteTableRows";
import SelectAutocomplete from "../../common/SelectAutocomplete";
import TagInput from "../../common/tagInput";
import { EndPoint } from "../../common/Utils";

const endPointSolutions = EndPoint("solutions/me");
const updateSolutions = EndPoint("solutions/");
const endPointProject = EndPoint("projects/me?skip=0&limit=100");

function UpdateSolution() {
  const token = localStorage.getItem("accessToken");
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
    tags_in: undefined,
    links_in: [],
  });

  const [selectedTask, setSelectedTask] = useState();
  const [selectedProject, setSelectedProject] = useState();

  let { solution_id } = useParams();
  const navigate = useNavigate();

  const [showProjectError, setShowProjectError] = useState(false);
  const [showTaskError, setShowTaskError] = useState(false);
  const [apiError, setApiError] = useState("");

  const location = useLocation();
  const solutionList = location?.state?.solutionList;

  const [projectList, setProjectList] = useState([]);
  const [projectsName, setProjectsName] = useState([]);
  const [tasksName, setTasksName] = useState([]);
  const [validate, setValidate] = useState(false);

  const suggestions = ["python", "JavaScript", "AWS"];

  function post_solutions(data) {
    return new Promise((resolve, reject) => {
      fetch(`${updateSolutions}${solution_id}`, {
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

    if (!selectedProject) {
      setShowProjectError(true);
      setShowTaskError(true);
      return;
    }
    if (!selectedTask) {
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
        navigate("/solutions", {
          state: { msg: "Solution successfully Updated." },
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
    navigate("/solutions");
  };

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
      })
      .catch((error) => {

      });
  }, []);

  function get_solution() {
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
    if (projectList && projectList.length) {
      projectList.map((item) => {
        item.task.map((item2) => {
          if (item2.id === formData.task_id) {
            setSelectedTask(item2?.name);
            setSelectedProject(item?.name);
          }
        });
      });
    }
  }, [projectList, formData.task_id]);

  useEffect(() => {
    if (solutionList && solutionList.length > 0) {
      const getSolution = solutionList.filter(
        (item) => item.id === solution_id
      );
      if (getSolution.length > 0) {
        const modifiedData = {
          name: getSolution[0].name,
          description: getSolution[0].description || undefined,
          note: getSolution[0].note || undefined,
          language: getSolution[0].language || undefined,
          code: getSolution[0].code || undefined,
          project: formData.project,
          task: formData.task,
          is_public: false,
          task_id: getSolution[0].task_id || undefined,
          user_id: getSolution[0].user_id || undefined,
          tags_in: undefined,
          links_in: [],
        };

        modifiedData.tags_in = [];

        if (
          getSolution[0].solution_tag.length > 0 ||
          getSolution[0].solution_custom_tag.length > 0
        ) {
          getSolution[0].solution_tag.map((item) => {
            modifiedData.tags_in.push(item?.tag?.name);
          });

          getSolution[0].solution_custom_tag.map((item) => {
            modifiedData.tags_in.push(item?.custom_tag?.name);
          });
        }

        getSolution[0].solution_link.map((item) => {
          modifiedData.links_in.push({ name: item?.link?.name });
        });

        setFormData(modifiedData);
      }
    } else {
      get_solution()
        .then((response) => {
          const getSolution = response.filter(
            (item) => item.id === solution_id
          );
          if (getSolution.length > 0) {
            const modifiedData = {
              name: getSolution[0].name,
              description: getSolution[0].description || undefined,
              note: getSolution[0].note || undefined,
              language: getSolution[0].language || undefined,
              code: getSolution[0].code || undefined,
              project: formData.project,
              task: formData.task,
              is_public: false,
              task_id: getSolution[0].task_id || undefined,
              user_id: getSolution[0].user_id || undefined,
              tags_in: [],
              links_in: [],
            };

            getSolution[0].solution_tag.map((item) => {
              modifiedData.tags_in.push(item?.tag?.name);
            });

            getSolution[0].solution_custom_tag.map((item) => {
              modifiedData.tags_in.push(item?.custom_tag?.name);
            });

            getSolution[0].solution_link.map((item) => {
              modifiedData.links_in.push({ name: item?.link?.name });
            });

            setFormData(modifiedData);
          }
        })
        .catch((error) => {

        });
    }
  }, []);

  useEffect(() => {
    const getProject = projectList.filter(
      (item) => item.name === formData.project
    );
    if (getProject.length > 0) {
      const getTasksName = getProject[0].task.map((item) => item.name);
      setTasksName(getTasksName);
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

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 text-capitalize">Edit solution</h1>
        <a
          onClick={handleDataSave}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-edit fa-sm text-white-50"></i> Update
        </a>
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
                  <div className="form-group">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">
                      Project:
                    </div>
                    <SelectAutocomplete
                      suggestions={projectsName}
                      setSelection={(value) => {
                        setFormData({
                          ...formData,
                          project: value,
                          task: "",
                        });
                        setSelectedProject(value);
                        setSelectedTask("");
                      }}
                      requiredField={showProjectError}
                      value={selectedProject}
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
                      class="form-control"
                      placeholder="Solution Description"
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
                  <div className="mb-3">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">
                      Solution Tags:
                    </div>
                    {formData.tags_in && (
                      <TagInput
                        setFormData={setFormData}
                        formData={formData}
                        value={formData.tags_in}
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">
                      Solution Notes:
                    </div>
                    <textarea
                      class="form-control"
                      placeholder="Solution Notes"
                      rows="2"
                      name="note"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      value={formData.note}
                    ></textarea>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">Task:</div>
                    <SelectAutocomplete
                      suggestions={tasksName}
                      setSelection={(value) => {
                        setFormData({ ...formData, task: value });
                        setSelectedTask(value);
                      }}
                      requiredField={showTaskError}
                      value={selectedTask}
                    />
                  </div>
                  <div className="form-group">
                    <div className="pt-2 pb-2 mb-0 font-weight-bold">
                      Solution Links:
                    </div>
                    <AddDeleteTableRows
                      setFormData={setFormData}
                      formData={formData}
                      value={formData.links_in}
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
                      value={formData.language}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      class="form-control"
                      placeholder="Insert script here"
                      rows="2"
                      name="code"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      value={formData.code}
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
                  <span class="text">Update Solution</span>
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default UpdateSolution;
