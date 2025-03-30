import { Schema, model } from "mongoose";

const requestSchema = new Schema({
  type: {
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
  country: {
    type: String,
    required: true,
  },
  children: {
    type: [],
    required: true,
  },
  tutorGender: {
    type: String,
    required: true,
  },
  lessonType: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  busStop: {
    type: String,
  },
  address: {
    type: String,
  },
  lessonDays: {
    type: [String],
    required: true,
  },
  fromWhatTime: {
    type: String,
    required: true,
  },
  hoursPerDay: {
    type: String,
    required: true,
  },
  howLong: {
    type: String,
    required: true,
  },
  howSoon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cFirstName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  whatsappPhoneNo: {
    type: String,
    required: true,
  },
  cEmail: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  arrangement: {
    type: String,
    required: true,
  },
  tutorId: {
    type: String,
  },
  tutorsAppliedId: {
    type: [String],
    required: true,
  },
  paid: {
    type: String,
  },
});

const requestModel = model("Request", requestSchema);

export default requestModel;
