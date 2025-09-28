import Sidebar from "./tabs/sidebar"
import Topbar from "./tabs/topbar"
import { Outlet } from "react-router-dom";

export default function MainDashboard() {
    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                        <Topbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}