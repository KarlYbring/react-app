import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectListItem = ({ project }) => {
    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/projects/${project.id}`)}>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.startDate}</td>
            <td>{project.endDate}</td>
            <td>{project.projectManager?.fullName || "Ingen projektledare"}</td>
        </tr>
    );
}

export default ProjectListItem;
