const adminApplyEmailTemplate = ({
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
}) => {
  const primaryColor = "#04D89D";

  return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: ${primaryColor}; padding: 20px; text-align: center; color: #fff;">
          <h2 style="margin: 0;">New Course Application</h2>
        </div>
        
        <!-- Body -->
        <div style="padding: 30px; color: #333;">
          <p style="font-size: 16px; line-height: 1.6;">
            Hello Admin, <br/><br/>
            A new student has applied for the <strong>${course}</strong>. Below are the applicant’s details:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tbody>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Name</td>
                <td style="padding: 8px; border: 1px solid #eee;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 8px; border: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Mobile Number</td>
                <td style="padding: 8px; border: 1px solid #eee;">${mobileNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Country</td>
                <td style="padding: 8px; border: 1px solid #eee;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">State</td>
                <td style="padding: 8px; border: 1px solid #eee;">${state}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">City</td>
                <td style="padding: 8px; border: 1px solid #eee;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Preferred Lesson Days</td>
                <td style="padding: 8px; border: 1px solid #eee;">${lessonDays?.join(
                  ", "
                )}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Preferred Class Hours</td>
                <td style="padding: 8px; border: 1px solid #eee;">${classHours}</td>
              </tr>
            </tbody>
          </table>

          <p style="margin-top: 25px; font-size: 15px; color: #555;">
            Please review this application and reach out to the student for further steps.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 13px; color: #777;">
          © ${new Date().getFullYear()} PedagogicHub. Admin Notification Email
        </div>
      </div>
    </div>
  `;
};

export default adminApplyEmailTemplate;
