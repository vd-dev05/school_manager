import { useState } from "react";
import PositionService from "../../services/position";
// import { ToastContainer ,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import React from "react";
const AlertDialog = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    ma: "",
    ten: "",
    moTa: "",
    trangThai: true, // true: Hoạt động, false: Ngừng
  });

  const [isSelected, setIsSelected] = useState(true); // default to 'Hoạt động'
  const [errors, setErrors] = useState({
    ma: false,
    ten: false,
    moTa: false,
  });

  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      ma: "",
      ten: "",
      moTa: "",
      trangThai: true,
    });
    setErrors({
      ma: false,
      ten: false,
      moTa: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let validationErrors = { ...errors };

    validationErrors.ma = !formData.ma;
    validationErrors.ten = !formData.ten;
    validationErrors.moTa = !formData.moTa;

    setErrors(validationErrors);
    
    if (!validationErrors.ma && !validationErrors.ten && !validationErrors.moTa) {

      const response = await PositionService.create(formData)
      if (response.error) {
        toast.error(response.error,{
          style : {textWrap : "nowrap"}
        })
      }
        
      if (response) {
        toast.success(response ,{
        style : {textWrap : "nowrap"}
        })
        handleClose();
      }
      
     
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white fixed top-0 right-0 rounded-s-md shadow-xl w-full max-w-sm p-6 h-full text-xs">
            <div className="mt-4 flex gap-2 items-center">
              <button
                onClick={handleClose}
                className="text-black py-2 px-4 rounded-md transition-all duration-300"
              >
                <span><i className="fa-solid fa-xmark"></i></span>
              </button>
              <p>Vị trí công tác</p>
            </div>
            <hr />
            <div className="mt-10 flex flex-col gap-2 ">
              <div>* Mã</div>
              <input
                type="text"
                name="ma"
                value={formData.ma}
                onChange={handleChange}
                className="w-full outline-none border-[1px] p-2"
              />
              {errors.ma && <p className="text-red-500 text-xs">Mã is required</p>}

              <div>* Tên</div>
              <input
                type="text"
                name="ten"
                value={formData.ten}
                onChange={handleChange}
                className="w-full outline-none border-[1px] p-2"
              />
              {errors.ten && <p className="text-red-500 text-xs">Tên is required</p>}

              <div>* Mô tả</div>
              <textarea
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
                className="w-full outline-none border-[1px] p-2"
              />
              {errors.moTa && <p className="text-red-500 text-xs">Mô tả is required</p>}

              <div>* Trạng thái</div>
              <div className="flex gap-2 m-2">
                <button
                  className={`${isSelected ? 'bg-blue-600 text-white' : ''} text-black p-2 rounded-sm`}
                  onClick={() => {
                    setIsSelected(true);
                    setFormData((prevData) => ({ ...prevData, trangThai: true }));
                  }}
                >
                  Hoạt động
                </button>
                <button
                  className={`${!isSelected ? 'bg-blue-600 text-white' : ''} text-black p-2 rounded-sm`}
                  onClick={() => {
                    setIsSelected(false);
                    setFormData((prevData) => ({ ...prevData, trangThai: false }));
                  }}
                >
                  Ngừng
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="ml-4 text-black py-2 px-4 rounded-md transition-all duration-300 "
              >
                <span><i className="fa-solid fa-save"></i></span> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer/> */}
    </div>
  );
};

export default AlertDialog;
