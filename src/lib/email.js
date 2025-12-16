import nodemailer from 'nodemailer';

// Create transporter using SMTP configuration
const createTransporter = () => {
  const port = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || '587');
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: port,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
      ciphers: 'SSLv3', // Use SSLv3 for compatibility
    },
    // Increased timeouts for production
    connectionTimeout: 30000, // 30 seconds connection timeout
    greetingTimeout: 30000, // 30 seconds greeting timeout
    socketTimeout: 30000, // 30 seconds socket timeout
    // Retry configuration
    pool: false, // Don't use connection pooling for better reliability
    // Debug mode (set to true for troubleshooting)
    debug: false,
    logger: false,
  });
};

// Send email function with retry logic
export async function sendOtpEmail({ to, subject, text, html }, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const transporter = createTransporter();

      const mailOptions = {
        from: process.env.NEXT_PUBLIC_FROM_EMAIL || 'codeshorts007@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`Error sending email (attempt ${attempt + 1}/${retries + 1}):`, error.message);

      // If it's the last attempt, throw the error
      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}
