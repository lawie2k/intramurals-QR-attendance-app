import React from "react";
import DataGrid from "../../components/DataGrid";

export default function Reports() {
    const [selected, setSelected] = React.useState<
        | "super-admin-manage-admins"
        | "super-admin-events"
        | "super-admin-leaderboard"
        | "super-admin-announcement"
    >("super-admin-events");

    // Events table data and columns (same structure as tabs/events.tsx)
    const eventsData = [
        { id: 1, GameName: "BasketBall", TeamPlaying: "DASE VS DCE", Date: "Sept 11, 2:00 PM", Venue: "GYM", Status: "Ongoing" },
        { id: 2, GameName: "BasketBall", TeamPlaying: "DASE VS DCE", Date: "Sept 11, 2:00 PM", Venue: "GYM", Status: "Ongoing" },
        { id: 3, GameName: "BasketBall", TeamPlaying: "DASE VS DCE", Date: "Sept 11, 2:00 PM", Venue: "GYM", Status: "Ongoing" },
        { id: 4, GameName: "BasketBall", TeamPlaying: "DASE VS DCE", Date: "Sept 11, 2:00 PM", Venue: "GYM", Status: "Ongoing" },
        { id: 5, GameName: "BasketBall", TeamPlaying: "DASE VS DCE", Date: "Sept 11, 2:00 PM", Venue: "GYM", Status: "Ongoing" },
    ];
    const eventColumns = [
        { field: "GameName", headerName: "Game Name", width: "200px" },
        { field: "TeamPlaying", headerName: "Team Playing", width: "120px" },
        { field: "Date", headerName: "Date", width: "150px" },
        { field: "Venue", headerName: "Venue", width: "120px" },
        { field: "Status", headerName: "Status", width: "100px" },
    ];

    // Leaderboard table data and columns (same structure as tabs/leaderboard.tsx)
    const leaderboardData = [
        { id: 1, Department: "DASE", Gold: "5", Silver: "4", Bronze: "2" },
        { id: 2, Department: "DCE", Gold: "3", Silver: "2", Bronze: "5" },
    ];
    const leaderboardColumns = [
        { field: "Department", headerName: "Department", width: "100px" },
        { field: "Gold", headerName: "Gold", width: "100px" },
        { field: "Silver", headerName: "Silver", width: "100px" },
        { field: "Bronze", headerName: "Bronze", width: "100px" },
    ];

    // Attendance table data and columns (same structure as tabs/attendance.tsx)
    const attendanceData = [
        { id: 1, studentName: "John Doe", studentId: "2023-001", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 2, studentName: "Jane Smith", studentId: "2023-002", event: "Volleyball", date: "2024-01-15", time: "11:45 AM", status: "Present" },
        { id: 3, studentName: "Mike Johnson", studentId: "2023-003", event: "Football", date: "2024-01-15", time: "02:15 PM", status: "Absent" },
        { id: 4, studentName: "Sarah Wilson", studentId: "2023-004", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 5, studentName: "David Brown", studentId: "2023-005", event: "Swimming", date: "2024-01-15", time: "03:00 PM", status: "Present" },
    ];
    const attendanceColumns = [
        { field: "studentName", headerName: "Student Name", width: "200px" },
        { field: "studentId", headerName: "Student ID", width: "120px" },
        { field: "event", headerName: "Event", width: "150px" },
        { field: "date", headerName: "Date", width: "120px" },
        { field: "time", headerName: "Time", width: "100px" },
        {
            field: "status",
            headerName: "Status",
            width: "100px",
            cellRenderer: ({ value }: { value: string }) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                    value === "Present" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}>
                    {value}
                </span>
            ),
        },
    ];

    // Student table data and columns (same structure as tabs/student.tsx)
    const studentData = [
        { id: 1, studentName: "John Doe", studentId: "2023-001", status: "Present" },
        { id: 2, studentName: "Jane Smith", studentId: "2023-002", status: "Present" },
        { id: 3, studentName: "Mike Johnson", studentId: "2023-003", status: "Absent" },
        { id: 4, studentName: "Sarah Wilson", studentId: "2023-004", status: "Present" },
        { id: 5, studentName: "David Brown", studentId: "2023-005", status: "Present" },
    ];
    const studentColumns = [
        { field: "studentName", headerName: "Student Name", width: "200px" },
        { field: "studentId", headerName: "Student ID", width: "120px" },
        {
            field: "status",
            headerName: "Status",
            width: "100px",
            cellRenderer: ({ value }: { value: string }) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                    value === 'Present' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                }`}>
                    {value}
                </span>
            )
        },
    ];

    // Manage Admins table data and columns (same structure as superAdminManageAdmins.tsx)
    const manageAdminsData = [
        { id: 1, Department: "DCE", email: "admin1@umtc.edu", role: "Admin", status: "Active", Dateadded: "2024-01-15 10:30" },
        { id: 2, Department: "DASE", email: "admin2@umtc.edu", role: "Admin", status: "Active", Dateadded: "2024-01-15 14:25" },
    ];
    const manageAdminsColumns = [
        { field: 'Department', headerName: 'Department', width: '20%' },
        { field: 'email', headerName: 'Email', width: '25%' },
        { field: 'role', headerName: 'Role', width: '15%' },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: '15%',
            cellRenderer: ({ value }: { value: string }) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    value === 'Active' ? 'text-green-600 bg-green-100' :
                    value === 'Suspended' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
                }`}>
                    {value}
                </span>
            )
        },
        { field: 'Dateadded', headerName: 'Date added', width: '15%' },
    ];

    // Announcement table data and columns (same structure as superAdminAnnouncement.tsx)
    const announcementData = [
        { id: 1, Title: 'Basketball finals', Date: '2024-01-15', Status: 'ongoing' },
    ];
    const announcementColumns = [
        { field: 'Title', headerName: 'Game Name', width: '200px' },
        { field: 'Date', headerName: 'Date', width: '150px' },
        { field: 'Status', headerName: 'Status', width: '100px' },
    ];

    const exportToCSV = () => {
        const mapping: Record<string, { columns: any[]; data: any[] }> = {
            "super-admin-events": { columns: eventColumns, data: eventsData },
            "super-admin-leaderboard": { columns: leaderboardColumns, data: leaderboardData },
            "super-admin-manage-admins": { columns: manageAdminsColumns, data: manageAdminsData },
            "super-admin-announcement": { columns: announcementColumns, data: announcementData },
        };
        const current = mapping[selected as keyof typeof mapping];
        if (!current) {
            alert("No data to export for this section.");
            return;
        }
        const headers = current.columns.map((c) => c.headerName ?? c.field);
        const rows = current.data.map((row) => current.columns.map((c) => row[c.field]));
        const csvContent = [headers, ...rows]
            .map(r => r.map((cell) => {
                const s = String(cell ?? "");
                const needsQuotes = s.includes(",") || s.includes("\n") || s.includes("\"");
                const escaped = s.replace(/\"/g, '""');
                return needsQuotes ? `"${escaped}"` : escaped;
            }).join(","))
            .join("\n");
        const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selected}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const renderGrid = () => {
        switch (selected) {
            case "super-admin-leaderboard":
                return (
                    <DataGrid
                        columns={leaderboardColumns}
                        data={leaderboardData}
                        height="600px"
                        pageSize={5}
                    />
                );
            case "super-admin-events":
                return (
                    <DataGrid
                        columns={eventColumns}
                        data={eventsData}
                        height="600px"
                        pageSize={5}
                    />
                );
            case "super-admin-manage-admins":
                return (
                    <DataGrid
                        columns={manageAdminsColumns}
                        data={manageAdminsData}
                        height="600px"
                        pageSize={5}
                    />
                );
            case "super-admin-announcement":
                return (
                    <DataGrid
                        columns={announcementColumns}
                        data={announcementData}
                        height="600px"
                        pageSize={5}
                    />
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-700">
                        No table available for this section.
                    </div>
                );
        }
    };

    return (
        <div className="h-[900px] px-[40px] pt-[20px]">
            <div>
                <h1 className="mt-[20px] font-bold text-[36px]">Reports</h1>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <label htmlFor="reportSelect" className="font-medium">Show table:</label>
                <select
                    id="reportSelect"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value as any)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="super-admin-events">Events</option>
                    <option value="super-admin-leaderboard">Leaderboard</option>
                    <option value="super-admin-manage-admins">Manage Admins</option>
                    <option value="super-admin-announcement">Announcement</option>
                </select>
                <button onClick={exportToCSV} className="ml-auto w-[170px] h-[40px] bg-[#900C27] text-white rounded-2xl hover:bg-[#661424] transition-colors">
                    Export to Excel
                </button>
            </div>

            <div className="w-full h-[700px] mt-6 bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                {renderGrid()}
            </div>
        </div>
    );
}

