import React from "react";

const Authorization = (roles) => {
  return (Component, role) => {
    console.log(role, roles);
    return <Component />;
  };
};

export default Authorization;
