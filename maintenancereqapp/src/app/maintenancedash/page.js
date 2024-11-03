// app/maintenancedash/page.js
"use client";

import { useEffect, useState } from 'react';

const MaintenanceDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState({
    apartmentNumber: '',
    area: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  // Hardcoded data
  const maintenanceRequests = [
    { id: 1, apartmentNumber: '101', area: 'kitchen', description: 'Bathtub drain gets stuck', date: '2023-10-01', photo: './images/github ig1.jpg', status: 'pending' },
    { id: 2, apartmentNumber: '102', area: 'bathroom', description: 'AC does not work', date: '2023-10-02', photo: '', status: 'completed' },
    { id: 3, apartmentNumber: '103', area: 'living room', description: 'Leak in ceiling', date: '2023-10-03', photo: './images/github ig2.jpg', status: 'pending' },
    { id: 4, apartmentNumber: '104', area: 'kitchen', description: 'Refrigerator not cooling', date: '2023-10-04', photo: '', status: 'pending' },
    { id: 5, apartmentNumber: '105', area: 'balcony', description: 'Broken railing', date: '2023-10-05', photo: './images/iconbg@0.5px.png', status: 'completed' },
  ];

  useEffect(() => {
    setRequests(maintenanceRequests);
    setFilteredRequests(maintenanceRequests);
  }, []);

  useEffect(() => {
    let filtered = requests;

    if (filters.apartmentNumber) {
      filtered = filtered.filter(req => req.apartmentNumber.includes(filters.apartmentNumber));
    }
    if (filters.area) {
      filtered = filtered.filter(req => req.area.includes(filters.area));
    }
    if (filters.startDate) {
      filtered = filtered.filter(req => new Date(req.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(req => new Date(req.date) <= new Date(filters.endDate));
    }
    if (filters.status) {
      filtered = filtered.filter(req => req.status === filters.status);
    }

    setFilteredRequests(filtered);
  }, [filters, requests]);

  const updateRequestStatus = (id, newStatus) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Maintenance Requests</h1>
      <div style={styles.filters}>
        <h2 style={styles.filterTitle}>Filters</h2>
        <div style={styles.filterGroup}>
          <label>
            Apartment Number:
            <input 
              type="text" 
              name="apartmentNumber" 
              value={filters.apartmentNumber} 
              onChange={handleFilterChange} 
              style={styles.input} 
            />
          </label>
          <label>
            Area:
            <input 
              type="text" 
              name="area" 
              value={filters.area} 
              onChange={handleFilterChange} 
              style={styles.input} 
            />
          </label>
          <label>
            Start Date:
            <input 
              type="date" 
              name="startDate" 
              value={filters.startDate} 
              onChange={handleFilterChange} 
              style={styles.input} 
            />
          </label>
          <label>
            End Date:
            <input 
              type="date" 
              name="endDate" 
              value={filters.endDate} 
              onChange={handleFilterChange} 
              style={styles.input} 
            />
          </label>
          <label>
            Status:
            <select 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange} 
              style={styles.input} 
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
      </div>
      <ul style={styles.requestList}>
        {filteredRequests.map(request => (
          <li key={request.id} style={styles.requestItem}>
            <div>
              <p><strong>Apartment:</strong> {request.apartmentNumber}</p>
              <p><strong>Area:</strong> {request.area}</p>
              <p><strong>Description:</strong> {request.description}</p>
              <p><strong>Date:</strong> {request.date}</p>
              <p><strong>Status:</strong> {request.status}</p>
              {request.photo && <img src={request.photo} alt="Maintenance request" style={styles.image} />}
            </div>
            {request.status === 'pending' && (
              <button onClick={() => updateRequestStatus(request.id, 'completed')} style={styles.button}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  filters: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  filterTitle: {
    marginBottom: '10px',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  requestList: {
    listStyleType: 'none',
    padding: 0,
  },
  requestItem: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    marginTop: '10px',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default MaintenanceDashboard;