import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import DataGrid from "../../components/DataGrid";

export default function Attendance() {
    const [open,setopen] = React.useState(false);
    
    // Sample data for the grid
    const attendanceData = [
        { id: 1, studentName: "John Doe", studentId: "2023-001", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 2, studentName: "Jane Smith", studentId: "2023-002", event: "Volleyball", date: "2024-01-15", time: "11:45 AM", status: "Present" },
        { id: 3, studentName: "Mike Johnson", studentId: "2023-003", event: "Football", date: "2024-01-15", time: "02:15 PM", status: "Absent" },
        { id: 4, studentName: "Sarah Wilson", studentId: "2023-004", event: "Basketball", date: "2024-01-15", time: "10:30 AM", status: "Present" },
        { id: 5, studentName: "David Brown", studentId: "2023-005", event: "Swimming", date: "2024-01-15", time: "03:00 PM", status: "Present" },
    ];

    const columns = [
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

		<div className=" h-[900px] px-[40px] pt-[20px]">
            {open && (
                <>
                    <div className="absolute ml-78 mt-8 w-[600px] h-[800px] bg-[#8D8D8D] rounded-3xl flex flex-col items-center">
                    <button
                        onClick={() => setopen(false)}
                        className="text-[28px] pl-5 pt-5 self-start">
                        <FontAwesomeIcon
                            icon={faArrowLeft as IconProp}
                            style={{ color: "#C70039" }}
                        />
                    </button>

                    <div className="relative w-[400px] h-[400px] mt-8 bg-black rounded-lg overflow-hidden">

                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#900C27]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#900C27]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#900C27]"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#900C27]"></div>


                        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF00] to-transparent animate-pulse"
                             style={{
                                 animation: 'scan 2s linear infinite',
                                 top: '50%',
                                 transform: 'translateY(-50%)'
                             }}>
                        </div>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                            <p className="text-lg font-bold">Position QR code within frame</p>
                            <p className="text-sm text-gray-300">Scanning...</p>
                        </div>
                    </div>
                    </div>
                </>
            )}
			<h1 className="mt-[20px] font-bold text-[36px]">Attendance</h1>
		<div>
			<div className="w-full h-full mt-[10px] flex flex-col justify-between	 ">
				<div className="flex justify-between">
				<button
                    onClick={() => setopen(true)}
                    className="w-[150px] h-[40px] bg-[#900C27] text-white rounded-2xl hover:bg-[#661424] transition-colors ">
                    <h2>Scan Qr</h2>
                </button>
				</div>
				<div className="w-full h-[700px] mt-2 bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <DataGrid 
                        data={attendanceData}
                        columns={columns}
                        height="600px"
                        showSearch={true}
                        pageSize={5}
                    />
                </div>
			</div>
			</div>
		</div>
		
	);
}

