"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const ProjectTable = ({ project }) => {
    const border = { border: "1px solid black" };
    return React.createElement(React.Fragment, null,
        React.createElement("br", null),
        "% Likelihood: ",
        project.percentLikelihood,
        React.createElement("br", null),
        React.createElement("table", { style: { ...border, borderCollapse: "collapse" } },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { style: border },
                        "Project: ",
                        project.name),
                    project.employees.map((e, i) => React.createElement("th", { key: i, style: border }, e.name)))),
            React.createElement("tbody", null, project.months.map((month, i) => React.createElement("tr", { key: i },
                React.createElement("td", { style: border }, month.month.name),
                month.employees.map((employee, i) => {
                    return React.createElement("td", { key: i, style: border }, employee.percentCommitted);
                }))))),
        React.createElement("br", null));
};
exports.ProjectTables = ({ data }) => React.createElement("div", null, data.teams.all.map(team => React.createElement(react_1.Fragment, { key: team.id },
    React.createElement("br", null),
    React.createElement("br", null),
    "Team ",
    team.leader.name,
    React.createElement("br", null),
    React.createElement("br", null),
    team.projects.map(project => React.createElement(ProjectTable, { project: project, key: project.id })),
    React.createElement("br", null),
    React.createElement("br", null))));
//# sourceMappingURL=ProjectTables.js.map