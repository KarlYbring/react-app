import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/projects')
  }, [navigate])

  return (
    <main>
      <div className="container">
        Home
      </div>
    </main>
  )
}

export default Home
