import React, { useState } from 'react';
import Institution from './ManageInstitutionsAdmin';
import Faculty from './AdminAddFaculties';
import Course from './AdminManagecouurse';
import Admissions from './AdminPublishAdmissions';
import Profile from './AdminProfile';

const Admin = ({ handleLogout }) => {
  const [view, setView] = useState('institutions');

  const renderComponent = () => {
    switch (view) {
      case 'institutions':
        return <Institution />;
      case 'faculties':
        return <Faculty />;
      case 'courses':
        return <Course />;
      case 'admissions':
        return <Admissions />;
      case 'profile':
        return <Profile />;
      default:
        return <Institution />;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Dashboard</h2>

      <nav style={styles.nav}>
        <button onClick={() => setView('institutions')} style={styles.button}>Institutions</button>
        <button onClick={() => setView('faculties')} style={styles.button}>Faculties</button>
        <button onClick={() => setView('courses')} style={styles.button}>Courses</button>
        <button onClick={() => setView('admissions')} style={styles.button}>Admissions</button>
        <button onClick={() => setView('profile')} style={styles.button}>Profile</button>
      </nav>

      {/* Render the selected view */}
      <div style={styles.content}>
        {renderComponent()}
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

// Styles for the dashboard
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 0 30px 10px rgba(0, 255, 255, 0.6)', // Glowing effect around the container

  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
    paddingBottom: '20px',
  },
  logoutButton: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#0056b3', // Dark blue
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  content: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    color: '#007acc',
    fontSize: '16px',
  },
  error: {
    color: '#ff4444',
    fontSize: '16px',
  },
  body: {
    backgroundImage: 'url(/assets/images/image.png)', // Path updated to point to the public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

export default Admin;
