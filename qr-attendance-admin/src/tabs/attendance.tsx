import React from "react";

export default function Attendance() {
	return (
		<div className=" h-[900px] px-[40px] pt-[20px]">
			<h1 className="mt-[20px] text-[20px]"><span className="font-bold text-[36px]">Attendance </span></h1>
		<div>
			<div className="w-full h-full mt-[10px] flex flex-col justify-between	 ">
				
				<div className="flex justify-between">
				<button className="w-[150px] h-[40px] bg-[#900C27] text-white rounded-2xl ">
                    <h2>Scan Qr</h2>
                </button>
				</div>
				<div className="w-full h-[700px] mt-2 bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)]">
                    <h2>display database for student</h2>
                </div>
			</div>
			</div>
		</div>
		
	);
}

