
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Topbar() {
 return (
     <>
     <div className="flex w-full h-[62px] justify-end gap-5 pr-10 items-center">
         <h1 className="font-extrabold text-[36px]">DCE</h1>
          <NavLink
              to="/login"
              className=" hover:text-[#FFB522] transition-colors">
              <FontAwesomeIcon icon={faRightFromBracket} className="text-[36px]" />
          </NavLink>
     </div>
     </>
 )
}