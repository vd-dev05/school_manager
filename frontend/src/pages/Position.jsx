import { useEffect, useState } from "react";
import AlertDialog from "../components/ui/AddPosition";
import PositionService from "../services/position";
import React from "react";

const Position = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const [data, setData] = useState([])
    const [isLoading,setIsLoading] = useState(false);
    
    const fetchData = async () => {
        const response = await PositionService.getAll()
        if (response) {
            setData(response)
            setIsLoading(true)
        }
        setIsLoading(false)
      
    }
    // console.log(isLoading);
    
    useEffect(() => {
        fetchData()
    }, [1])
    
    const handleReload  = () => {
        fetchData()
    }

    return (
        <div className="pl-56">
            <p className="text-gray-400 text-xs pt-2"> <b className="text-yellow-400">Dữ liệu</b> / Vị trí công tác</p>
            <div className="bg-white  translate-y-1 p-2 ">
                <div>
                    <div className="flex justify-end gap-x-2 items-center">
                        <div
                            onClick={handleOpen}
                            className="w-20 border-black border-[1px] outline-none flex rounded-sm px-2 gap-2 cursor-pointer ">
                            <span><i className="fa-solid fa-plus"></i></span>
                            <button
                          
                            className="text-xs">Tạo </button>
                        </div >
                        <div
                          onClick={() => handleReload()} 
                        className="w-20 border-black border-[1px] outline-none flex rounded-sm gap-2  px-[2px] text-nowrap">

                            <span ><i className="fa-solid fa-rotate-right"></i></span>
                            <button className="text-xs">Làm mới</button>
                        </div>
                    </div>

                    <div >
                        <div className="flex px-8 bg-[#f3effd] py-2 my-2 text-xs font-semibold">
                            <div className="w-[10%]">
                                <p>STT</p>
                            </div>
                            <div className="w-[10%]">
                                <p>Mã</p>
                            </div>
                            <div className="w-[25%]">
                                <p>Tên</p>
                            </div>
                            <div className="w-[20%]">
                                <p>Trạng thái</p>
                            </div>
                            <div className="w-[15%]">
                                <p>Mô Tả</p>
                            </div>
                        </div>
                        { !isLoading && data.length > 0 ? data.map((item,index) => (
                            <div key={item._id} className="flex px-8 items-center py-2 text-xs hover:text-[#857ee9] hover:bg-[#b2aeb9] hover:shadow-md transform transition-all duration-200 ease-in-out" >
                                <div className="w-[10%]">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="w-[10%] flex">
                                    {item.code}
                                </div>
                                <div className="w-[25%]">
                                    <div>
                                        <p>Tên: <span>{item.positonName}</span></p>
                                    </div>
                                </div>
                                <div className="w-[20%]">
                                    {item.isActive === true
                                        ? <button className="rounded-sm bg-green-400 px-2 text-white">Hoạt động </button>
                                        : <button className="rounded-sm bg-red-500 px-2 text-white">Không hoạt dộng</button>
                                    }
                                </div>
                                <div className="w-[30%]">
                                    <p>{item.des}</p>
                                </div>
                                <div className="border-[1px] w-5 h-5 flex items-center justify-center rounded-sm border-gray-300 cursor-pointer">
                                    <i className="fa-solid fa-gear left-0"></i>
                                </div>
                            </div>
                        )) : null}



                    </div>

                </div>

            </div>
            <AlertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}

export default Position;