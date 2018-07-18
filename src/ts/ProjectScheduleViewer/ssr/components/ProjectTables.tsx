import * as React from "react";
import {CSSProperties, Fragment, SFC} from "react";
import {Data} from "../../share/Data";
import {Project} from "../../share/Project";

const ProjectTable: SFC<{project: Project}> = ({project}) => {
    const border: CSSProperties = {border: "1px solid black"};
    return <>
        <br/>
        % Likelihood: {project.percentLikelihood}
        <br/>
        <table style={{...border, borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th style={border}>Project: {project.name}</th>
                    {project.employees.map((e, i) => <th key={i} style={border}>{e.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {project.months.map((month, i) =>
                    <tr key={i}>
                        <td style={border}>{month.month.name}</td>
                        {month.employees.map((employee, i) => {
                            return <td key={i} style={border}>{employee.percentCommitted}</td>;
                        })}
                    </tr>)}
            </tbody>
        </table>
        <br/>
    </>;
};

export const ProjectTables: SFC<{data: Data}> = ({data}) => <div>
    {data.teams.all.map(team => <Fragment key={team.id}>
        <br/>
        <br/>
        Team {team.leader.name}
        <br/>
        <br/>
        {team.projects.map(project => <ProjectTable project={project} key={project.id}/>)}
        <br/>
        <br/>
    </Fragment>)}
</div>;