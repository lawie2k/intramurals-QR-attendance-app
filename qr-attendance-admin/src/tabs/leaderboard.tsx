import React from "react";

export default function Leaderboard() {
	return (
		<div className="h-[900px] px-[40px] pt-[20px]">
			<div>
				<h1 className="mt-[20px] font-bold text-[36px]">Leaderboard</h1>
			</div>
			<div className="mt-12 flex-col">
				<input type="text" className="w-[150px] mr-2 text-black border-1 border-black-300 rounded-md" placeholder="Department" />

				<button className="w-[150px] h-[25px] bg-[#18B500] font-bold text-white ml-2 rounded-md">Add Leaderboard</button>
			</div>
			<div className="w-full h-[700px] mt-2 bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
				
			</div>
			</div>
	);
}

