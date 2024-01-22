import React from 'react';
import './MyCommitmentsPage.css'; // Make sure to include your CSS file
import NavBar from './NavBar'; // Import NavBar component

const MyCommitmentsPage = () => {
  // Sample data (replace this with your actual data)
  const commitments = [
    { id: 1, title: 'Upcoming Commitment 1', date: '2024-02-15', status: 'upcoming' },
    { id: 2, title: 'Upcoming Commitment 2', date: '2024-02-20', status: 'upcoming' },
    { id: 3, title: 'Past Commitment 1', date: '2024-01-15', status: 'past' },
    { id: 4, title: 'Past Commitment 2', date: '2024-01-20', status: 'past' },
  ];

  const upcomingCommitments = commitments.filter((commitment) => commitment.status === 'upcoming');
  const pastCommitments = commitments.filter((commitment) => commitment.status === 'past');

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="my-commitments-container">
          <h2>My Commitments</h2>

          {/* Upcoming Commitments */}
          <div className="commitments-column">
            <h3>Upcoming Commitments</h3>
            {upcomingCommitments.length > 0 ? (
              <ul>
                {upcomingCommitments.map((commitment) => (
                  <li key={commitment.id}>
                    {commitment.title} - {commitment.date} (Upcoming)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming commitments.</p>
            )}
          </div>

          {/* Past Commitments */}
          <div className="commitments-column">
            <h3>Past Commitments</h3>
            {pastCommitments.length > 0 ? (
              <ul>
                {pastCommitments.map((commitment) => (
                  <li key={commitment.id}>
                    {commitment.title} - {commitment.date} (Past)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No past commitments.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommitmentsPage;
