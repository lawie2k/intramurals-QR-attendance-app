import SuperAdminSidebar from "./superAdminTabs/superAdminSidebar"
import Topbar from "./tabs/topbar"
import { Outlet } from "react-router-dom";

export default function SuperAdminMainDashboard() {
    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="flex">
                    <SuperAdminSidebar />
                    <div className="flex-1">
                        <Topbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
