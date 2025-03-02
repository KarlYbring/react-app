import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { createProject } = useContext(ProjectContext);
    const [statusOptions, setStatusOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [projectManagersOptions, setProjectManagersOptions] = useState([]);

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Fel vid hämtning från ${url}`);
            const data = await response.json();
            setter(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const endpoints = [
            { url: "https://localhost:7242/api/statuses", setter: setStatusOptions },
            { url: "https://localhost:7242/api/clients", setter: setClientOptions },
            { url: "https://localhost:7242/api/products", setter: setProductOptions },
            { url: "https://localhost:7242/api/employee", setter: setProjectManagersOptions }
        ];

        endpoints.forEach(({ url, setter }) => fetchData(url, setter));
    }, []);

    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        statusId: "",
        clientId: "",
        projectManagerId: "",
        productId: "",
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title: formData.projectName,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            statusId: formData.statusId,
            clientId: formData.clientId,
            projectManagerId: formData.projectManagerId,
            productId: formData.productId,
        };
        try {
            await createProject(payload);
            navigate("/projects");
        } catch (error) {
            console.error("Misslyckades med att skapa projekt:", error);
            alert("Något gick fel vid skapandet av projektet.");
        }
    };

    return (
        <div className="container bg-white p-6 rounded-lg shadow-lg">
            <h2 className="section-title">Skapa nytt projekt</h2>
            <form onSubmit={handleSubmit}>
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>Projektnamn</th>
                            <th>Beskrivning</th>
                            <th>Startdatum</th>
                            <th>Slutdatum</th>
                            <th>Status</th>
                            <th>Projektledare</th>
                            <th>Kund</th>
                            <th>Tjänst</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required /></td>
                            <td><textarea name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea></td>
                            <td><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required /></td>
                            <td><input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required /></td>
                            <td>
                                <select name="statusId" value={formData.statusId} onChange={handleChange} required>
                                    <option value="">Välj status</option>
                                    {statusOptions.map(({ id, statusName }) => (
                                        <option key={id} value={id}>{statusName}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="projectManagerId" value={formData.projectManagerId} onChange={handleChange} required>
                                    <option value="">Välj Projektledare</option>
                                    {projectManagersOptions.map(({ id, firstName, lastName }) => (
                                        <option key={id} value={id}>{firstName} {lastName}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="clientId" value={formData.clientId} onChange={handleChange} required>
                                    <option value="">Välj kund</option>
                                    {clientOptions.map(({ id, clientName }) => (
                                        <option key={id} value={id}>{clientName}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select name="productId" value={formData.productId} onChange={handleChange} required>
                                    <option value="">Välj tjänst</option>
                                    {productOptions.map(({ id, productName }) => (
                                        <option key={id} value={id}>{productName}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button type="button" className="btn btn-cancel" onClick={() => navigate("/projects")}>Avbryt</button>
                    <button type="submit" className="btn btn-primary">Spara</button>
                </div>
            </form>
        </div>
    );
};

export default ProjectDetails;
