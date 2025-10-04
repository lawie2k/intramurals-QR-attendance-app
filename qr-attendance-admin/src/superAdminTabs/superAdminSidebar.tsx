import React from "react";
import { NavLink } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBullhorn,
    faCalendarDays,
    faFile,
    faMedal,
    faTableColumns,
    faShieldAlt
} from "@fortawesome/free-solid-svg-icons";

export default function SuperAdminSidebar() {
    const [active, setActive] = React.useState<string>("super-admin-dashboard");

    return (
        <>
            <div
                className='bg-[#8B0000] w-[390px] h-screen shadow-[0px_-1px_29px_4px_rgba(0,_0,_0,_0.8)]'>
                <div className="pl-10">
                    <h1 className="text-[#FF4444] text-[36px] font-extrabold">UMTC<span className="text-[#FFD700]">SuperAdmin</span></h1>
                    
                    {/* Super Admin Navigation - Essential Tabs Only */}
                    <div className='text-white pt-10'>
                        <NavLink
                            to="/super-admin/super-admin-dashboard"
                            className={` text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "super-admin-dashboard" ? "bg-[#FEF2F2] text-[#DC2626]" : "hover:text-[#FFD700]"}`}
                            onClick={() => setActive("super-admin-dashboard")}>
                            <FontAwesomeIcon icon={faShieldAlt} />
                            <span className="ml-2">Dashboard</span>
                        </NavLink>
                    </div>
                    
                    <div className="text-white pt-10">
                        <NavLink
                            to="/super-admin/super-admin-events"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "super-admin-events" ? "bg-[#FEF2F2] text-[#DC2626]" : "hover:text-[#FFD700]"}`}
                            onClick={() => setActive("super-admin-events")}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span className="ml-2">Events</span>
                        </NavLink>
                    </div>
                    
                    <div className="text-white pt-10">
                        <NavLink
                            to="/super-admin/super-admin-leaderboard"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "super-admin-leaderboard" ? "bg-[#FEF2F2] text-[#DC2626]" : "hover:text-[#FFD700]"}`}
                            onClick={() => setActive("super-admin-leaderboard")}>
                            <FontAwesomeIcon icon={faMedal} />
                            <span className="ml-2">Leaderboard</span>
                        </NavLink>
                    </div>
                    
                    <div className="text-white pt-10">
                        <NavLink
                            to="/super-admin/super-admin-announcement"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "super-admin-announcement" ? "bg-[#FEF2F2] text-[#DC2626]" : "hover:text-[#FFD700]"}`}
                            onClick={() => setActive("super-admin-announcement")}>
                            <FontAwesomeIcon icon={faBullhorn} />
                            <span className="ml-2">Announcement</span>
                        </NavLink>
                    </div>
                    
                    <div className="text-white pt-10">
                        <NavLink
                            to="/super-admin/super-admin-reports"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "super-admin-reports" ? "bg-[#FEF2F2] text-[#DC2626]" : "hover:text-[#FFD700]"}`}
                            onClick={() => setActive("super-admin-reports")}>
                            <FontAwesomeIcon icon={faFile} />
                            <span className="ml-2">Reports</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
