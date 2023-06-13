import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { get } from "../../utils/axiosUtil.js";


const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await get("/dashboard/messages");
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container">
        <h2 className="mt-5 d-flex justify-content-center">Messages</h2>
        {messages.length === 0 ? (
          <p className="mt-5 d-flex justify-content-center">
            No messages available
          </p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ fontSize: "12px" }}>Name</th>
                <th style={{ fontSize: "12px" }}>Email</th>
                <th style={{ fontSize: "12px" }}>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td style={{ fontSize: "12px" }}>{message.name}</td>
                  <td style={{ fontSize: "12px" }}>{message.email}</td>
                  <td style={{ fontSize: "12px" }}>{message.message}</td>
                  <td style={{ fontSize: "12px" }}>{message.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MessageTable;
