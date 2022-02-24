import React from "react";
import { useParams } from "react-router-dom";

const User = ({ userList }) => {
  const id = useParams().id;
  const selectedUser = userList.find((u) => u.id === id);

  if (!selectedUser) {
    return null;
  }

  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
