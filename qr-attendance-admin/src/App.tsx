
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./tabs/login";
import Signup from "./tabs/signup";
import MainDashboard from "./maindashboard";
import Dashboard from "./tabs/dashboard";
import Attendance from "./tabs/attendance";
import Events from "./tabs/events";
import Leaderboard from "./tabs/leaderboard";
import Reports from "./tabs/reports";
import Student from "./tabs/student";
// Super Admin imports
import SuperAdminMainDashboard from "./superAdminMainDashboard";
import SuperAdminDashboard from "./superAdminTabs/superAdminDashboard";
import SuperAdminManageAdmins from "./superAdminTabs/superAdminManageAdmins";
import SuperAdminEvents from "./superAdminTabs/superAdminEvents";
import SuperAdminLeaderboard from "./superAdminTabs/superAdminLeaderboard";
import SuperAdminAnnouncement from "./superAdminTabs/superAdminAnnouncement";
import SuperAdminReports from "./superAdminTabs/superAdminReports";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<MainDashboard />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="events" element={<Events />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        <Route path="student" element={<Student />} />
                        <Route path="reports" element={<Reports />} />
                    </Route>
                    {/* Super Admin Routes */}
                    <Route path="/super-admin" element={<SuperAdminMainDashboard />}>
                        <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
                        <Route path="super-admin-manage-admins" element={<SuperAdminManageAdmins />} />
                        <Route path="super-admin-events" element={<SuperAdminEvents />} />
                        <Route path="super-admin-leaderboard" element={<SuperAdminLeaderboard />} />
                        <Route path="super-admin-announcement" element={<SuperAdminAnnouncement />} />
                        <Route path="super-admin-reports" element={<SuperAdminReports />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}