import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Token", token)
  console.log("user", user)

  if (!token) return <Navigate to="/login" />;

  //role based protection
  if(role && user?.role!== role){
    return <Navigate to="/" />
  }

  return children;
}