import React from "react";
import DataGridItem from "../../components/DataGrid";
import DataGrid from "../../components/DataGrid";

export default function announcement() {

    const announcementData = [
        { id: 1, Title: "Basketball finals", Date:"2024-01-15", Status:"ongoing" }
    ];

    const columns = [
        { field: "Title", headerName: "Game Name", width: "200px" },
        { field: "Date", headerName: "Date", width: "150px" },
        { field: "Status", headerName: "Status", width: "100px" },
    ]
    return (
        <>
        <div className="h-[900px] px-[40px] pt-[20px]">
			<div>
				<h1 className="mt-[20px] font-bold text-[36px] text-red-600">Announcement</h1>
			</div>
			<div className=" mt-12 flex-col">
				<input type="text" className="w-[100px] mr-2 px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Title" />
				<input type="date" className="w-[125px] mr-2 px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Date Posted"/>
				<input type="text" className="w-[100px] mr-2 px-1 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Status" />

				<button className="w-[100px] h-[25px] bg-[#18B500] font-bold text-white ml-2 rounded-md">Add Events</button>
			</div>
			<div className="w-full h-[700px] mt-2 bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
				<DataGrid columns={columns}
                          data={announcementData}
                />
			</div>
			</div>
		
        </>
   )
}