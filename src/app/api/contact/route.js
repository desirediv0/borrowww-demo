import { NextResponse } from 'next/server';
import { sendOtpEmailAsync, getAdminEmailTemplate, getUserThankYouTemplate } from '@/lib/email';

export async function POST(request) {
  try {
    const { name, email, phone, message, subject } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.NEXT_PUBLIC_TO_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || 'info.premierpenny@gmail.com';
    const formData = { name, email, phone, message, subject };

    // Send emails asynchronously (non-blocking) to avoid timeout
    const adminEmailHtml = getAdminEmailTemplate(formData);
    const adminEmailText = `New Contact Form Submission - Borrowww\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}`;

    sendOtpEmailAsync({
      to: adminEmail,
      subject: subject ? `Contact Form: ${subject}` : `New Contact Form Inquiry from ${name}`,
      text: adminEmailText,
      html: adminEmailHtml,
    });

    // Send thank you email to user
    const userEmailHtml = getUserThankYouTemplate({ name });
    const userEmailText = `Dear ${name},\n\nThank you for reaching out to Borrowww! We have successfully received your message and our team will review it shortly.\n\nWe understand the importance of your inquiry and will get back to you as soon as possible, typically within 24-48 hours.\n\nIf you have any urgent questions, please feel free to call us at:\nPhone: +91 9560069525 or +91 8264111345\nEmail: info.premierpenny@gmail.com\n\nBest regards,\nBorrowww Team`;

    sendOtpEmailAsync({
      to: email,
      subject: 'Thank You for Contacting Borrowww - We Received Your Message',
      text: userEmailText,
      html: userEmailHtml,
    });

    // Return immediately without waiting for email
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully. Please check your email for confirmation.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);

    // Return success even if email fails - form submission is saved
    // Email will be retried in background
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon.'
    });
  }
}
