import React from 'react';
import DashboardLayout from './Dashboard';

const DefaultLayout = ({ children }) => (
  <main className='page'>{children}</main>
);

export { DefaultLayout, DashboardLayout };
