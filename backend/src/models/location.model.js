import mongoose, { Schema } from "mongoose";


const locationSchema = new Schema({
  buildingName: { type: String },
  roomNumber: { type: String, required: true },
  geofenceCoordinates: { type: Schema.Types.Mixed, required: true }
})

export const Location = mongoose.model("Location", locationSchema)