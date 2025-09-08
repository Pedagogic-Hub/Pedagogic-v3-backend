const applyEmailTemplate = ({ firstName, course }) => {
  const imageUrl =
    "https://res.cloudinary.com/dgdf3kemb/image/upload/v1720385772/logo_j6gwen.jpg";
  // const adminEmail = "admin@logos360.co.uk";
  const adminEmail = "admin@pedagogichub.com";
  const primaryColor = "#04D89D";

  return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: ${primaryColor}; padding: 20px; text-align: center;">
          <img src="${imageUrl}" alt="Company Logo" style="height: 60px; object-fit: contain;" />
        </div>
        
        <!-- Body -->
        <div style="padding: 30px; color: #333;">
          <h2 style="color: ${primaryColor}; margin-top: 0;">Hi ${firstName},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            🎉 Congratulations! You’ve successfully applied for:
            <strong>${course}</strong>.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            One of our admins will reach out to you shortly with the next steps and further procedures.
          </p>

          <div style="margin: 25px 0; padding: 15px; background: #f0fdf9; border-left: 4px solid ${primaryColor}; border-radius: 6px;">
            <p style="margin: 0; font-size: 15px; line-height: 1.6;">
              If you have any questions, feel free to reach out to us at
              <a href="mailto:${adminEmail}" style="color: ${primaryColor}; text-decoration: none; font-weight: bold;">
                ${adminEmail}
              </a>.
            </p>
          </div>

          <p style="font-size: 15px; color: #555;">We’re excited to have you with us on this journey 🚀</p>
          <p style="font-size: 15px; color: #555; margin-bottom: 0;">– The PedagogicHub Team</p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 13px; color: #777;">
          © ${new Date().getFullYear()} PedagogicHub. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

export default applyEmailTemplate;
