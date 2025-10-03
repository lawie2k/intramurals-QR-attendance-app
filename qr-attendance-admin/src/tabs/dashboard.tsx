import React from "react";
import DataGrid from "../../components/DataGrid";

export default function Dashboard() {
    const attendanceData = [
        { id: 1, studentName: "John Doe", studentId: "2023-001", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 2, studentName: "Jane Smith", studentId: "2023-002", event: "Volleyball", date: "2024-01-15", time: "11:45 AM", status: "Present" },
        { id: 3, studentName: "Mike Johnson", studentId: "2023-003", event: "Football", date: "2024-01-15", time: "02:15 PM", status: "Absent" },
        { id: 4, studentName: "Sarah Wilson", studentId: "2023-004", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 5, studentName: "David Brown", studentId: "2023-005", event: "Swimming", date: "2024-01-15", time: "03:00 PM", status: "Present" },
    ];

    const columns = [
        { field: "studentName", headerName: "Student Name" },
        { field: "studentId", headerName: "Student ID" },
        { field: "event", headerName: "Event" },
        { field: "date", headerName: "Date" },
        { field: "time", headerName: "Time" },
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
	return (
		<div className=" h-[900px] px-[40px] pt-[20px] ">
			<h1 className=" font-bold text-[36px]">Dashboard</h1>
		<div>
			<div className="w-full h-[650px] mt-[10px] flex flex-col">

				<div className="flex justify-between ">
				<div className="w-[590px] h-[280px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] ">
                    <DataGrid
                    columns={columns}
                    data={attendanceData}
                    showSearch={false}
                    height="250px"
                    pageSize={3}
                    />
                </div>
				<div className="w-[590px] h-[280px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] ">
                    <h2 className="pl-5 pt-5">Total Student</h2>
                </div>
				</div>
				<div className="flex justify-between mt-[30px]">
				<div className="w-[500px] h-[500px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)]">
                    <h2 className="pl-5 pt-5">Events</h2>
                </div>
				<div className="w-[680px] h-[500px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)]">
                    <h2 className="pl-5 pt-5">Leaderboards</h2>
                </div>
				</div>
				
			</div>
			</div>
		</div>
	);
}

