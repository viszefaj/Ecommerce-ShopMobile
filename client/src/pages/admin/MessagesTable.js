import React from "react";

const messages = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2022-01-01",
  },
];

const MessageTable = () => {
  return (
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
              <th style={{ fontSize: "12px" }}>Date</th>
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
  );
};

export default MessageTable;
