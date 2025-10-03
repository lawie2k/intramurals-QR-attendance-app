import React from "react";

export default function Events() {
	return (
		
		<div>
			<div>
				<h1 className="text-[32px] font-bold ml-[25px]">Events</h1>
			</div>
			<div className="ml-10 mt-12 flex-col">
				<input type="text" className="w-[100px] mr-2 text-black border-2 border-black-300 rounded-md text-bold" placeholder="Game Name" />
				<input type="text" className="w-[100px] mr-2 text-black border-2 border-black-300 rounded-md text-bold" placeholder="Team Playing"/>
				<input type="text" className="w-[100px] mr-2 text-black border-2 border-black-300 rounded-md text-bold" placeholder="Date" />
                <input type="text" className="w-[100px] mr-2 text-black border-2 border-black-300 rounded-md text-bold" placeholder="Venue"/>
				<input type="text" className="w-[100px] mr-2 text-black border-2 border-black-300 rounded-md text-bold" placeholder="Status"/>

				<button className="w-[150px] h-[25px] bg-[#18B500] text-bold text-white ml-2 rounded-md">Add Events</button>
			</div>
			<div className="bg-[#F1F8FD] w-[1050px] h-[580px] mt-5 pt-10 ml-[45px]">
				
			</div>
			</div>
		
		
		
	);
}

