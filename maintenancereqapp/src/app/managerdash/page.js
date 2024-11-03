'use client';
import { useState } from 'react';
import styles from './page.module.css';

const Dashboard = () => {
  const [newTenant, setNewTenant] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    apartment: '',
  });

  const [tenants, setTenants] = useState([
    { id: '1', name: 'John Doe', phone: '123-456-7890', email: 'john@example.com', apartment: '101' },
    { id: '2', name: 'Jane Smith', phone: '098-765-4321', email: 'jane@example.com', apartment: '102' },
  ]);

  const [moveTenant, setMoveTenant] = useState({
    tenantId: '',
    newApartment: '',
  });

  const [deleteTenantId, setDeleteTenantId] = useState('');
  
  const [requests, setRequests] = useState([
    {
      requestId: '1',
      apartmentNumber: '101',
      problemArea: 'kitchen',
      description: 'Bathtub drain gets stuck',
      dateTime: '2023-10-01T10:00:00',
      status: 'pending',
      photo: null,
    },
    {
      requestId: '2',
      apartmentNumber: '102',
      problemArea: 'bathroom',
      description: 'AC does not work',
      dateTime: '2023-10-02T11:00:00',
      status: 'completed',
      photo: null,
    },
  ]);

  const [filters, setFilters] = useState({
    apartmentNumber: '',
    area: '',
    status: '',
  });

  const handleAddTenant = (e) => {
    e.preventDefault();
    const newId = (tenants.length + 1).toString();
    const addedTenant = { id: newId, ...newTenant };
    setTenants([...tenants, addedTenant]);
    setNewTenant({
      name: '',
      phone: '',
      email: '',
      checkIn: '',
      checkOut: '',
      apartment: '',
    });
  };

  const handleMoveTenant = (e) => {
    e.preventDefault();
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === moveTenant.tenantId
          ? { ...tenant, apartment: moveTenant.newApartment }
          : tenant
      )
    );
    setMoveTenant({ tenantId: '', newApartment: '' });
  };

  const handleDeleteTenant = () => {
    setTenants(tenants.filter((tenant) => tenant.id !== deleteTenantId));
    setDeleteTenantId('');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredRequests = requests.filter((req) => {
    return (
      (!filters.apartmentNumber || req.apartmentNumber.includes(filters.apartmentNumber)) &&
      (!filters.area || req.problemArea.includes(filters.area)) &&
      (!filters.status || req.status === filters.status)
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Property Management Dashboard</h1>

      <h2 className={styles.sectionTitle}>Tenant Management</h2>
      <form onSubmit={handleAddTenant}>
        <h3>Add New Tenant</h3>
        <input className={styles.inputField} type="text" placeholder="Name" value={newTenant.name} onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })} required />
        <input className={styles.inputField} type="text" placeholder="Phone Number" value={newTenant.phone} onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })} required />
        <input className={styles.inputField} type="email" placeholder="Email" value={newTenant.email} onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })} required />
        <input className={styles.inputField} type="date" placeholder="Check-in Date" value={newTenant.checkIn} onChange={(e) => setNewTenant({ ...newTenant, checkIn: e.target.value })} required />
        <input className={styles.inputField} type="date" placeholder="Check-out Date" value={newTenant.checkOut} onChange={(e) => setNewTenant({ ...newTenant, checkOut: e.target.value })} required />
        <input className={styles.inputField} type="text" placeholder="Apartment Number" value={newTenant.apartment} onChange={(e) => setNewTenant({ ...newTenant, apartment: e.target.value })} required />
        <button className={styles.button} type="submit">Add Tenant</button>
      </form>

      <form onSubmit={handleMoveTenant}>
        <h3 className={styles.h3}>Move Tenant</h3>
        <select className={styles.inputField} value={moveTenant.tenantId} onChange={(e) => setMoveTenant({ ...moveTenant, tenantId: e.target.value })} required>
          <option value="">Select Tenant</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
          ))}
        </select>
        <input className={styles.inputField} type="text" placeholder="New Apartment Number" value={moveTenant.newApartment} onChange={(e) => setMoveTenant({ ...moveTenant, newApartment: e.target.value })} required />
        <button className={styles.button} type="submit">Move Tenant</button>
      </form>

      <h3 className={styles.h3}>Delete Tenant</h3>
      <select className={styles.inputField} value={deleteTenantId} onChange={(e) => setDeleteTenantId(e.target.value)} required>
        <option value="">Select Tenant to Delete</option>
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
        ))}
      </select>
      <button className={styles.button} onClick={handleDeleteTenant}>Delete Tenant</button>
    </div>
  );
};

export default Dashboard;
