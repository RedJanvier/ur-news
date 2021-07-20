import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from "../context/GlobalState";
import "./AuthPage.css";
import Spinner from "../components/Spinner/Spinner";
import Toast from "../components/Toast/Toast";

const AuthPage = (props) => {
  const { login, register, error, pending } = useContext(GlobalContext);
  const [state, setState] = useState({
    page: "login",
    name: "",
    regNumber: 0,
    password: "",
    audienceLocation: {
      class: "",
      campus: "",
      department: "",
      school: "",
    },
  });
  const history = useHistory();
  const notPage = state.page === "login" ? "register" : "login";
  const { page } = state;
  useEffect(() => {
    document.title = `${page} - UR News Post`;
  }, [page]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (state.page === "register") {
      await register({
        name: state.name,
        regNumber: state.regNumber,
        password: state.password,
        ...state.audienceLocation,
      });
      return history.push("/");
    }
    await login({ regNumber: state.regNumber, password: state.password });
  };

  return (
    <div className="auth-page">
      <Modal title={state.page}>
        {error && (
          <Toast
            text={error}
            duration={5}
            type={error === "Registered successfully" ? "success" : "error"}
          />
        )}
        <form onSubmit={handleFormSubmit}>
          {state.page === "register" && (
            <div className="form-control">
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your Full name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="reg">Reg. Number</label>
            <input
              type="text"
              name="reg"
              onChange={(e) =>
                setState({ ...state, regNumber: parseInt(e.target.value) })
              }
              placeholder="Enter your RegNumber"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
              required
            />
          </div>
          {state.page === "register" && (
            <>
              <div className="form-control">
                <select
                  name="campus"
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
                  <option value="" disabled>
                    Select a campus
                  </option>
                  <option value="CST">UR CST - Nyarugenge</option>
                </select>
              </div>
              <div className="form-control">
                <select
                  name="school"
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
                  <option value="" disabled>
                    Select your School
                  </option>
                  <option value="ICT">School of ICT</option>
                  <option value="MIN">School of Mining</option>
                  <option value="SCI">School of Science</option>
                  <option value="ENG">School of Engineering</option>
                  <option value="ARC">School of Architecture</option>
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter your Department in abbreviations"
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        department: e.target.value,
                      }),
                    })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="class">Combination</label>
                <input
                  type="text"
                  name="class"
                  placeholder="Enter your Combination in abbreviations"
                  onChange={(e) =>
                    setState({
                      ...state,
                      ...Object.assign(state.audienceLocation, {
                        class: e.target.value,
                      }),
                    })
                  }
                  required
                />
              </div>
            </>
          )}
          <div className="form-control">
            <button
              type="submit"
              className="btn"
              disabled={pending ? "disabled" : ""}
            >
              {!pending ? `${state.page}` : <Spinner />}
            </button>
            <button
              className="btn-light"
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
