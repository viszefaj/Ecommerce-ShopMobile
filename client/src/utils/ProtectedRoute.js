import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.role || auth.role !== "admin") {
            navigate("/login")
        }
    }, [auth]);


    return children;
};