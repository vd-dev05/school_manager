
import React, { useEffect, useState } from 'react';
import AlertDialogTeacher from "../components/ui/AddTeacher";
import TeacherServicesr from "../services/teacher";
import { Pagination } from 'antd';
import Icon from '../../public/icon/Icon.svg';

const Teacher = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [data, setData] = useState({ items: [], totalItems: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); 

    const handleOpen = () => setIsSelected(true);

    const fetchData = async (page = currentPage, limit = pageSize ) => {
        setIsLoading(!isLoading);
        try {
            const response = await TeacherServicesr.getTeachers(page, limit);
            if (response) {
                setData({
                    items: response.data ,
                    totalItems: response.total 
                });
                setIsLoading(!isLoading);
            } 
        } catch (error) {
            console.log(error);
            
            setData({ items: [], totalItems: 0 });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize])

    const handleReload = async ()  => {
        setIsLoading(!isLoading)
          await TeacherServicesr.getTeachers(page, limit);

    } 

    const onShowSizeChange =  async (current, pageSize) => {
        setCurrentPage(current)
        setPageSize(pageSize);
        await TeacherServicesr.getTeachers(current,pageSize)
    }

    const showTotal = (total) => `Tổng ${total} items`;
    
    return (
        <div className="pl-56">
            <p className="text-gray-400 text-xs pt-2">Giáo Viên</p>
            <div className="bg-white translate-y-1 p-2">
                <div>
                    <div className="flex justify-end gap-x-2 items-center">
                        <div className="text-xs border-[1px] outline-none flex p-[5px] gap-2 rounded-sm cursor-pointer">
                            <div><i className="fa-solid fa-magnifying-glass"></i></div>
                            <input placeholder="tìm kiếm thông tin" className="outline-none" />
                        </div>
                        <div className="w-20 border-black border-[1px] outline-none flex rounded-sm px-2 gap-2 cursor-pointer">
                            <span><i className="fa-solid fa-rotate-right"></i></span>
                            <button onClick={handleReload} className="text-xs">Tải lại</button>
                        </div>
                        <div onClick={handleOpen} className="w-20 border-black border-[1px] outline-none flex rounded-sm px-[2px] text-nowrap">
                            <span><Icon.addUser /></span>
                            <button className="text-xs">Tạo mới</button>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between px-8 bg-[#f3effd] py-2 my-2 text-xs font-semibold">
                            <div className="w-[10%]"><p>Mã</p></div>
                            <div className="w-[25%]"><p>Giáo Viên</p></div>
                            <div className="w-[25%]"><p>Trình độ cao nhất</p></div>
                            <div className="w-[10%]"><p>Bộ môn</p></div>
                            <div className="w-[15%]"><p>TT Công tác</p></div>
                            <div className="w-[10%]"><p>Địa chỉ</p></div>
                            <div className="w-[10%]"><p>Trạng thái</p></div>
                            <div className="w-[10%]"><p>Hành động</p></div>
                        </div>

                       { data ?  !isLoading   && data.items.map((item) => {
                                return (
                                    <div key={item.code} className="flex justify-between px-8 items-center py-2 text-xs hover:text-[#857ee9] hover:bg-[#b2aeb9] hover:shadow-md transform transition-all duration-200 ease-in-out">
                                        <div className="w-[10%]"><span>{item.code}</span></div>
                                        <div className="w-[25%] flex">
                                            <div><img src="/img/teacher.png" className="w-10" alt="Teacher" /></div>
                                            <div className="ml-2">
                                                <h2 className="font-bold text-[12px]">{item.userId?.name || 'No Name'}</h2>
                                                <p className="italic text-[11px]">{item.userId?.email || 'No Email'}</p>
                                                <span>{item.userId?.phoneNumber || 'No Phone'}</span>
                                            </div>
                                        </div>
                                        <div className="w-[25%]">
                                            <p>Bậc: <span>{item.degrees?.type || 'N/A'}</span></p>
                                            <p>Chuyên ngành: <span>{item.degrees?.major || 'N/A'}</span></p>
                                        </div>
                                        <div className="w-[10%]"><p>N/A</p></div>
                                        <div className="w-[15%]"><p>{item.positionsId?.positonName|| 'No Position'}</p></div>
                                        <div className="w-[10%]"><p>{item.userId?.address || 'No Address'}</p></div>
                                        <div className="w-[10%]">
                                            {item.isActive ? (
                                                <button className="bg-green-500 text-white p-[3px] text-[12px] rounded">Đang công tác</button>
                                            ) : (
                                                <button className="bg-red-500 text-white p-[3px] text-[12px] rounded">Bận công tác</button>
                                            )}
                                        </div>
                                        <div className="w-[10%]">
                                            <button className="text-black border-gray-500 border-[1px] px-3 py-1 rounded">
                                                <span className="mr-2"><i className="fa-regular fa-eye"></i></span>Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                );
                            }): null}
                    </div>

                    {/* Pagination Component */}
                    <div className="flex justify-center">
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            total={data?.totalItems || 0}
                            showTotal={showTotal}   
                            pageSizeOptions={[5, 10,20, 30]}
                            onChange={onShowSizeChange}
                            pageSize={pageSize}
                            
                        />
                    </div>
                </div>
            </div>

            {/* Add Teacher Dialog */}
            <AlertDialogTeacher isSelected={isSelected} setIsSelected={setIsSelected} />
        </div>
    );
};

export default Teacher;
