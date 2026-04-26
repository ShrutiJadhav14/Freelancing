import { Link } from "react-router-dom";

export default function DeveloperDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Developer Dashboard</h1>

      <Link to="/developer/profile" className="text-blue-600">
        Create/View Profile
      </Link>
    </div>
  );
}