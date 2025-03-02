import React from "react";
import SectionHeader from "../components/elements/SectionHeader";
import ProjectDetails from "../components/sections/EditProjectDetails";
import { useParams } from "react-router-dom";

const EditProject = () => {
    const { id } = useParams(); // 🔹 Hämta ID från URL

    return (
        <main id="project">
            <div className="container">
                <SectionHeader title="PROJEKT - UPPDATERA PROJEKT"/>
                <ProjectDetails projectId={id} /> {/* 🔹 Skickar ID till ProjectDetails */}
            </div>
        </main>
    );
};

export default EditProject;
