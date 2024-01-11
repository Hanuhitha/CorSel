import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { Card } from './Card';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div>
      <NavBar />

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <div style={{ marginRight: '5%' }}>
          <Link to='/ClassSearch'>
            <Card
              imgSrc=''
              imgAlt='Courses list will be provided here'
              title='Courses'
              description=''
              buttonText=''
              link='/ClassSearch'
              width='15rem'
              className='custom-card'
            />
          </Link>
        </div>

        <div>
          <Link to='/Credits'>
            <Card
              imgSrc=''
              imgAlt='Courses list will be provided here'
              title='Schedule'
              description=''
              buttonText=''
              link='/Credits'
              width='15rem'
            />
          </Link>
        </div>

        <div style={{ marginLeft: '5%' }}>
          <Link to='/Forms'>
            <Card
              imgSrc=''
              imgAlt='Courses list will be provided here'
              title='Forms'
              description=''
              buttonText=''
              link='/Forms'
              width='15rem'
            />
          </Link>
        </div>

        {/* Add the Extracurricular Activities button here */}
        <div style={{ marginLeft: '5%' }}>
          <Link to='/Extracurricular'>
            <Card
              imgSrc=''
              imgAlt='Activities list will be provided here'
              title='Extracurricular'
              description=''
              buttonText=''
              link='/Extracurricular'
              width='15rem'
            />
          </Link>
        </div>
      </div>

      <div style={{ marginLeft: '5%' }}>
        <Link to='/VolunteerValidationPage'>
          <Card
            imgSrc=''
            imgAlt='Courses list will be provided here'
            title='Volunteer Hours'
            description=''
            buttonText=''
            link='/VolunteerValidationPage'
            width='15rem'
          />
        </Link>
      </div>
    </div>
  );
}
