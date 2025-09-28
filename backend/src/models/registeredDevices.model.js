import mongoose, { Schema } from "mongoose";


const registeredDevicesSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  device_id: { type: String, unique: true, required: true },
  device_name: { type: String },
  registeredAt: { type: Date, default: Date.now }
})

export const RegisteredDevice = mongoose.model( "RegisteredDevice", registeredDevicesSchema)