import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const nationality = formData.get('nationality') as string;
    const gender = formData.get('gender') as string;
    const previousEducation = formData.get('previousEducation') as string;
    const gpa = formData.get('gpa') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const programChoice = formData.get('programChoice') as string;
    const campusChoice = formData.get('campusChoice') as string;
    const personalStatement = formData.get('personalStatement') as string;
    const transcript = formData.get('transcript') as File | null;
    const recommendation = formData.get('recommendation') as File | null;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare attachments
    const attachments = [];
    if (transcript && transcript instanceof File) {
      const buffer = Buffer.from(await transcript.arrayBuffer());
      attachments.push({
        filename: transcript.name,
        content: buffer,
        contentType: transcript.type,
      });
    }
    if (recommendation && recommendation instanceof File) {
      const buffer = Buffer.from(await recommendation.arrayBuffer());
      attachments.push({
        filename: recommendation.name,
        content: buffer,
        contentType: recommendation.type,
      });
    }

    // HTML email template
    const html = `
    <div style="background:#e83e6b;padding:0;margin:0;font-family:Segoe UI,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#e83e6b;padding:0;margin:0;">
        <tr>
          <td align="center" style="padding:40px 0 20px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.07);overflow:hidden;">
              <tr>
                <td style="background:#e83e6b;padding:32px 0;text-align:center;">
                  <img src="https://tuu.university/tuu-logo/tuu-logo.png" alt="The Unity University Logo" width="100" height="100" style="border-radius:50%;border:4px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:12px;background:#fff;" />
                  <h1 style="color:#fff;font-size:2.2rem;margin:0;font-family:Georgia,serif;letter-spacing:1px;text-transform:uppercase;">The Unity University</h1>
                  <div style="color:#fff;font-size:1.1rem;margin-top:4px;letter-spacing:0.5px;">Admissions Application Notification</div>
                  <div style="margin-top:18px;display:inline-block;padding:6px 18px;background:#009e60;color:#fff;border-radius:20px;font-weight:bold;font-size:1rem;letter-spacing:1px;">Application Received</div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 32px 16px 32px;background:#fff;">
                  <h2 style="color:#e83e6b;font-size:1.4rem;margin:0 0 16px 0;font-family:Georgia,serif;text-transform:capitalize;">New Application Details</h2>
                  <hr style="border:none;border-top:2px solid #e83e6b;margin:18px 0 24px 0;" />
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;font-size:1.05rem;">
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;width:180px;text-transform:capitalize;">Full Name</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Email</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${email}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Phone</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Date of Birth</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${dateOfBirth}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Nationality</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${nationality.charAt(0).toUpperCase() + nationality.slice(1)}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Gender</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Previous Education</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${previousEducation}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">GPA / Grade Average</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${gpa}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Graduation Year</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${graduationYear}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Program of Interest</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${programChoice.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                      <td style="padding:10px 0 10px 12px;color:#e83e6b;font-weight:600;text-transform:capitalize;">Preferred Campus</td>
                      <td style="padding:10px 0 10px 12px;color:#222;font-weight:500;">${campusChoice.charAt(0).toUpperCase() + campusChoice.slice(1)}</td>
                    </tr>
                  </table>
                  <div style="margin-bottom:24px;">
                    <div style="color:#00695c;font-weight:bold;margin-bottom:8px;font-size:1.1rem;display:flex;align-items:center;"><span style='display:inline-block;width:18px;height:18px;background:#e83e6b;color:#fff;border-radius:50%;text-align:center;line-height:18px;font-size:1rem;margin-right:8px;'>&#9997;</span> Personal Statement</div>
                    <div style="background:#f9f9f9;padding:18px 22px;border-left:5px solid #e83e6b;color:#333;font-size:1.08rem;border-radius:4px;white-space:pre-line;box-shadow:0 1px 4px rgba(0,0,0,0.03);">${personalStatement}</div>
                  </div>
                  <hr style="border:none;border-top:1.5px solid #eee;margin:32px 0 18px 0;" />
                  <div style="color:#888;font-size:0.97rem;margin-top:12px;line-height:1.6;">
                    <span style="display:inline-block;background:#009e60;color:#fff;padding:2px 10px;border-radius:12px;font-size:0.95rem;margin-bottom:4px;">Confidential</span><br/>
                    This message was generated automatically by The Unity University admissions portal.<br/>
                    If you have any questions, please contact <a href="mailto:admissions@tuu.university" style="color:#e83e6b;text-decoration:underline;">admissions@tuu.university</a>.<br/>
                    <span style="color:#222;font-size:0.93rem;">&copy; ${new Date().getFullYear()} The Unity University. All rights reserved.</span>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    `;

    // Send to admissions
    await transporter.sendMail({
      from: `The Unity University <${process.env.SMTP_USER}>`,
      to: 'rickynavidon10@gmail.com',
      subject: `New Application from ${firstName} ${lastName}`,
      html,
      attachments,
    });

    // Send copy to applicant
    await transporter.sendMail({
      from: `The Unity University <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Application to The Unity University',
      html: `
        <h2>Thank you for your application!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your application. Here is a copy for your records:</p>
        ${html}
        <p style="margin-top:2em;">Best regards,<br/>Admissions Team<br/>The Unity University</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send application. Please try again later.' }, { status: 500 });
  }
} 