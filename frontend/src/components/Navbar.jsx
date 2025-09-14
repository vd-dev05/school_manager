import { useState } from "react";
import { Link } from "react-router";
import React from "react";
const NavBar = () => {
    const [isState, setIsState] = useState()
    const handleToggle = () => {
        setIsState(!isState);
    }
    return (
        <div className="w-[200px] h-[100vw] -translate-y-10 fixed bg-white flex flex-col px-5 pt-20 gap-5 top-10 z-10 ">
            <div >
                <Link to={'teacher'} className="flex gap-2 items-center " >
                    <img src="/img/teacher.png" alt="teacher" className="object-cover h-4" />
                    <p className="text-xs">Giáo viên</p>
                </Link>

            </div>
            <div>
                <div className="flex gap-2 justify-between items-center cursor-pointer" onClick={handleToggle}>
                    <div className="flex gap-2">
                        <img src="/img/analysis.png" alt="analysis" className="object-cover h-4" />
                        <p className="text-xs">Dữ liệu</p>
                    </div>
                    {isState ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}

                </div>
                {
                    isState &&
                    <div className="flex gap-2 items-center p-5 text-xs">
                        <Link to={'position'} className="flex gap-2 items-center">
                            Vị trí công tác
                        </Link>
                    </div>
                }


            </div>
        </div>
    );
}

export default NavBar;