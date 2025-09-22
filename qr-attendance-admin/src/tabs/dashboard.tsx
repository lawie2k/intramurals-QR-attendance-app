import React from "react";

export default function Dashboard() {
	return (
		<div className="">
			<h1 className="mt-[20px] text-[20px]"><span className="font-bold text-[36px] ml-[35px]">Dashboard </span>summary of your app</h1>
		<div>
			<div className="w-[1000px] h-[650px] mt-[30px] ml-[40px] flex flex-col justify-between	 ">
				<div className="w-[1000px] h-[78px] bg-[#D9D9D9]">
				</div>

				<div className="flex justify-between">
				<div className="w-[300px] h-[250px] bg-[#D9D9D9] "></div>
				<div className="w-[300px] h-[250px] bg-[#D9D9D9] "></div>
				<div className="w-[300px] h-[250px] bg-[#D9D9D9] "></div>
				</div>
				<div className="flex justify-between">
				<div className="w-[400px] h-[200px] bg-[#D9D9D9]"></div>
				<div className="w-[550px] h-[200px] bg-[#D9D9D9]"></div>
				</div>
				
			</div>
			</div>
		</div>
	);
}

