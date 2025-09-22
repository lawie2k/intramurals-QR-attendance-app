import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const [active, setActive] = React.useState<string>("dashboard");

    return (
        <>
            <div
                className='bg-[#900C27] w-[390px] h-screen mr-5 shadow-[0px_-1px_29px_4px_rgba(0,_0,_0,_0.8)]'>
                <div className="pl-10">
                    <h1 className="text-[#E03A2E] text-[36px] font-extrabold">UMTC<span className="text-[#F6C667]">Intramurals</span></h1>
                    <div className='text-white pt-10'>
                        <NavLink
                            to="/dashboard"
                            className={` text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "dashboard" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("dashboard")}>
                            <span className="ml-2">Dashboard</span>
                        </NavLink>
                    </div>
                    <div className="text-white pt-5">
                        <NavLink
                            to="/attendance"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "attendance" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("attendance")}>
                            <span className="ml-2">Attendance</span>
                        </NavLink>
                    </div>
                    <div className="text-white pt-5">
                        <NavLink
                            to="/events"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "events" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("events")}>
                            <span className="ml-2">Events</span>
                        </NavLink>
                    </div>
                    <div className="text-white pt-5">
                        <NavLink
                            to="/leaderboard"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "leaderboard" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("leaderboard")}>
                            <span className="ml-2">Leaderboard</span>
                        </NavLink>
                    </div>
                    <div className="text-white pt-5">
                        <NavLink
                            to="/reports"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "reports" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("reports")}>
                            <span className="ml-2">Reports</span>
                        </NavLink>
                    </div>
                    <div className="text-white pt-5">
                        <NavLink
                            to="/login"
                            className={`text-[28px] font-extrabold w-[250px] text-left px-3 py-2 rounded-xl ${active === "logout" ? "bg-[#F1F8FD] text-[#FFB522]" : "hover:text-[#FFB522]"}`}
                            onClick={() => setActive("logout")}>
                            <span className="ml-2">Log out</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

