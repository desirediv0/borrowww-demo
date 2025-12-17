import nodemailer from 'nodemailer';

// Create transporter using SMTP configuration
const createTransporter = () => {
  const port = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || '587');
  const isSecure = port === 465;

  const config = {
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: port,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
    // Reduced timeouts for faster failure in production
    connectionTimeout: 10000, // 10 seconds connection timeout
    greetingTimeout: 5000, // 5 seconds greeting timeout
    socketTimeout: 10000, // 10 seconds socket timeout
    // Retry configuration
    pool: false, // Don't use connection pooling for better reliability
  };

  // TLS configuration for non-secure ports (587)
  if (!isSecure) {
    config.tls = {
      rejectUnauthorized: false, // Allow self-signed certificates
      minVersion: 'TLSv1.2', // Use modern TLS version
    };
  }

  return nodemailer.createTransport(config);
};

// Send email function with retry logic (blocking)
export async function sendOtpEmail({ to, subject, text, html }, retries = 2) {
  let lastError;

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
      lastError = error;
      console.error(`Error sending email (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      console.error('Error code:', error.code);
      console.error('Error command:', error.command);

      // If it's the last attempt, throw the error
      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = 1000 * (attempt + 1); // 1s, 2s
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Send email asynchronously without blocking (fire and forget)
export function sendOtpEmailAsync({ to, subject, text, html }) {
  // Don't await - let it run in background
  sendOtpEmail({ to, subject, text, html }).catch((error) => {
    console.error('Background email sending failed:', error.message);
    // Log to file or database for retry later if needed
  });

  return { success: true, message: 'Email queued for sending' };
}

// Email template for admin notifications
export function getAdminEmailTemplate(formData) {
  const { name, email, phone, message, subject } = formData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #396A9F; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #396A9F; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission - Borrowww</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${name}
          </div>
          <div class="field">
            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
          </div>
          <div class="field">
            <span class="label">Phone:</span> ${phone || 'Not provided'}
          </div>
          <div class="field">
            <span class="label">Subject:</span> ${subject || 'General Inquiry'}
          </div>
          <div class="message-box">
            <strong>Message:</strong><br>
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email template for user thank you message
export function getUserThankYouTemplate({ name }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Contacting Borrowww</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us! We have successfully received your message and our team will review it shortly.</p>
          <p>We understand the importance of your inquiry and will get back to you as soon as possible, typically within 24-48 hours.</p>
          <p>If you have any urgent questions, please feel free to call us at:</p>
          <p><strong>Phone:</strong> +91 9560069525 or +91 8264111345<br>
          <strong>Email:</strong> codeshorts007@gmail.com</p>
          <p>Best regards,<br>
          <strong>Borrowww Team</strong></p>
        </div>
        <div class="footer">
          <p>221, 2nd Floor, JMD Megapolis, Sector 48, Sohan Road, Gurgaon 122002</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
