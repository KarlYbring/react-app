import { useEffect, useState } from "react";
import { createContext } from "react";

export const ProjectManagerContext = createContext();

export const ProjectManagerProvider = ({ children }) => {
    const apiUri = 'https://localhost:7242/api/employee';
    const [projectManager, setProjectManagers] = useState([]);

    const getProjectManagers = async () => {
        const res = await fetch(`${apiUri}`);
        const data = await res.json();
        setProjectManagers(data);
    };

    useEffect(() => {
        getProjectManagers();
    }, []);

    return (
        <ProjectManagerContext.Provider value={{ ProjectManagers, getProjectManagers }}>
    {children}
</ProjectManagerContext.Provider>
    );
};
