import React from "react";

const UserManagement = ({ users, onRoleChange }) => {
  const handleRoleChange = (userId, newRole) => {
    onRoleChange(userId, newRole);
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
