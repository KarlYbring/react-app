import React, { useContext, useEffect, useState } from 'react'
import SectionHeader from '../components/elements/SectionHeader'
import { ProjectContext } from '../contexts/ProjectContext'
import { useParams } from 'react-router-dom'

const Project = () => {

  const { id } = useParams()
  const {project, getProject} = useContext(ProjectContext)

  useEffect(() => {
    getProject(id)
  }, [id])
  
    return (
      <main id="project">
         <div className="container">
            <SectionHeader title={`PROJEKT ${ project.id !== 0 ? `${project.id} - ${project.title}`: `- SKAPA NYTT` }`} />
        </div>
      </main>
    )
}
export default Project
