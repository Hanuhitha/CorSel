import React from 'react'
import NavBarStyles from './NavBarStyles.css'
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function NavBar() {
  return (
    <>
    <nav className="nav">
    <Link to ='/LandingPage'><img src='edviselogo.jpeg' alt='Logo' height={75} width={75} ></img></Link>
      <Link to="/LandingPage" className="site-title">
        EDVISE
      </Link>
      <ul>
        <CustomLink to="/ClassSearch">Courses</CustomLink>
        <CustomLink to="/Credits">Schedule</CustomLink>
        <CustomLink to="/CounselingForms">CounselingForms</CustomLink>
      </ul>
    </nav>
    </>
  )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }
