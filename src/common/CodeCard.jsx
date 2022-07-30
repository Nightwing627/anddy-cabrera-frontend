import React from "react";
import CodeComponent from "./CodeComponent";
import DropDownAction from "./DropDownAction";

const DropDownData = {
  Title: "Actions:",
  values: [{ Title: "Edit" }, { Title: "Delete" }, { Title: "Maximize" }],
};

function CodeCard({ code, language }) {
  const showLineNumbers = true;
  const startingLineNumber = 1;
  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Solution Code</h6>
            <DropDownAction data={DropDownData} />
          </div>
          <div className="card-body">
            <CodeComponent
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              startingLineNumber={startingLineNumber}
            />
            <div className="mt-4 text-center small">
              <span className="mr-2">
                <i className="fas fa-circle text-primary"></i> {language}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeCard;
