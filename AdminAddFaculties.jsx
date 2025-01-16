import React, { useState, useEffect } from 'react';

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editFaculty, setEditFaculty] = useState('');

  useEffect(() => {
    const savedFaculties = JSON.parse(localStorage.getItem('faculties')) || [];
    setFaculties(savedFaculties);
  }, []);

  const addFaculty = () => {
    if (newFaculty.trim() === '') {
      alert('Faculty name cannot be empty');
      return;
    }
    if (faculties.includes(newFaculty.trim())) {
      alert('This faculty already exists');
      return;
    }
    const updatedFaculties = [...faculties, newFaculty.trim()];
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
    setNewFaculty('');
  };

  const deleteFaculty = (index) => {
    const updatedFaculties = faculties.filter((_, i) => i !== index);
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
  };

  const startEditFaculty = (index) => {
    setIsEditing(index);
    setEditFaculty(faculties[index]);
  };

  const confirmEditFaculty = (index) => {
    if (editFaculty.trim() === '') {
      alert('Faculty name cannot be empty');
      return;
    }
    const updatedFaculties = faculties.map((faculty, i) =>
      i === index ? editFaculty.trim() : faculty
    );
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
    setIsEditing(null);
    setEditFaculty('');
  };

  const clearFaculties = () => {
    setFaculties([]);
    localStorage.removeItem('faculties');
  };

  const sortFaculties = () => {
    const sortedFaculties = [...faculties].sort();
    setFaculties(sortedFaculties);
    localStorage.setItem('faculties', JSON.stringify(sortedFaculties));
  };

  const filteredFaculties = faculties.filter(faculty =>
    typeof faculty === 'string' && faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Manage Faculties</h3>
      <input
        type="text"
        placeholder="Add Faculty"
        value={newFaculty}
        onChange={(e) => setNewFaculty(e.target.value)}
      />
      <button onClick={addFaculty}>Add</button>
      <button onClick={clearFaculties} disabled={faculties.length === 0}>Clear All</button>
      <button onClick={sortFaculties} disabled={faculties.length === 0}>Sort Faculties</button>

      <input
        type="text"
        placeholder="Search Faculties"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFaculties.length > 0 ? (
        <ul>
          {filteredFaculties.map((faculty, index) => (
            <li key={index}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editFaculty}
                    onChange={(e) => setEditFaculty(e.target.value)}
                  />
                  <button onClick={() => confirmEditFaculty(index)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {faculty}
                  <button onClick={() => startEditFaculty(index)}>Edit</button>
                  <button onClick={() => deleteFaculty(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No faculties available. Please add a faculty.</p>
      )}
    </div>
  );
};

export default Faculty;
