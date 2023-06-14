import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { get, post, update } from "../../utils/axiosUtil";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";


const OrderLogs = () => {
  const [updatedOrders, setUpdatedOrders] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getOrders = async () => {
    const response = await get(`/dashboard/orders`).then((res) => {
      console.log("res", res.data);
      setUpdatedOrders(res.data);
    }).catch((err) => {
      console.log("error", err);
    })
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChangeStatus = (index, newStatus) => {
    if (auth.role === 'admin') {
      const updatedOrder = { ...updatedOrders[index], status: newStatus };
      const updatedOrderList = [...updatedOrders];
      updatedOrderList[index] = updatedOrder;
      console.log("updateOrder", updatedOrder)
      const data = {
        id: updatedOrder.user_id,
        status: updatedOrder.status
      };
      console.log("data55", data);
      update(`/dashboard/orders/changeStatus`, data).then((res) => {
        console.log("res", res.data);
        setUpdatedOrders(updatedOrderList);
        toast.success('Order status updated successfully');
        getOrders();
      }).catch((err) => {
        toast.error('Error updating order status');
      });
    } else {
      const updatedOrder = { ...updatedOrders[index], status: newStatus };
      const updatedOrderList = [...updatedOrders];
      updatedOrderList[index] = updatedOrder;
      console.log("updateOrder", updatedOrder)
      const data = {
        id: updatedOrder.user_id,
        status: updatedOrder.status
      };
      console.log("data55", data);
      update(`/deliver/orders/changeStatus`, data).then((res) => {
        console.log("res", res.data);
        setUpdatedOrders(updatedOrderList);
        toast.success('Order status updated successfully');
        getOrders();
      }).catch((err) => {
        toast.error('Error updating order status');
      });
    }
  };

  return (
    <>
      {
        auth.role === "admin" || auth.role === "deliver" ? (
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
                    <th style={{ fontSize: "12px" }}>First Name</th>
                    <th style={{ fontSize: "12px" }}>Last Name</th>
                    <th style={{ fontSize: "12px" }}>Total</th>
                    <th style={{ fontSize: "12px" }}>Status</th>
                    <th style={{ fontSize: "12px" }}>Address</th>
                    <th style={{ fontSize: "12px" }}>City</th>
                    <th style={{ fontSize: "12px" }}>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedOrders.map((order, index) => (
                    <tr key={index}>
                      <td style={{ fontSize: "12px" }}>{order.firstname}</td>
                      <td style={{ fontSize: "12px" }}>{order.lastname}</td>
                      <td style={{ fontSize: "12px" }}>${order.total}</td>
                      <td style={{ fontSize: "12px" }}>{order.status}</td>
                      <td style={{ fontSize: "12px" }}>{order.address}</td>
                      <td style={{ fontSize: "12px" }}>{order.city}</td>
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
        ) : (
          <div className="container">
            <h3 style={{
              textAlign: "center",
              color: "red",
            }}>You do not have access!</h3>
          </div>
        )
      }
    </>
  );
};

export default OrderLogs;
