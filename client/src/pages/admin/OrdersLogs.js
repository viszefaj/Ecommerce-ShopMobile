import React, { useState } from "react";

const orders = [
  {
    orderId: "123456",
    customer: "John Doe",
    amount: 250.99,
    status: "Pending",
  },
  {
    orderId: "789012",
    customer: "Jane Smith",
    amount: 150.5,
    status: "Processing",
  },
];

const OrderLogs = () => {
  const [updatedOrders, setUpdatedOrders] = useState(orders);

  const handleChangeStatus = (index, newStatus) => {
    const updatedOrder = { ...updatedOrders[index], status: newStatus };
    const updatedOrderList = [...updatedOrders];
    updatedOrderList[index] = updatedOrder;
    setUpdatedOrders(updatedOrderList);
  };

  return (
    <div className="container">
      <h2 className="mt-5 d-flex justify-content-center">Order Logs</h2>
      {updatedOrders.length === 0 ? (
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
              <th style={{ fontSize: "12px" }}>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {updatedOrders.map((order, index) => (
              <tr key={index}>
                <td style={{ fontSize: "12px" }}>{order.orderId}</td>
                <td style={{ fontSize: "12px" }}>{order.customer}</td>
                <td style={{ fontSize: "12px" }}>${order.amount.toFixed(2)}</td>
                <td style={{ fontSize: "12px" }}>{order.status}</td>
                <td style={{ fontSize: "12px" }}>
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeStatus(index, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
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

export default OrderLogs;
