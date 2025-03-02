import React from 'react'
import {Link} from 'react-router-dom'

const SectionHeader = ({title}) => {

    
  return (
    <div className="section-header">
        <h1>{title}</h1>
          <div className="nav-buttons">
           <Link to="/projects/project" className ="btn btn-gray">Skapa projekt</Link>
           <Link to="/projects" className="btn btn-yellow">Visa lista</Link>
           </div>
        </div>
  )
}
export default SectionHeader

