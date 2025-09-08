import { Schema, model } from "mongoose";

const applySchema = new Schema({
  course: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  lessonDays: {
    type: [String],
    required: true,
  },
  classHours: {
    type: String,
    required: true,
  },
});

const applyModel = model("Apply", applySchema);

export default applyModel;
