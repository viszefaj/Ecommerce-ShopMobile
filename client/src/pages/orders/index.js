import React, { useState, useEffect } from "react";
import { get } from "../../utils/axiosUtil";
import { selectId } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    const userId = useSelector(selectId);
    const getOrders = async () => {
        const response = await get(`/main/myorders/${userId}`).then((res) => {
            setOrders(res.data);
        }).catch((err) => {
            console.log("error", err);
            toast.error("Failed to get orders");
        })
    }
    console.log("orders", orders)

    useEffect(() => {
        getOrders();
    }, [userId]);
    return (
        <div className="container">
            <h2 className="mt-5 d-flex justify-content-center">My Orders</h2>
            {orders?.length === 0 ? (
                <p className="mt-5 d-flex justify-content-center">
                    No orders available
                </p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ fontSize: "12px" }}>Title</th>
                            <th style={{ fontSize: "12px" }}>Amount</th>
                            <th style={{ fontSize: "12px" }}>Status</th>
                            <th style={{ fontSize: "12px" }}>Date</th>
                            <th style={{ fontSize: "12px" }}>Payment Method</th>
                            <th style={{ fontSize: "12px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 &&
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: "12px" }}>{order.title}</td>
                                    <td style={{ fontSize: "12px" }}>${order.total}</td>
                                    <td style={{ fontSize: "12px" }}>{order.status}</td>
                                    <td style={{ fontSize: "12px" }}>{order.date}</td>
                                    <td style={{ fontSize: "12px" }}>{order.payment_method}</td>
                                    <td style={{ fontSize: "12px" }}>{order.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrders;