import { useEffect, useState } from "react";
import { createContext } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const apiUri = 'https://localhost:7242/api/clients';
    const [Clients, setClients] = useState([]);

    const getClients = async () => {
        const res = await fetch(`${apiUri}`);
        const data = await res.json();
        setClients(data);
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <ClientContext.Provider value={{ Clients, getClients }}>
            {children}
        </ClientContext.Provider>
    );
};

