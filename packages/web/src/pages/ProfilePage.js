import React, { useEffect } from "react";
import ChangeProfile from "../components/ChangeProfilePic/ChangeProfilePic";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "My Profile - UR News Post";
  }, []);
  return <ChangeProfile />;
};

export default ProfilePage;
