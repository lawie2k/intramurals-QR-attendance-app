
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
                        <Route path="reports" element={<Reports />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}