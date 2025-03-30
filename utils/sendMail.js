import { config } from "dotenv";
import { Resend } from "resend";

config();

const API_KEY = process.env.RESEND_API_KEY;
console.log(process.env.NODE_ENV);

const resend = new Resend(API_KEY);

const sendMail = async (userData) => {
  const { email, subject, html } = userData;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject,
    html,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

export default sendMail;
