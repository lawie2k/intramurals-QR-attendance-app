import React from "react";

export default function Events() {


    const columns = [
        { field: "GameName", headerName: "Game Name", width: "200px" },
        { field: "TeamPlaying", headerName: "Team Playing", width: "120px" },
        { field: "Date", headerName: "Date", width: "150px" },
        { field: "Venue", headerName: "Venue", width: "120px" },
        { field: "Status", headerName: "Status", width: "100px" },
        ]

	return (
		
		<div className="h-[900px] px-[40px] pt-[20px]">
			<div>
				<h1 className="mt-[20px] font-bold text-[36px]">Events</h1>
			</div>
			<div className=" mt-12 flex-col">
				<input type="text" className="w-[100px] mr-2 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Game Name" />
				<input type="text" className="w-[150px] mr-2 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Team Playing"/>
				<input type="date" className="w-[120px] mr-2 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Date" />
                <input type="text" className="w-[150px] mr-2 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Venue"/>
				<input type="text" className="w-[100px] mr-2 text-black border-1 border-black-300 rounded-md text-bold" placeholder="Status"/>

				<button className="w-[100px] h-[25px] bg-[#18B500] font-bold text-white ml-2 rounded-md">Add Events</button>
			</div>
			<div className="w-full h-[700px] mt-2 bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
				
			</div>
			</div>
		
		
		
	);
}

