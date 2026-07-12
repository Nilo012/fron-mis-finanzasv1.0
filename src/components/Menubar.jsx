import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { Import } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { assets } from "../assets/assets";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { Sidebar } from "lucide-react";
import { useEffect } from "react";

const Menubar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout =()=>{
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login")
  }
  //click en cualkir parte para cerrar el perfil
  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropdown(false);
      }
      
    };
    if (showDropdown) {
      document.addEventListener("mousedown",handleClickOutside);
    }
    return()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    }

  },[showDropdown]);


  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* left side - menu boton y titulo */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2x1" />
          ) : (
            <Menu className="text-2x1" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <span className="text-lg font-medium text-black truncate">
            {" "}
            Mis Finanzas
          </span>
        </div>
      </div>

      {/* right side - avatar foto */}
      <div onClick={()=>setShowDropdown(!showDropdown)} className="relative" ref={dropdownRef}>
        <button className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2">
          <User className="text-indigo-500" />
        </button>
        {/* dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* informacion de perfil */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                        {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {user.email}
                    </p>
                </div>
              </div>
            </div>
            {/* drop option */}
            <div className="py-1">
                <button onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                    <LogOut className="w-4 h-4 text-gray-500"/>
                    <span>Cerrar Sesión</span>


                </button>
            </div>
          </div>
        )}
      </div>

      {/* movile side menu  */}
      {
        openSideMenu && (
          <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
            <Sidebar activeMenu={activeMenu}/>

          </div>
          
        )
      }
    </div>
  );
};
export default Menubar;
