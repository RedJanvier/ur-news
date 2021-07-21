import React, { useState } from "react";

import Modal from "../Modal/Modal";
import { BASE_URL } from "../../constants";

const ChangeRole = ({ role, token }) => {
  const [state, setState] = useState({ role: "", regNumber: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
        method: "POST",
      };

      const res = await fetch(`${BASE_URL}/api/v1/users`, config);
      const response = await res.json();
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Update Role">
      <form onSubmit={handleSubmit}>
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
          <select
            name="role"
            value={state.role}
            onChange={(e) =>
              setState({
                ...state,
                role: e.target.value,
              })
            }
            required
          >
            <option value="" disabled>
              Select a Role
            </option>
            <option value="student">Student</option>
            <option value="staff">Staff Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-control">
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeRole;
