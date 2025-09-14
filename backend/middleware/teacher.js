import { generateTeacherId } from "../config/teacherIdGenerator.js";
import { UserModel } from "../models/user.js";
const TeacherMiddleware = {
    create : async (req,res,next) => {
        try {
            if (!req.body) {
                throw new Error('Request body is required')
            }
            const {email , number} = req.body
            const user = await UserModel.findOne({email : email})
            const phoneNumber = await UserModel.findOne({phoneNumber : number})

            if (phoneNumber) {
                throw new Error('This phone number has already been!')
            }
       
            if (user)  throw new Error('This teacher has already been !')
                req.userId = generateTeacherId()
                console.log(req.userId);
                return next()
            
        } catch (error) {
            res.status(401).json({error : error.message});
        }
    },
    // getAll : async
}
export default TeacherMiddleware