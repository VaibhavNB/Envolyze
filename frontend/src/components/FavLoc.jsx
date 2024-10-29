import React from "react";
import { useState } from "react";

const FavLoc = (props) => {
    const [isOpen, setisOpen] = useState(false);
    const handleClick = () => {
        setisOpen(!isOpen);
    }
  return (
    
    <div onClick={handleClick} className={`${isOpen == true ? "scale-200 z-50 transition-all duration-200" : "scale-100 transition-all duration-200 z-0"} w-full px-4 py-6 hover:translate-y-[-2px]  bg-green-500 text-white shadow-md hover:shadow-lg rounded-lg flex flex-col justify-center items-center`}>
      <p>{props.place}</p>
      <img className="w-12 h-12" src={"/sun.png"} alt="" />
      <div>
        <div className="flex gap-4 justify-between items-center">
          <p>temperature</p>
          <p>{props.temp} Deg</p>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <p>humidity</p>
          <p>{props.humid}%</p>
        </div>
      </div>
    </div>
  );
};

export default FavLoc;
