import React from "react";

const OrderLogs = ({ orders }) => {
  return (
    <div className="container">
      <h2 className="mt-5 d-flex justify-content-center">Order Logs</h2>
      {orders.length === 0 ? (
        <p className="mt-5 d-flex justify-content-center">
          No orders available
        </p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ fontSize: "12px" }}>Order ID</th>
              <th style={{ fontSize: "12px" }}>Customer</th>
              <th style={{ fontSize: "12px" }}>Amount</th>
              <th style={{ fontSize: "12px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={{ fontSize: "12px" }}>{order.orderId}</td>
                <td style={{ fontSize: "12px" }}>{order.customer}</td>
                <td style={{ fontSize: "12px" }}>${order.amount.toFixed(2)}</td>
                <td style={{ fontSize: "12px" }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderLogs;
