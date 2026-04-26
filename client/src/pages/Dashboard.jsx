import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === "developer") nav("/developer");
    else nav("/company");

  }, []);

  return <div>Loading...</div>;
}