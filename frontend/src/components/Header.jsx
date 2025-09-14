import React from "react";
const Headers = () => {
    return ( 
        <div className="flex justify-between items-center px-2 pb-2  ">
            <div className="flex items-center z-20">
                <img src="/img/schoolLogo.jpg" width={50} alt="school" />
                <h1 className="text-blue-700 font-bold text-xl">School Systems</h1>
            </div>
            <div className="flex gap-3 items-center">
                <img src="/img/user.png" className="object-cover h-10"  alt=  "user"/>
                <div className="flex flex-col items-center">
                <p className="font-bold">admin</p>
                <button className=" text-white flex items-center bg-[#e94f10] p-2 rounded-sm text-center h-5">admin</button>
                </div>
            
            </div>
        </div>
     );
}
 
export default Headers;