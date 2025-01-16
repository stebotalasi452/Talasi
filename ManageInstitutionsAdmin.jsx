import React, { useState, useEffect } from 'react';

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [newInstitution, setNewInstitution] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editInstitution, setEditInstitution] = useState('');

  useEffect(() => {
    const savedInstitutions = JSON.parse(localStorage.getItem('institutions')) || [];
    setInstitutions(savedInstitutions);
  }, []);

  const addInstitution = () => {
    if (newInstitution.trim() === '') {
      alert('Institution name cannot be empty');
      return;
    }
    if (institutions.includes(newInstitution.trim())) {
      alert('This institution already exists');
      return;
    }
    const updatedInstitutions = [...institutions, newInstitution.trim()];
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions));
    setNewInstitution('');
    alert('Institution added successfully!');
  };

  const deleteInstitution = (index) => {
    const updatedInstitutions = institutions.filter((_, i) => i !== index);
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions));
    alert('Institution deleted successfully!');
  };

  const startEditInstitution = (index) => {
    setIsEditing(index);
    setEditInstitution(institutions[index]);
  };

  const confirmEditInstitution = (index) => {
    if (editInstitution.trim() === '') {
      alert('Institution name cannot be empty');
      return;
    }
    const updatedInstitutions = institutions.map((institution, i) =>
      i === index ? editInstitution.trim() : institution
    );
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions));
    setIsEditing(null);
    setEditInstitution('');
    alert('Institution updated successfully!');
  };

  const clearInstitutions = () => {
    setInstitutions([]);
    localStorage.removeItem('institutions');
    alert('All institutions cleared');
  };

  const sortInstitutions = () => {
    const sortedInstitutions = [...institutions].sort();
    setInstitutions(sortedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(sortedInstitutions));
  };

  const filteredInstitutions = institutions.filter(institution =>
    institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Manage Institutions</h3>
      <input
        type="text"
        placeholder="Add Institution"
        value={newInstitution}
        onChange={(e) => setNewInstitution(e.target.value)}
      />
      <button onClick={addInstitution}>Add</button>
      <button onClick={clearInstitutions} disabled={institutions.length === 0}>Clear All</button>
      <button onClick={sortInstitutions} disabled={institutions.length === 0}>Sort Institutions</button>

      <input
        type="text"
        placeholder="Search Institutions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredInstitutions.length > 0 ? (
        <ul>
          {filteredInstitutions.map((institution, index) => (
            <li key={index}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editInstitution}
                    onChange={(e) => setEditInstitution(e.target.value)}
                  />
                  <button onClick={() => confirmEditInstitution(index)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {institution}
                  <button onClick={() => startEditInstitution(index)}>Edit</button>
                  <button onClick={() => deleteInstitution(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No institutions available. Please add an institution.</p>
      )}
    </div>
  );
};

export default Institution;
