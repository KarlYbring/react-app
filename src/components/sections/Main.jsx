import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Projects from '../../pages/Projects'
import Project from '../../pages/Project'
import Home from '../../pages/Home'
import './index.css';


const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/project" element={<Project />} />
      <Route path="/projects/new" element={<Project />} />
    </Routes>
  )
}
export default Main
