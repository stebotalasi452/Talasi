import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import InstituteAddCourse from "./InstituteAddcourse";
import ViewApplications from "./InstituteViewApplications";
import PublishAdmissions from "./InstitutePublishAdmissions";
import InstituteProfilePage from "./InstituteProfile";

const Dashboard = ({ handleLogout }) => {
    return (
        <Router>
            <div style={styles.container}>
                <h2 style={styles.header}>Institute Management Dashboard</h2>

                {/* Navigation Bar */}
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>
                        Add Course
                    </Link>
                    <Link to="/applications" style={styles.navLink}>
                        View Applications
                    </Link>
                    <Link to="/publish" style={styles.navLink}>
                        Publish Admissions
                    </Link>
                    <Link to="/profile" style={styles.navLink}>
                        Institute Profile
                    </Link>
                </nav>

                {/* Logout Button */}
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>

                {/* Route Definitions */}
                <Routes>
                    <Route path="/" element={<InstituteAddCourse />} />
                    <Route path="/applications" element={<ViewApplications />} />
                    <Route path="/publish" element={<PublishAdmissions />} />
                    <Route path="/profile" element={<InstituteProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
};

// Styling for the dashboard and navigation links
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
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
        paddingTop:'20px',
        paddingBottom:'20px',

    },
    navLink: {
        textDecoration: 'none',
        color: '#007acc',
        fontSize: '16px',
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
        marginTop: '20px', // Space between logout and links
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
};

export default Dashboard;
