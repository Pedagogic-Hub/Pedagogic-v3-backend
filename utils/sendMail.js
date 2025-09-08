import { config } from "dotenv";
import { Resend } from "resend";

config();

const API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(API_KEY);

const COMPANY_EMAIL =
  process.env.COMPANY_EMAIL || "Acme <onboarding@resend.dev>";

const sendMail = async (userData) => {
  const { email, subject, html } = userData;

  const { data, error } = await resend.emails.send({
    from: COMPANY_EMAIL,
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
