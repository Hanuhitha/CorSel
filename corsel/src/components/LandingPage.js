import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { Card } from './Card';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <NavBar />

      <div className="card-links">
        {/* Courses */}
        <div className="card-link">
          <Link to="/ClassSearch">
            <Card
              imgSrc=""
              imgAlt="Courses list will be provided here"
              title="Courses"
              description=""
              buttonText=""
              link="/ClassSearch"
              width="20rem"
              className="custom-card"
            />
          </Link>
        </div>

        {/* Schedule */}
        <div className="card-link">
          <Link to="/Credits">
            <Card
              imgSrc=""
              imgAlt="Courses list will be provided here"
              title="Schedule"
              description=""
              buttonText=""
              link="/Credits"
              width="20rem"
            />
          </Link>
        </div>

        {/* Forms */}
        <div className="card-link">
          <Link to="/Forms">
            <Card
              imgSrc=""
              imgAlt="Courses list will be provided here"
              title="Forms"
              description=""
              buttonText=""
              link="/Forms"
              width="20rem"
            />
          </Link>
        </div>

        {/* Extracurricular */}
        <div className="card-link">
          <Link to="/Extracurricular">
            <Card
              imgSrc=""
              imgAlt="Activities list will be provided here"
              title="Extracurricular"
              description=""
              buttonText=""
              link="/Extracurricular"
              width="20rem"
            />
          </Link>
        </div>

        {/* Volunteer Hours */}
        <div className="card-link">
          <Link to="/VolunteerValidationPage">
            <Card
              imgSrc=""
              imgAlt="Courses list will be provided here"
              title="Volunteer Hours"
              description=""
              buttonText=""
              link="/VolunteerValidationPage"
              width="20rem"
            />
          </Link>
        </div>

        {/* Opportunities */}
        <div className="card-link">
          <Link to="/addOpportunity">
            <Card
              imgSrc=""
              imgAlt="Opportunities list will be provided here"
              title="Add Opportunity"
              description=""
              buttonText=""
              link="/addOpportunity"
              width="20rem"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
