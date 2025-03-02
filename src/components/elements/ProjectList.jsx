import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

const ProjectList = () => {
    const { projects } = useContext(ProjectContext);
    const navigate = useNavigate();

    return (
        <table className="project-list">
            <thead>
                <tr>
                    <th>PROJEKTNUMMER</th>
                    <th>PROJEKTNAMN</th>
                    <th>BESKRIVNING</th>
                    <th>START</th>
                    <th>SLUT</th>
                    <th>STATUS</th>
                    <th>PROJEKTLEDARE</th>
                    <th>UPPDATERA</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => ( 
                    <tr key={project.id} className="cursor-pointer hover:bg-gray-200">
                        <td>{project.id}</td>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>{project.startDate}</td>
                        <td>{project.endDate}</td>
                        <td>{project.status?.statusName}</td>
                        <td>{project.projectManager?.fullName}</td>
                        <td>
                            <button 
                                className="btn btn-yellow"
                                onClick={() => navigate(`/projects/edit/${project.id}`)}
                            >
                                Redigera
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectList;