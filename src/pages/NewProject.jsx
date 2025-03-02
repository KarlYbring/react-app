import React from "react";
import SectionHeader from "../components/elements/SectionHeader";
import ProjectDetails from "../components/sections/ProjectDetails";

const NewProject = () => {
    return (
        <main id="project">
            <div className="container">
                <SectionHeader title="PROJEKT - SKAPA NYTT" />
                <ProjectDetails />
            </div>
        </main>
    );
};

export default NewProject;
