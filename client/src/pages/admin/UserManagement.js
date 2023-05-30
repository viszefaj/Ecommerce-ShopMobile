import React from "react";

const UserManagement = ({ users, onRoleChange }) => {
  const handleRoleChange = (userId, newRole) => {
    onRoleChange(userId, newRole);
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    className="form-control"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
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
