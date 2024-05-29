import React from 'react'
import { NavLink } from 'react-router-dom'
import './rps.css'
function Home() {
  return (
    <div className='rps flex justify-center items-center ' >
        <NavLink to={"/create"} >
        <button className='btn' >
            Create
        </button>
        </NavLink>
        <NavLink to={"/join"} >
        <button className='btn' >
            Join
        </button>
        </NavLink>
        
    </div>
  )
}

export default Home