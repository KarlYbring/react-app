import { useEffect, useState } from "react";
import { createContext } from "react";

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const apiUri = 'https://localhost:7081/api/statuses';
    const [statuses, setStatuses] = useState([]);

    const getStatuses = async () => {
        const res = await fetch(`${apiUri}`);
        const data = await res.json();
        setStatuses(data);
    };

    useEffect(() => {
        getStatuses();
    }, []);

    return (
        <StatusContext.Provider value={{ statuses, getStatuses }}>
            {children}
        </StatusContext.Provider>
    );
};

