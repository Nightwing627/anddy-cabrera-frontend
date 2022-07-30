import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

function Links({ links }) {
  const [linkData, setLinkData] = useState([]);
  const truncate = (input) =>
    input?.length > 20 ? `${input.substring(0, 20)}...` : input;

  useEffect(() => {
    const modifiedData =
      links.length > 0 &&
      links.map((item) => {
        return {
          Title: item.link.name,
        };
      });

    modifiedData && modifiedData.length > 0 && setLinkData(modifiedData);
  }, [links]);

  return (
    <div className="col-lg-12 mb-4">
      <Card className="shadow mb-4">
        <Card.Header className="py-3">
          <h6 class="m-0 font-weight-bold text-primary">Solution Link(s)</h6>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <tbody>
              <thead>
                <tr>Link(s)</tr>
              </thead>
              {linkData.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <a target="_blank" rel="nofollow" href={item.Title}>
                          <span class="font-weight-bold text-gray-800">
                            {index + 1} -{" "}
                          </span>{" "}
                          Open link {truncate(item.Title)} &rarr;
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Links;
