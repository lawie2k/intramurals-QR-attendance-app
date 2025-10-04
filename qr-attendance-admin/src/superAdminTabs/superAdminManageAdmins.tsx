import React, { useState } from "react";
import DataGrid from "../../components/DataGrid";

export default function SuperAdminManageAdmins() {
    const [admins, setAdmins] = useState([
        { id: 1, Department: "DCE", email: "admin1@umtc.edu", role: "Admin", status: "Active", Dateadded: "2024-01-15 10:30", permissions: ["Read", "Write", "Events", "Reports"] },
        { id: 2, Department: "DASE", email: "admin2@umtc.edu", role: "Admin", status: "Active", Dateadded: "2024-01-15 14:25", permissions: ["Read", "Write", "Attendance"] }
    ]);

    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "text-green-600 bg-green-100";
            case "Suspended": return "text-red-600 bg-red-100";
            case "Inactive": return "text-gray-600 bg-gray-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    const columns = [
        { field: 'Department', headerName: 'Department', width: '20%' },
        { field: 'email', headerName: 'Email', width: '25%' },
        { field: 'role', headerName: 'Role', width: '15%' },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: '15%',
            cellRenderer: ({ value }: { value: string }) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(value)}`}>
                    {value}
                </span>
            )
        },
        { field: 'Dateadded', headerName: 'Date added', width: '15%' },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: '10%',
            cellRenderer: ({ row }: { row: any }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleSuspendAdmin(row.id)}
                        className={`${row.status === "Suspended" ? "text-green-600 hover:text-green-900" : "text-red-600 hover:text-red-900"} text-xs`}
                    >
                        {row.status === "Suspended" ? "Activate" : "Suspend"}
                    </button>
                    <button
                        onClick={() => handleDeleteAdmin(row.id)}
                        className="text-red-600 hover:text-red-900 text-xs"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const handleAdminClick = (admin: any) => {
        setSelectedAdmin(admin);
        setShowModal(true);
    };

    const handleSuspendAdmin = (adminId: number) => {
        setAdmins(admins.map(admin => 
            admin.id === adminId 
                ? { ...admin, status: admin.status === "Suspended" ? "Active" : "Suspended" }
                : admin
        ));
    };

    const handleDeleteAdmin = (adminId: number) => {
        setAdmins(admins.filter(admin => admin.id !== adminId));
    };

    return (
        <div className="h-[900px] px-[40px] pt-[20px]">
            <h1 className="font-bold text-[36px] mt-[20px] text-red-600">Manage Admins</h1>
            
            <div>
                <div className="w-full h-[650px] flex flex-col">

                    <div className=" mt-12 flex-col">
                        <input type="text" className="w-[100px] mr-2  px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Department" />
                        <input type="text" className="w-[150px] mr-2  px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Email"/>
                        <input type="text" className="w-[125px] mr-2  px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Role" />

                        <button className="w-[100px] h-[25px] bg-[#18B500] font-bold text-white ml-2 rounded-md">Add Events</button>
                    </div>

                    <div className="flex-1 h-[700px] bg-[#FEF2F2] mt-2 shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                        <DataGrid 
                            data={admins}
                            columns={columns}
                            height="700px"
                            showSearch={true}
                            pageSize={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
