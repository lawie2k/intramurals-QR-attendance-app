
import React from "react";
import { NavLink } from "react-router-dom";

export default function Topbar() {
 return (
     <>
     <div className="flex w-full h-[62px] justify-between items-center px-10 bg-white shadow-sm">
         <h1 className="font-extrabold text-[36px] text-gray-800">DCE</h1>
          <NavLink
              to="/login"
              className="hover:text-[#FFB522] transition-colors duration-200 flex items-center gap-2">
              <span className="text-sm font-medium">Logout</span>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
          </NavLink>
     </div>
     </>
 )
}