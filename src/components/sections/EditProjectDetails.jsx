import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getProject, project, updateProject } = useContext(ProjectContext);

    const [statusOptions, setStatusOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [projectManagersOptions, setProjectManagersOptions] = useState([]);

    //chatGPT genererad för att hämta all data samtidigt.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusRes, clientRes, productRes, managerRes] = await Promise.all([
                    fetch("https://localhost:7242/api/statuses"),
                    fetch("https://localhost:7242/api/clients"),
                    fetch("https://localhost:7242/api/products"),
                    fetch("https://localhost:7242/api/employee")
                ]);

                setStatusOptions(await statusRes.json());
                setClientOptions(await clientRes.json());
                setProductOptions(await productRes.json());
                setProjectManagersOptions(await managerRes.json());
            } catch (error) {
                console.error("Fel vid hämtning av alternativ:", error);
            }
        };

        fetchData();
    }, []);
    //tomma fält för alla data
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

    useEffect(() => {
        if (id) {
            getProject(id);
        }
    }, [id]);

     //om den hittar id med getprojects så fyller den i alla info som id har
    useEffect(() => {
        if (project?.id) {
            setFormData({
                projectName: project.title || "",
                description: project.description || "",
                startDate: project.startDate || "",
                endDate: project.endDate || "",
                statusId: project.status?.id || "",
                clientId: project.client?.id || "",
                projectManagerId: project.projectManager?.id || "",
                productId: project.product?.id || "",
            });
        }
    }, [project]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

     //ändrar och skickar iväg ny info och uppdaterar projektet
    const handleSubmit = async (e) => {
        e.preventDefault();
        //fått hjälp med av chatGPT med att omvandla alla stränga till Number.
        const payload = {
        id: Number(id),
        title: formData.projectName,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        statusId: Number(formData.statusId),
        clientId: Number(formData.clientId),
        projectManagerId: Number(formData.projectManagerId),
        productId: Number(formData.productId),
        };

        //chatGPT genererard kod som gör PUT förfrågan och hanterar fel samt navigerar tillbaka till alla projekt efter lyckad update.
        try {
            const response = await fetch(`https://localhost:7242/api/projects/${id}`, { 
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload),
            });
             
            if (response.ok) {
                navigate("/projects");
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Misslyckades med att uppdatera projektet. Status:", response.status);
                console.error(" API-fel:", errorData);
            }
        } catch (error) {
            console.error("Fel vid uppdatering av projekt:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="section-title">Uppdatera projekt</h2>
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
                                    <option value="">Välj projektledare</option>
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
                    <button type="button" className="btn" onClick={() => navigate("/projects")}>Avbryt</button>
                    <button type="submit" className="btn btn-primary">Spara ändringar</button>
                </div>
            </form>
        </div>
    );
};

export default EditProjectDetails;
