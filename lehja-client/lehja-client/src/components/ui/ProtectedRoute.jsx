import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }){
    const { user, loading } = useAuth();
    
    if (loading) {
    return <div>Loading...</div>;
  }

  // execution only reaches here if loading is false

  if (user == null) {
    return <Navigate to="/login" />;
  }

  // execution only reaches here if loading is false AND user exists

  return children;
}