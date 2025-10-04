import React from "react";
import DataGrid from "../../components/DataGrid";

export default function student() {

    const studentData = [
        { id: 1, studentName: "John Doe", studentId: "2023-001", status: "Present" },
        { id: 2, studentName: "Jane Smith", studentId: "2023-002", status: "Present" },
        { id: 3, studentName: "Mike Johnson", studentId: "2023-003", status: "Absent" },
        { id: 4, studentName: "Sarah Wilson", studentId: "2023-004", status: "Present" },
        { id: 5, studentName: "David Brown", studentId: "2023-005", status: "Present" },
    ];

    const columns = [
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

    return (
        <>
       <div className="h-[900px] px-[40px] pt-[20px]">
			<div>
				<h1 className="mt-[20px] font-bold text-[36px]">Student</h1>
			</div>
		
			<div className="w-full h-[700px] mt-2 bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
				<DataGrid columns={columns}
                          data={studentData}
                />
			</div>
			</div>
		
        </>
    )
}