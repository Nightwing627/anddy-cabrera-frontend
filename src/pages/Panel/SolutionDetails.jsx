import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import CardTag from "../../common/CardTag";
import ChartWrapper from "../../common/ChartWrapper";
import CodeCard from "../../common/CodeCard";
import GenericCard from "../../common/GenericCard";
import IllustrationsCard from "../../common/IllustrationsCard";
import Links from "../../common/Links";
import TextCard from "../../common/TextCard";
import { EndPoint } from "../../common/Utils";

const endPointSolutions = EndPoint("solutions/me?skip=0&limit=100");

function SolutionDetail() {
  const token = localStorage.getItem("accessToken");
  let { solution_id } = useParams();
  const location = useLocation();
  const solutionList = location?.state?.solutionList;
  const [solution, setSolution] = useState({});
  const [tags, setTags] = useState([]);

  function get_project() {
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
    if (solutionList && solutionList.length > 0) {
      const getSolution = solutionList.filter(
        (item) => item.id === solution_id
      );
      setSolution(getSolution.length && getSolution[0]);

      var target = [];

      if (getSolution[0].solution_tag) {
        getSolution[0].solution_tag.map((item, index) => {
          target.push({
            Title: `Tag ${index + 1}`,
            Price: item?.tag?.name,
            class: "info",
            icon: `fa-brands fa-${item?.tag?.name?.toLowerCase()}`,
          });
        });
      }

      if (getSolution[0].solution_custom_tag) {
        getSolution[0].solution_custom_tag.map((item, index) => {
          target.push({
            Title: `Tag ${target.length + 1}`,
            Price: item?.custom_tag?.name,
            class: "info",
            icon: `fa-brands fa-${item?.custom_tag?.name?.toLowerCase()}`,
          });
        });
      }

      setTags(target);
    } else {
      get_project()
        .then((response) => {
          const getSolution = response.filter(
            (item) => item.id === solution_id
          );
          setSolution(getSolution.length && getSolution[0]);

          var target = [];

          if (getSolution[0].solution_tag) {
            getSolution[0].solution_tag.map((item, index) => {
              target.push({
                Title: `Tag ${index + 1}`,
                Price: item?.tag?.name,
                class: "info",
                icon: `fa-brands fa-${item?.tag?.name?.toLowerCase()}`,
              });
            });
          }

          if (getSolution[0].solution_custom_tag) {
            getSolution[0].solution_custom_tag.map((item, index) => {
              target.push({
                Title: `Tag ${target.length + 1}`,
                Price: item?.custom_tag?.name,
                class: "info",
                icon: `fa-brands fa-${item?.custom_tag?.name?.toLowerCase()}`,
              });
            });
          }

          setTags(target);
        })
        .catch((error) => {
          alert(error.detail);
        });
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 text-capitalize">
          {solution.name}
        </h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      <div className="row">
        <div className="column w-50">
          <div className="w-100">
            {solution.description && (
              <TextCard
                title="Solution Description"
                value={solution.description}
              />
            )}
            {solution.note && (
              <TextCard title="Solution Notes" value={solution.note} />
            )}
          </div>
        </div>
        <div className="column w-50">
          {solution.solution_link && solution.solution_link.length > 0 && (
            <Links links={solution.solution_link} />
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="col-lg-12 mb-4">
            <Card>
              <Card.Header className="py-3">
                <h6 class="m-0 font-weight-bold text-primary">Solution Tags</h6>
              </Card.Header>
              <Card.Body>
                <CardTag tags={tags} />
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      {solution.code && (
        <CodeCard code={solution.code} language={solution.language} />
      )}
    </div>
  );
}

export default SolutionDetail;
