import { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "../Profile/ProfilePage";
import MyTeams from "./MyTeams";
import PaymentPage from "./PaymentPage";
import JoinedTeams from "./JoinedTeams";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("profile");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveView={setActiveView} activeView={activeView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {activeView === "my-teams" && <MyTeams />}
          {activeView === "joined-teams" && <JoinedTeams />}
          {activeView === "profile" && <ProfilePage />}
          {activeView === "payments" && <PaymentPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
