import { createContext, useEffect, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const apiUri = "https://localhost:7242/api/projects";

    const defaultProjectValues = {
        id: 0,
        title: "SKAPA NYTT",
        description: "",
        status: {},
        startDate: "",
        endDate: "",
        projectManagerId: { fullName: "" },
        clientId: {},
        product: {},
    };

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(defaultProjectValues);


    const fetchApi = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`API-fel: ${response.status}`);
            return response.json();
        } catch (error) {
            console.error("API-fel:", error);
            throw error;
        }
    };

    const getProjects = async () => {
        try {
            const data = await fetchApi(apiUri);
            setProjects(data);
        } catch (error) {
            console.error("Fel vid hämtning av projekt");
        }
    };

    const getProject = async (id) => {
        try {
            const data = await fetchApi(`${apiUri}/${id}`);
            setProject(data);
        } catch (error) {
            console.error("Fel vid hämtning av projekt");
        }
    };

    const createProject = async (newProject) => {
        try {
            const createdProject = await fetchApi(apiUri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });

            setProjects((prev) => [...prev, createdProject]);
        } catch (error) {
            console.error("Fel vid skapandet av projekt");
        }
    };

    const updateProject = async (id, updatedProject) => {
        try {
            await fetchApi(`${apiUri}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProject),
            });

            setProjects((prevProjects) =>
                prevProjects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
            );
        } catch (error) {
            console.error("Fel vid uppdatering av projekt");
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ project, projects, getProjects, getProject, createProject, updateProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
