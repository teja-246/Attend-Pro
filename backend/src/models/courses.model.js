import mongoose, { Schema } from "mongoose";


const coursesSchema = new Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  faculty_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  semester: {type: String, required: true }
})

export const Course = mongoose.model("Course", coursesSchema)