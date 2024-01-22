// App.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ClassProvider } from './ClassContext';
import Home from './Home';
import LandingPage from './LandingPage';
import Signup from './signup';
import Login from './Login';
import ClassSearch from './ClassSearch';
import Credits from './Credits';
import Forms from './Forms';
import RoleSelection from './RoleSelection';
import VolunteerValidationPage from './VolunteerValidationPage';
import MyCommitmentsPage from './MyCommitmentsPage';
import VolunteerStatsPage from './VolunteerStatsPage';
import OpportunitiesPage from './OpportunitiesPage';
import ExtracurricularPage from './ExtracurricularPage';
import StaffAdditionPage from './StaffAdditionPage';
import YearDetailsPage from './YearDetailsPage';

function App() {
  return (
    <AuthProvider>
      <ClassProvider> {/* Wrap the application with ClassProvider */}
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ClassSearch" element={<ClassSearch />} />
                <Route path="/Forms" element={<Forms />} />
                <Route path="/Credits" element={<Credits />} />
                <Route path="/VolunteerValidationPage" element={<VolunteerValidationPage />} />
                <Route path="/my-commitments" element={<MyCommitmentsPage />} />
                <Route path="/VolunteeringStats" element={<VolunteerStatsPage />} />
                <Route path="/find-opportunities" element={<OpportunitiesPage />} />
                <Route path="/Extracurricular" element={<ExtracurricularPage />} />
                <Route path="/addOpportunity" element={<StaffAdditionPage />} />
                <Route path="/Credits/:yearNumber" element={<YearDetailsPage />} />
              </Routes>
            </div>
          </Router>
        </Container>
      </ClassProvider>
    </AuthProvider>
  );
}

export default App;
