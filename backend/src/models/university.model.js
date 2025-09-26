import mongoose, {model, Schema} from 'mongoose';

const universitySchema = new Schema({
    universityName : {type: String, required: true, unique: true},
    contactEmail : {type: String, required: true, unique: true}
})

export const University = mongoose.model("University", universitySchema)