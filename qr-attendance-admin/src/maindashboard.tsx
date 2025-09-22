import Sidebar from "./tabs/sidebar"
import { Outlet } from "react-router-dom";

export default function MainDashboard() {
    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}