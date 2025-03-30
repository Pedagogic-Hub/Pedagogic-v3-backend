import tutorApprovedEmailTemplate from "../email/tutorApproved.js";
import requestModel from "../models/request.js";
import sendMail from "../utils/sendMail.js";

export const createRequest = async (req, res) => {
  const body = req.body;

  try {
    const request = await requestModel.create({ ...body });
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(401).json("Something went wrong!");
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const getRequest = async (req, res) => {
  const { id, country } = req.query;

  try {
    if (id) {
      const data = await requestModel.findById(id);

      res.status(200).json(data);

      //
    } else if (country) {
      const data = await requestModel.find({
        country,
        $or: [{ tutorId: { $exists: false } }, { tutorId: "" }],
      });

      res.status(200).json(data);

      //
    } else {
      const data = await requestModel.find();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const getRequestAdmin = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const data = await requestModel.findById(id);

      res.status(200).json(data);
    } else {
      const data = await requestModel.find();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const applyForRequest = async (req, res) => {
  const { tutorId, requestId } = req.body;

  try {
    let request = await requestModel.findById(requestId);

    if (request.tutorsAppliedId.includes(tutorId)) {
      const tutorsAppliedId = request.tutorsAppliedId.filter(
        (id) => id !== tutorId
      );

      request = await requestModel.findByIdAndUpdate(
        requestId,
        { tutorsAppliedId },
        { new: true }
      );
    } else {
      request.tutorsAppliedId.push(tutorId);

      request = await request.save();
    }

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const approveRequestAdmin = async (req, res) => {
  const { tutorId, requestId } = req.body;

  try {
    const request = await requestModel.findByIdAndUpdate(
      requestId,
      { tutorId },
      { new: true }
    );

    // send an email to the tutor and the request
    const html = tutorApprovedEmailTemplate({
      firstName: request.firstName,
      requestId: request.id,
    });

    const data = {
      email: request.email,
      subject: `Thanks ${request.firstName}, we've received your request`,
      html,
    };

    await sendMail(data);

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { paid } = req.body;

  try {
    const request = await requestModel.findByIdAndUpdate(
      id,
      { paid },
      { new: true }
    );

    // send an email to the tutor and the request

    res.status(201).json("Payment updated successfully");
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
