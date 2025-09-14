import React, { useState } from 'react';
import { Checkbox, Select, Upload, Input, Table, Button, Form, DatePicker, Space, TreeSelect } from 'antd';
import Teacher from '../../services/teacher';
import  {toast, ToastContainer} from'react-toastify'
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

const AlertDialogTeacher = ({ isSelected, setIsSelected }) => {
    
const treeData = [
    { title: 'CBYT - Cán bộ y tế', value: JSON.stringify({id : 'CBYT' , name : 'Cán bộ y tế'}) , key: '0' } ,
    { title: 'GVBM - Giáo viên bộ môn', value: JSON.stringify({id : 'GVBM' , name : ' Giáo viên bộ môn'}), key: '1' },
    { title: 'TBM - Trưởng bộ môn',value: JSON.stringify({id : 'TBM' , name : 'Trưởng bộ môn'}), key: '2' },
    { title: 'HT - Hiệu trưởng', value: JSON.stringify({id : 'HT' , name : 'Hiệu trưởng'}), key: '3' },
    { title: 'HP - Hiệu phó', value: JSON.stringify({id : 'HP' , name : 'Hiệu phó'}), key: '4' },
    { title: 'TTS - Thực tập sinh',value: JSON.stringify({id : 'TTS' , name : 'Thực tập sinh'}), key: '5' },
];

const initialData = [
    // { key: '1', name: '', schools: '', address: '', tags: false, graduation: '' },
];

    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();

    const handleClose = () => {
        setIsSelected(false);
    };

    const handleFieldChange = (index, field, value) => {       
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };

    const addNewRow = () => {
        const newRow = {
            key: Date.now().toString(),
            name: '',
            schools: '',
            address: '',
            // tags:'',
            graduation: '',
            position: '',
        };
        setData([...data, newRow]);
    };

    const removeRow = (key) => {
        const updatedData = data.filter((item) => item.key !== key);
        setData(updatedData);
    };

    const onFinish = async (values) => {
        const response = await Teacher.createTeacher(values);
        
        if (response.error && response) {
           toast.error(response.error,{
            style :{textWrap :'nowrap'}
           })
        }
        toast.success(response)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const tProps = {
        treeData,
        value: [],
        onChange: (newValue) => console.log(newValue),
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: { width: '100%', fontSize: '12px' },
    };

    const columns = [
        {
            title: 'Bậc',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => (
                <Form.Item
                    name={['data', index, 'name']}
                    rules={[{ required: true, message: 'Vui lòng chọn học vị!' }]}
                    initialValue={text}
                    style={{ marginBottom: 0 }}
                >
                    <Select
                        style={{ width: 120 }}
                        placeholder="Chọn học vị"
                        value={record.name}
                        onChange={(value) => handleFieldChange(index, 'name', value)}
                    >
                        <Option value="Trung học">Trung học</Option>
                        <Option value="Cao đẳng">Cao đẳng</Option>
                        <Option value="Cử nhân">Cử nhân</Option>
                        <Option value="Kỹ sư">Kỹ sư</Option>
                        <Option value="Thạc sĩ">Thạc sĩ</Option>
                        <Option value="Tiến sĩ">Tiến sĩ</Option>
                        <Option value="Hậu tiến sĩ">Hậu tiến sĩ</Option>
                        <Option value="Giáo sư">Giáo sư</Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: 'Trường',
            dataIndex: 'schools',
            key: 'schools',
            render: (text, record, index) => (
                <Form.Item
                    name={['data', index, 'schools']}
                    rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
                    initialValue={text}
                    style={{ marginBottom: 0 }}
                >
                    <Input
                        value={record.schools}
                        placeholder="Nhập tên trường học"
                        onChange={(e) => handleFieldChange(index, 'schools', e.target.value)}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Chuyên Ngành',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => (
                <Form.Item
                    name={['data', index, 'address']}
                    rules={[{ required: true, message: 'Vui lòng nhập chuyên ngành!' }]}
                    initialValue={text}
                    style={{ marginBottom: 0 }}
                >
                    <Input
                        value={record.address}
                        placeholder="Nhập chuyên ngành"
                        onChange={(e) => handleFieldChange(index, 'address', e.target.value)}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, record, index) => (
                <Checkbox
                    value={record.tags}
                    checked={record.tags}
                    onChange={() => handleFieldChange(index, 'tags', ! record.tags)}
                >
                    {record.tags ? 'Hoàn Thành' : 'Chưa hoàn thành'}
                </Checkbox>
            ),
        },
        {
            title: 'Tốt nghiệp',
            dataIndex: 'graduation',
            key: 'graduation',
            render: (text, record, index) => (
                <Form.Item
                    name={['data', index, 'graduation']}
                    rules={[{ required: true, message: 'Vui lòng nhập năm tốt nghiệp!' }]}
                    initialValue={text}
                    style={{ marginBottom: 0 }}
                >
                    <Input
                        value={record.graduation}
                        placeholder="Năm tốt nghiệp"
                        onChange={(e) => handleFieldChange(index, 'graduation', e.target.value)}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record, index) => (
                <Button type="danger" onClick={() => removeRow(record.key)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {isSelected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white fixed top-0 right-0 rounded-s-md shadow-xl w-[55%] p-6 h-full text-xs">
                        <div className="flex justify-start gap-x-2 items-center">
                            <div className="mt-4 flex items-center">
                                <button onClick={handleClose} className="text-black py-2 px-4 rounded-md transition-all duration-300">
                                    <span>
                                        <i className="fa-solid fa-xmark"></i>
                                    </span>
                                </button>
                                <p>Tạo thông tin giáo viên</p>
                            </div>
                        </div>
                        <hr className="text-blue-600" />
                        <Form
                            form={form}
                            name="teacher-form"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{ data }}
                        >
                            <div className="py-5 flex">
                                <div className="w-[30%]">
                                    <img
                                        src="https://raw.githubusercontent.com/khoatranpc/school-system-client/refs/heads/main/public/teachermale.avif"
                                        className="object-cover h-40"
                                        alt="user"
                                    />
                                </div>
                                <div>
                                    <Upload listType="picture-card">
                                        <div className="text-center">
                                            <i className="fa-solid fa-upload"></i>
                                            <p className="text-xs text-gray-500">Upload File</p>
                                            <p className="text-xs text-gray-500">Chọn ảnh</p>
                                        </div>
                                    </Upload>
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-col items-start">
                                        <h2 className="bg-white text-black px-2 ml-10">Thông tin cá nhân</h2>
                                        <hr className="w-full -translate-y-2 -z-10" />
                                    </div>
                                    <div className="flex gap-2 p-2">
                                        <div className="flex flex-col gap-5">
                                            <div>
                                                <label htmlFor="name">* Họ và tên</label>
                                                <Form.Item
                                                    name="name"
                                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                                >
                                                    <Input id="name" placeholder="Nhập họ và tên" />
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <label htmlFor="number">* Số điện thoại</label>
                                                <Form.Item
                                                    name="number"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                                >
                                                    <Input id="number" placeholder="Nhập số điện thoại" />
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <label htmlFor="code">* Số CCCD</label>
                                                <Form.Item
                                                    name="code"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}
                                                >
                                                    <Input id="code" placeholder="Nhập số CCCD" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            <div>
                                                <label htmlFor="date">* Ngày Sinh</label>
                                                <Form.Item
                                                    name="date"
                                                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                                >
                                                    <DatePicker className="w-full" />
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <label htmlFor="email">* Số Email</label>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        { required: true, message: 'Vui lòng nhập email!' },
                                                        { type: 'email', message: 'Email không hợp lệ!' },
                                                    ]}
                                                >
                                                    <Input id="email" placeholder="example@school.edu.vn" />
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <label htmlFor="address">* Địa chỉ</label>
                                                <Form.Item
                                                    name="address"
                                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                                >
                                                    <Input id="address" placeholder="Địa chỉ thường trú" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-2 py-5">
                                <hr className="h-[2px] bg-purple-500" />
                                <h2 className="-translate-y-2 translate-x-5 bg-white w-fit px-2">Thông tin công tác</h2>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="position">* Vị trí công tác</label>
                                    <Form.Item
                                        name="position"
                                        rules={[{ required: true, message: 'Vui lòng chọn vị trí công tác!' }]}
                                    >
                                        <TreeSelect {...tProps} />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="my-2 py-5">
                                <hr className="h-[2px] bg-purple-500" />
                                <h2 className="-translate-y-2 translate-x-5 bg-white w-fit px-2">Học vị</h2>

                                <div className='flex flex-col items-end'>
                                    <Button

                                        onClick={addNewRow}
                                        className="w-10 mt-4"
                                    >
                                        Thêm
                                    </Button>
                                    <div className="w-[100%]">
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                            pagination={false}
                                            rowKey="key"
                                        />
                                    </div>
                                    <Button
                                htmlType="submit"
                                className="w-20 mt-4"
                            >
                                <span><i className="fa-regular fa-floppy-disk"></i></span>
                                Lưu
                            </Button>
                                </div>


                            </div>

                          
                        </Form>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default AlertDialogTeacher;
