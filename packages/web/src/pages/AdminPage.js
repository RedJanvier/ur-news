import React, { useContext, useEffect } from 'react';

import './AdminPage.css';
import { GlobalContext } from '../context/GlobalState';
import ChangeRole from '../components/ChangeRole/ChangeRole';

const Admin = (props) => {
  const { role, token } = useContext(GlobalContext);
  useEffect(() => {
    document.title = 'Admin - UR News Post';
  }, []);
  return (
    <div className="admin-page">
      <ChangeRole role={role} token={token} />
    </div>
  );
};

export default Admin;
