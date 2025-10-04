import React from "react";
import DataGrid from "../../components/DataGrid";

export default function Leaderboard() {

    const leaderboardData = [
        { id: 1, Department: "DASE", Gold:"5", Silver:"4", Bronze:"2" },
        { id: 2, Department: "DCE", Gold:"3", Silver:"2", Bronze:"5" },
    ];

    const columns = [
        { field: "Department", headerName: "Department", width: "100px" },
        { field: "Gold", headerName: "Gold", width: "100px" },
        { field: "Silver", headerName: "Silver", width: "100px" },
        { field: "Bronze", headerName: "Bronze", width: "100px" }
    ]
	return (
		<div className="h-[900px] px-[40px] pt-[20px]">
			<div>
				<h1 className="mt-[20px] font-bold text-[36px]">Leaderboard</h1>
			</div>

			<div className="w-full h-[700px] mt-16 bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
				<DataGrid columns={columns}
                          data={leaderboardData}
                />
			</div>
			</div>
	);
}

