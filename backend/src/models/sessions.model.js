//This table represents a specific, scheduled class meeting for which attendance will be taken.

import mongoose, { Schema } from "mongoose";

const sessionsSchema = new Schema({
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true},
  locaiton_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true},
  session_datetime: { type: Date, required: true},
  active_token: { type: String },
  token_expiry: { type: Date }
})

export const Sessions = mongoose.model( "Sessions", sessionsSchema )