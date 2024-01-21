import React from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavBarStyles.css'; // Make sure to include your CSS file

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
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
          <CustomLink to="/ClassSearch">Courses</CustomLink>
          <CustomLink to="/Credits">Schedule</CustomLink>
          <CustomLink to="/Forms">Counseling Forms</CustomLink>
          {/* Add Logout button */}
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
