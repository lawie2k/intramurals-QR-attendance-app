import React from "react";

export default function Dashboard() {
	return (
		<div className=" h-[900px] px-[40px] pt-[20px] ">
			<h1 className=" font-bold text-[36px]">Dashboard</h1>
		<div>
			<div className="w-full h-[650px] mt-[10px] flex flex-col">

				<div className="flex justify-between ">
				<div className="w-[590px] h-[250px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] ">
                    <h2 className="pl-5 pt-5">Total Attendance</h2>
                </div>
				<div className="w-[590px] h-[250px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] ">
                    <h2 className="pl-5 pt-5">Total Student</h2>
                </div>
				</div>
				<div className="flex justify-between mt-[30px]">
				<div className="w-[500px] h-[515px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)]">
                    <h2 className="pl-5 pt-5">Events</h2>
                </div>
				<div className="w-[680px] h-[515px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)]">
                    <h2 className="pl-5 pt-5">Leaderboards</h2>
                </div>
				</div>
				
			</div>
			</div>
		</div>
	);
}

