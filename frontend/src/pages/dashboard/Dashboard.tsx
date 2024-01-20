import { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "../Profile/ProfilePage";
import AdminTeamDashboard from "./AdminTeams";
import PaymentPage from "./PaymentPage";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("teams");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {activeView === "teams" && <AdminTeamDashboard />}
          {activeView === "profile" && <ProfilePage />}
          {activeView === "payments" && <PaymentPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
