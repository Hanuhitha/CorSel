import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavBarStyles.css'; // Make sure to include your CSS file

export default function NavBar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const pages = [
    { to: '/ClassSearch', label: 'Courses' },
    { to: '/Credits', label: 'Schedule' },
    { to: '/Forms', label: 'Counseling Forms' },
    { to: '/Extracurricular', label: 'Extracurricular' },
    { to: '/VolunteerValidationPage', label: 'Volunteer Hours' },
    { to: '/addOpportunity', label: 'Add Opportunity' },
  ];

  return (
    <nav className="nav">
      <div className="logo-container">
        <Link to="/LandingPage">
          <img src="edviselogo.jpeg" alt="Logo" height={75} width={75} />
        </Link>
        <Link to="/LandingPage" className="site-title">
          EDVISE
        </Link>
      </div>
      <ul>
        {pages.map((page, index) => (
          <CustomLink key={index} to={page.to}>
            {page.label}
          </CustomLink>
        ))}
        {/* Add Logout button */}
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const isActive = useMatch({ path: to, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
