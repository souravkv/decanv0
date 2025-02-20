import React from "react";

const UserProfile = ({ name, age, isPremium }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      {isPremium?<span style={{ color: "gold" }}>🌟 Premium User</span>:<div>hehe</div>}
    </div>
  );
};

export default UserProfile;
