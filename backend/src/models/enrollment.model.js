import mongoose, { Schema } from "mongoose";


const enrollmentSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', requied: true},
  enrollmentDate: {type: Date, default: Date.now, required: true}
})

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema) 