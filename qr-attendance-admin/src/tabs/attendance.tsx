import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function Attendance() {
    const [open,setopen] = React.useState(false);
	return (

		<div className=" h-[900px] px-[40px] pt-[20px]">
            {open && (
                <>
                    <div className="absolute ml-78 mt-8 w-[600px] h-[800px] bg-[#8D8D8D] rounded-3xl flex flex-col items-center">
                    <button
                        onClick={() => setopen(false)}
                        className="text-[28px] pl-5 pt-5 self-start">
                        <FontAwesomeIcon
                            icon={faArrowLeft as IconProp}
                            style={{ color: "#C70039" }}
                        />
                    </button>

                    <div className="relative w-[400px] h-[400px] mt-8 bg-black rounded-lg overflow-hidden">

                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#900C27]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#900C27]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#900C27]"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#900C27]"></div>


                        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF00] to-transparent animate-pulse"
                             style={{
                                 animation: 'scan 2s linear infinite',
                                 top: '50%',
                                 transform: 'translateY(-50%)'
                             }}>
                        </div>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                            <p className="text-lg font-bold">Position QR code within frame</p>
                            <p className="text-sm text-gray-300">Scanning...</p>
                        </div>
                    </div>
                    </div>
                </>
            )}
			<h1 className="mt-[20px] text-[20px]"><span className="font-bold text-[36px]">Attendance </span></h1>
		<div>
			<div className="w-full h-full mt-[10px] flex flex-col justify-between	 ">
				<div className="flex justify-between">
				<button
                    onClick={() => setopen(true)}
                    className="w-[150px] h-[40px] bg-[#900C27] text-white rounded-2xl hover:bg-[#661424] transition-colors ">
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

