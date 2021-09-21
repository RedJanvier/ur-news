import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal/Modal';
import Toast from '../components/Toast/Toast';
import './AuthPage.css';

const {
  combinations,
  schools,
  departments,
  colleges,
} = require('@ur-news/locations');

const AuthPage = () => {
  const { login, register, error, pending, setError } =
    useContext(GlobalContext);
  const initialState = {
    page: 'Login',
    name: '',
    regNumber: 0,
    password: '',
    audienceLocation: {
      class: '',
      campus: '',
      department: '',
      school: '',
    },
  };
  const [state, setState] = useState(initialState);
  const regexes = {
    regNumber: /^2([1-2]{1})([0-9]{7})$/,
    // name: /^([A-Za-z]{3,20})\s([A-Za-z]{3,20})(\s[A-Za-z]{3,20})?(\s[A-Za-z]{3,20})?$/,
  };

  const { page } = state;
  const notPage = page === 'Login' ? 'Register' : 'Login';
  useEffect(() => {
    document.title = `${page} - UR News Post`;
  }, [page]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (state.page === 'Register') {
      const { audienceLocation } = state;
      if (state.name.trim().length < 6)
        return setError('Please provide a name!');
      if (!regexes.regNumber.test(state.regNumber.toString()))
        return setError('Please provide a valid reg. Number!');
      if (state.password.trim().length < 7)
        return setError('Password must be atleast 7 characters');
      if (audienceLocation.class.trim().length < 2)
        return setError('Please select a combination!');
      if (audienceLocation.department.trim().length < 2)
        return setError('Please select a department!');
      if (audienceLocation.campus.trim().length < 2)
        return setError('Please select a campus!');
      if (audienceLocation.school.trim().length < 2)
        return setError('Please select a school!');

      const success = await register({
        name: state.name,
        regNumber: state.regNumber,
        password: state.password,
        ...state.audienceLocation,
      });

      if (success) {
        setState(initialState);
      }
    }

    await login({ regNumber: state.regNumber, password: state.password });
  };

  return (
    <div className='auth-page'>
      <Modal title={state.page}>
        {error && (
          <Toast
            text={error}
            duration={5}
            type={error === 'Registered successfully' ? 'success' : 'error'}
          />
        )}
        <form onSubmit={handleFormSubmit}>
          {state.page === 'Register' && (
            <div className='form-control'>
              <label htmlFor='username'>Full Name</label>
              <input
                type='text'
                name='username'
                placeholder='Enter your Full name'
                onChange={(e) => setState({ ...state, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className='form-control'>
            <label htmlFor='reg'>Reg. Number</label>
            <input
              type='text'
              name='reg'
              onChange={(e) =>
                setState({ ...state, regNumber: parseInt(e.target.value) })
              }
              placeholder='Enter your RegNumber'
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your Password'
              onChange={(e) => setState({ ...state, password: e.target.value })}
              required
            />
          </div>
          {state.page === 'Register' && (
            <>
              <div className='form-control'>
                <select
                  name='campus'
                  value={state.audienceLocation.campus}
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        campus: e.target.value,
                      }),
                    })
                  }
                  required
                >
                  <option value='' disabled>
                    Select your campus
                  </option>
                  {colleges.UR.map((college) => (
                    <option value={college.abbr}>{college.text}</option>
                  ))}
                </select>
              </div>
              <div className='form-control'>
                <select
                  name='school'
                  value={state.audienceLocation.school}
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        school: e.target.value,
                      }),
                    })
                  }
                  required
                >
                  <option value='' disabled>
                    Select your School
                  </option>
                  {schools[state.audienceLocation.campus].map((school) => (
                    <option value={school.abbr}>{school.text}</option>
                  ))}
                </select>
              </div>
              <div className='form-control'>
                <select
                  name='department'
                  value={state.audienceLocation.department}
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        department: e.target.value,
                      }),
                    })
                  }
                  required
                >
                  <option value='' disabled>
                    Select your Department
                  </option>
                  {departments[state.audienceLocation.school].map(
                    (department) => (
                      <option value={department.abbr}>{department.text}</option>
                    )
                  )}
                </select>
              </div>
              <div className='form-control'>
                <select
                  name='class'
                  value={state.audienceLocation.class}
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        class: e.target.value,
                      }),
                    })
                  }
                  required
                >
                  <option value='' disabled>
                    Select your Class
                  </option>
                  {combinations[state.audienceLocation.department].map(
                    (combination) => (
                      <option value={combination.abbr}>
                        {combination.text}
                      </option>
                    )
                  )}
                </select>
              </div>
            </>
          )}
          <div className='form-control'>
            <button type='submit' className='btn' disabled={pending}>
              {!pending ? `${state.page}` : <Spinner />}
            </button>
            <button
              type='button'
              className='btn-light'
              onClick={() => setState({ ...state, page: notPage })}
            >
              {notPage} instead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AuthPage;
