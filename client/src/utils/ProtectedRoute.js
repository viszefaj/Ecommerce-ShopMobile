import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (auth.role === "admin") {
        navigate("/admin");
    } else {
        navigate("/");
    }
    return children;
};