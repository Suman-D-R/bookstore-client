import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../sass/dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
      <Header home={false}/>
      </div>
      
      <div className="outlet">
      <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
