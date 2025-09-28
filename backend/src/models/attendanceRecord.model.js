import mongoose, { Schema } from "mongoose";

const attendanceRecordSchema = new Schema({
  session_id: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  check_in_time: { type: Date, required: true },
  status: { type: String, enum: [ 'present', 'absent' ], required: true },
  device_id: { type: String, required: true },
  gps_coordinates: { type: String }
})

export const AttendanceRecord = mongoose.model( "AttendanceRecord", attendanceRecordSchema )