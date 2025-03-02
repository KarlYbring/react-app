import { StrictMode } from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProjectProvider } from './contexts/ProjectContext.jsx'
import { StatusProvider } from './contexts/StatusContext.jsx'
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <StatusProvider>
                <ProjectProvider>
                    <App />
                </ProjectProvider>
            </StatusProvider>
        </BrowserRouter>
    </StrictMode>
)
