import nodemailer from 'nodemailer';

// Create transporter using SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });
};

// Send email function
export async function sendOtpEmail({ to, subject, text, html }) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_FROM_EMAIL || 'info.premierpenny@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
