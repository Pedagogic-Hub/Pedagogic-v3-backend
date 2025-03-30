import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import uploadImage from "../utils/uploadImage.js";

export const getAuthenticatedUser = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

export const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json("All parameters are required!");
    }

    const existingEmail = await userModel.findOne({ email }).exec();

    if (existingEmail) {
      return res.status(400).json("Acccount already exists, login instead");
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json("Password must be at least 8 characters long");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // Have to go throuth all these stress in other
    // to remove the password without setting it to null 😤

    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...rest } = data._doc;
    const user = rest;

    // create a session for the user
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("All parameters are required");
    }

    const userCheck = await userModel.findOne({ email }).select("+password");

    if (!userCheck) {
      return res.status(401).json("Incorrect credentials");
    }

    const passwordMatch = await bcrypt.compare(password, userCheck.password);

    if (!passwordMatch) {
      return res.status(401).json("Incorrect credentials");
    }

    // fetch another user without the password
    const user = await userModel.findOne({ email }).exec();

    // create a session for the user
    req.session.userId = user._id;

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.session.userId;
  const body = req.body;
  const profilePhoto = body?.personal?.profilePhoto;
  const certificate = body?.qualification?.education?.certificate;
  const document = body?.identity?.document;
  const referenceDocument = body?.reference?.document;
  const agreementDocument = body?.agreement;

  try {
    const userData = await userModel.findById(userId);

    // check if there is a certificate photo and upload it
    if (
      certificate &&
      certificate !== userData?.qualification?.education?.certificate
    ) {
      const imgUrl = await uploadImage(userId + "-certificate", certificate);

      req.body.qualification.education.certificate = imgUrl;
    }

    // check if there is a profile photo and upload it
    if (profilePhoto && profilePhoto !== userData?.personal?.profilePhoto) {
      const imgUrl = await uploadImage(userId + "-profile-photo", profilePhoto);

      req.body.personal.profilePhoto = imgUrl;
    }

    // check if there is a identity document and upload it
    if (document && document !== userData?.identity?.document) {
      const imgUrl = await uploadImage(userId + "-identity-document", document);

      req.body.identity.document = imgUrl;
    }

    // check if there is a reference document and upload it
    if (
      referenceDocument &&
      referenceDocument !== userData?.reference?.document
    ) {
      const imgUrl = await uploadImage(
        userId + "-reference-document",
        referenceDocument
      );

      req.body.reference.document = imgUrl;
    }

    // check if there is an agreement document and upload it
    if (agreementDocument && agreementDocument !== userData?.agreement) {
      const imgUrl = await uploadImage(
        userId + "-agreement-document",
        agreementDocument
      );

      req.body.agreement = imgUrl;
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { ...userData._doc, ...body },
      {
        new: true,
      }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

export const updateProfileAdmin = async (req, res) => {
  const userId = req.params.id;
  const body = req.body;

  try {
    const userData = await userModel.findById(userId);

    const user = await userModel.findByIdAndUpdate(
      userId,
      { ...userData._doc, ...body },
      {
        new: true,
      }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).json(error);
    } else {
      res.sendStatus(200);
    }
  });
};

export const getAllUsers = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const user = await userModel.findById(id);

      res.status(200).json(user);
    } else {
      const users = await userModel.find();

      res.status(200).json(users);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};
