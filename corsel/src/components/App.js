import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Home from './Home';
import LandingPage from './LandingPage';
import Signup from './signup';
import Login from './Login';
import ClassSearch from './ClassSearch';
import Credits from './Credits';
import Forms from './Forms';
import RoleSelection from './RoleSelection';

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<RoleSelection />} />
              <Route path="/signup/:role" element={<Signup />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ClassSearch" element={<ClassSearch />} />
              <Route path="/Forms" element={<Forms />} />
              <Route path="/Credits" element={<Credits />} />
            </Routes>
          </div>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
