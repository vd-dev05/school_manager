import mongoose from "mongoose";
import { TeacherModel } from "../../models/teachers.js";
import { UserModel } from "../../models/user.js";
import { PositonsModel } from "../../models/positions.js";
// import randomstring from "randomstring"
// create teacher controller
const TeacherController = {
    create: async (req, res) => {
        // console.log(req.body);

        try {
            const { name, number, code, date, email, address, position, data } = req.body;
            console.log(req.body);

            const positionsArray = position.map(item => {
                const parsedItem = JSON.parse(item);
                return {
                    id: parsedItem.id,
                    name: parsedItem.name
                };
            });
            const dataUser = {
                _id: new mongoose.Types.ObjectId(),
                name: name,
                email: email,
                phoneNumber: number,
                identity: code,
                address: address,
                dob: date,
                role: "TEACHER"
            }
            await UserModel.create(dataUser);
            if (dataUser) {
                for await (const element of positionsArray) {
                    const dataPosition = {
                        _id: new mongoose.Types.ObjectId(),
                        name: element.name,
                        code: element.id,
                        des: 'Không có mô tả'
                    }
                    await PositonsModel.create(dataPosition);
                    if (dataPosition) {
                        for await (const tech of data) {
                            const dataTeacher = {
                                userId: dataUser._id,
                                code: req.userId,
                                degrees: {
                                    type: tech.name,
                                    school: tech.schools,
                                    major: tech.address,
                                    year: parseInt(tech.graduation),
                                    isGraduated: true
                                },
                                positionsId: dataPosition._id
                            }
                            await TeacherModel.create(dataTeacher)
                            req.userId = ''
                        }
                    }
                }
            }
            
            res.status(200).json("Lưu GV thành công")
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    getAllTeachers: async (req, res) => {
        try {
            const {page  , limit } = req.query
            console.log(req.query);
            
            const pageNumber = parseInt(page) || 1;  
            const pageSize = parseInt(limit) || 10; 
            
            
            const totalItems = await TeacherModel.countDocuments();
             
            const skip = (pageNumber - 1) * pageSize;
            
            const teacher = await TeacherModel.find()
            .skip(skip)
            .limit(pageSize)
                .populate('positionsId', 'positonName')
                .populate('userId', 'name email address phoneNumber')
            .sort({startDate : -1})
            
            res.status(200).send({
                message: "done",
                data: teacher,
                total: totalItems,

            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default TeacherController