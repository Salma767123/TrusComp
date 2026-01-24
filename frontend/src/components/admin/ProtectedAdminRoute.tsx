import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
