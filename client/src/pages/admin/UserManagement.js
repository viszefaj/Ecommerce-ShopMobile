import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { get, update } from "../../utils/axiosUtil.js";
import { toast } from "react-toastify";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const updateUserRole = async (user) => {
    console.log("user", user);
    if (user) {
      try {
        const response = await update("/dashboard/users/update", {
          id: user.id,
          role: user.role,
        }).then(() => {
          toast.success("User role updated");
          setUserToUpdate(null);
        });
      }
      catch (error) {
        console.error(error);
        toast.error("Error updating user role");
      }
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          updateUserRole({ ...user, role: newRole });
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };

  console.log("userToUpdate", userToUpdate);

  useEffect(() => {
    if (userToUpdate !== null) {
      updateUserRole(userToUpdate)
    }
  }, [userToUpdate]);

  const fetchUsers = async () => {
    try {
      const response = await get("/dashboard/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ProtectedRoute>
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
                  <td style={{ fontSize: "12px" }}>{user.firstname}</td>
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
                      <option style={{ fontSize: "12px" }} value="deliver">
                        Deliver
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
