import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, getLoggedInUser } from '../functions/auth';

function AllAccounts() {
  const [users, setUsers] = useState([]);
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const handleDelete = (email) => {
    deleteUser(email);
    setUsers(getAllUsers());
  };

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users registered</p>
      ) : (
        <ul>
          {users.map(user => (
            <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", }} key={user.email}>
              {user.firstName} {user.lastName} ({user.email})
              {loggedInUser && user.email !== loggedInUser.email && (
                <button style={{ marginLeft: "10px",backgroundColor:"red",color:"white" }} onClick={() => handleDelete(user.email)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllAccounts;
