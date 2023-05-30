import React from "react";

const OrderLogs = ({ orders }) => {
  return (
    <div className="container">
      <h2>Order Logs</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderId}</td>
                <td>{order.customer}</td>
                <td>${order.amount.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderLogs;
