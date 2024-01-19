import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { Card } from './Card';
import './LandingPage.css';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  const role = useParams();

  const commonLinks = [
    {
      to: '/ClassSearch',
      title: 'Courses',
      imgAlt: 'Courses list will be provided here',
    },
    {
      to: '/Credits',
      title: 'Schedule',
      imgAlt: 'Courses list will be provided here',
    },
    {
      to: '/Forms',
      title: 'Forms',
      imgAlt: 'Courses list will be provided here',
    },
    {
      to: '/Extracurricular',
      title: 'Extracurricular',
      imgAlt: 'Activities list will be provided here',
    },
    {
      to: '/VolunteerValidationPage',
      title: 'Volunteer Hours',
      imgAlt: 'Courses list will be provided here',
    },

  ];


let linksToShow = commonLinks;

if (role.role == 'staff') {
  // If the role is staff, include "Add Opportunity" card
  linksToShow.push({
    to: '/addOpportunity',
    title: 'Add Opportunity',
    imgAlt: 'Opportunities list will be provided here',
  });
}

  return (
    
    <div>
      <NavBar />

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
        {linksToShow.map((link, index) => (
          <div key={index} style={{ margin: '0 5% 5% 0' }}>
            <Link to={link.to}>
              <Card
                imgSrc=''
                imgAlt={link.imgAlt}
                title={link.title}
                description=''
                buttonText=''
                link={link.to}
                width='20rem'
                className='custom-card'
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  
  );
  
  
};

export default LandingPage;
