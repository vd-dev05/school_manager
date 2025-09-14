import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
   },
   isActive: {
    type: Boolean,
    default: true
   },
   isDeleted: {
    type: Boolean,
    default: false
   },
   code: {
    type: String,
    required: true
   },
   startDate: {
    type: Date,
    required: true,
    default: Date.now
   },
   endDate: {
    type: Date,
   //  required: true
   },
   positionsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'positions'
   },
   degrees: [{
    type: mongoose.Schema.Types.Mixed,
    required: true
   }]
});

export const TeacherModel = mongoose.model('teachers', teacherSchema);
