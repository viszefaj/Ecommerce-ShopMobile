import React, { useState } from "react";

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };

  return (
    <div className="container">
      <h2 className="mt-5 d-flex justify-content-center">User Management</h2>
      {users.length === 0 ? (
        <p className="mt-5 d-flex justify-content-center">No users available</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ fontSize: "12px" }}>User ID</th>
              <th style={{ fontSize: "12px" }}>Name</th>
              <th style={{ fontSize: "12px" }}>Email</th>
              <th style={{ fontSize: "12px" }}>Role</th>
              <th style={{ fontSize: "12px" }}>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ fontSize: "12px" }}>{user.id}</td>
                <td style={{ fontSize: "12px" }}>{user.name}</td>
                <td style={{ fontSize: "12px" }}>{user.email}</td>
                <td style={{ fontSize: "12px" }}>{user.role}</td>
                <td>
                  <select
                    className="form-control"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option style={{ fontSize: "12px" }} value="user">
                      User
                    </option>
                    <option style={{ fontSize: "12px" }} value="admin">
                      Admin
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
