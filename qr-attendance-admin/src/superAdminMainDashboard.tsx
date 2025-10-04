import SuperAdminSidebar from "./superAdminTabs/superAdminSidebar"
import SuperAdminTopbar from "./superAdminTabs/superAdminTopbar"
import { Outlet } from "react-router-dom";

export default function SuperAdminMainDashboard() {
    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="flex">
                    <SuperAdminSidebar />
                    <div className="flex-1">
                        <SuperAdminTopbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
