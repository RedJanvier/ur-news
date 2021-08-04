import React, { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import { Redirect, Route } from 'react-router-dom';
import { DashboardLayout } from './Layouts';

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(GlobalContext);
  if (!token) return <Redirect to='/' />;
  return (
    <Route
      {...rest}
      render={(props) => (
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  );
}

export default PrivateRoute;
