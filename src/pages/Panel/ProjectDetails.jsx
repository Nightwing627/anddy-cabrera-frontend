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

function ProjectDetails() {

	return (
		<div className="container-fluid">

		</div>
	);
}

export default ProjectDetails;
