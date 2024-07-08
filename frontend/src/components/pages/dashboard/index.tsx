import { useEffect, useState } from "react";
import Sidebar from "./navigationBars/Sidebar";
import ProfilePage from "../Profile/ProfilePage";
import MyTeams from "./team/MyTeams";
import PaymentPage from "./payment/PaymentPage";
import JoinedTeams from "./team/JoinedTeams";
import PendingInvitation from "./invitation/PendingInvitation";
import { useRouter } from "next/router";
import LeaveRequests from "./leaveRequest/LeaveRequests";
import TopBar from "./navigationBars/TopBar";
import ChangePassword from "./changePassword";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<any>("");
  const { query }: any = useRouter();

  useEffect(() => {
    setActiveView(query?.activeView || "profile");
  }, [query?.activeView]);

  return (
    <div className="flex h-screen gap-4">
      {/* Sidebar should be displayed on large screens */}
      <div className="hidden sm:flex w-1/5">
        <Sidebar setActiveView={setActiveView} activeView={activeView} />
      </div>
      {/* Top bar should be displayed on small screens */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sm:hidden">
          <TopBar setActiveView={setActiveView} activeView={activeView} />
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {activeView === "my-teams" && <MyTeams />}
          {activeView === "joined-teams" && <JoinedTeams />}
          {activeView === "invitations" && <PendingInvitation />}
          {activeView === "leave-requests" && <LeaveRequests />}
          {activeView === "profile" && <ProfilePage />}
          {activeView === "payments" && <PaymentPage />}
          {activeView === "change-password" && (
            <ChangePassword setActiveView={setActiveView} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
