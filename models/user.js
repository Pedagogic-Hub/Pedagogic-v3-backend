import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      default: "applying",
    },
    personal: {
      type: Object,
      default: null,
    },
    location: {
      type: Object,
      default: null,
    },
    qualification: {
      type: Object,
      default: null,
    },
    identity: {
      type: Object,
      default: null,
    },
    experience: {
      type: String,
      default: null,
    },
    courses: {
      type: Object,
      default: null,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    account: {
      type: Object,
      default: null,
    },
    reference: {
      type: Object,
      default: null,
    },
    agreement: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export default userModel;
