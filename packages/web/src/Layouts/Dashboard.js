import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faDoorOpen,
  faFile,
  faNewspaper,
  faShieldAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/NavBar/NavBar';
import { GlobalContext } from '../context/GlobalState';
import styles from '../styles/Dashboard.module.css';

const Dashboard = ({ children }) => {
  const { token, logout, role } = useContext(GlobalContext);

  return (
    <>
      <Navbar />
      <div className='container'>
        <aside className={styles.sidebar}>
          <ul className={styles.sideLinks}>
            {token && role !== 'student' && (
              <>
                <li>
                  <NavLink to='/create' className='otherBtns'>
                    <Icon icon={faFile} className={styles.icon} />
                    Create News
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/created' className='otherBtns'>
                    <Icon icon={faNewspaper} className={styles.icon} />
                    My News
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/profile' className='otherBtns'>
                    <Icon icon={faUser} className={styles.icon} />
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {token && role === 'admin' && (
              <li>
                <NavLink to='/admin' className='otherBtns'>
                  <Icon icon={faShieldAlt} className={styles.icon} />
                  Admin
                </NavLink>
              </li>
            )}
            {token ? (
              <li>
                <button className='otherBtns' onClick={logout}>
                  <Icon icon={faDoorOpen} className={styles.icon} />
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink to='/auth' className='otherBtns'>
                  <Icon icon={faBars} className={styles.icon} />
                  Auth
                </NavLink>
              </li>
            )}
          </ul>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Dashboard;
