// app/tenantdash/page.js
"use client";

import { useState } from 'react';

const TenantDash = () => {
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [problemArea, setProblemArea] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      requestId: Date.now(), // Automatically generated request ID
      apartmentNumber,
      problemArea,
      description,
      dateTime: new Date().toLocaleString(),
      photo,
      status: 'pending',
    };

    setRequests([...requests, newRequest]);
    resetForm();
  };

  const resetForm = () => {
    setApartmentNumber('');
    setProblemArea('');
    setDescription('');
    setPhoto(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tenant Dashboard</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>
            Apartment Number:
            <input
              type="text"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <div>
          <label>
            Area of the Problem:
            <input
              type="text"
              value={problemArea}
              onChange={(e) => setProblemArea(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ marginLeft: '10px', width: '100%', height: '60px' }}
            />
          </label>
        </div>
        
        <div>
          <label>
            Upload Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <button type="submit" style={{ marginTop: '10px' }}>Submit Request</button>
      </form>

      <h2>Submitted Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.requestId} style={{ marginBottom: '10px' }}>
            <strong>Request ID:</strong> {req.requestId} <br />
            <strong>Apartment Number:</strong> {req.apartmentNumber} <br />
            <strong>Area of Problem:</strong> {req.problemArea} <br />
            <strong>Description:</strong> {req.description} <br />
            <strong>Date/Time:</strong> {req.dateTime} <br />
            <strong>Status:</strong> {req.status} <br />
            {req.photo && <img src={URL.createObjectURL(req.photo)} alt="Request" style={{ maxWidth: '100px', marginTop: '10px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantDash;
