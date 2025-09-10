import applyModel from "../models/apply.js";
import adminApplyEmailTemplate from "../utils/adminApplyEmailTemplate.js";
import applyEmailTemplate from "../utils/applyEmailTemplate.js";
import sendMail from "../utils/sendMail.js";

export const createApplication = async (req, res) => {
  const {
    course,
    firstName,
    lastName,
    email,
    mobileNumber,
    country,
    state,
    city,
    lessonDays,
    classHours,
  } = req.body;

  try {
    const application = await applyModel.create({
      course,
      firstName,
      lastName,
      email,
      mobileNumber,
      country,
      state,
      city,
      lessonDays,
      classHours,
    });

    if (!application) {
      res.status(401).json("Something went wrong!");
    }

    const subject = `Application Received Successfully 🎉`;
    const html = applyEmailTemplate({ course, firstName });

    await sendMail({
      email,
      subject,
      html,
    });

    const adminSubject = `New Student Application`;
    const adminHtml = adminApplyEmailTemplate(req.body);
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
    await sendMail({
      email: ADMIN_EMAIL,
      subject: adminSubject,
      html: adminHtml,
    });

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await applyModel.find();

    if (applications) {
      res.status(200).json(applications);
    } else {
      res.status(401).json("Something went wrong!");
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
