"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hard-coded credentials
    const credentials = {
      tenant: { username: 'tenantUser', password: 'Pass' },
      maintenance: { username: 'maintenanceUser', password: 'Pass' },
      manager: { username: 'managerUser', password: 'Pass' },
    };

    if (username === credentials.tenant.username && password === credentials.tenant.password) {
      router.push('/tenantdash');
    } else if (username === credentials.maintenance.username && password === credentials.maintenance.password) {
      router.push('/maintenancedash');
    } else if (username === credentials.manager.username && password === credentials.manager.password) {
      router.push('/managerdash');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
