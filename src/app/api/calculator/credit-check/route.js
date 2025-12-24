import { NextResponse } from 'next/server';
import { sendOtpEmailAsync, getCreditCheckEmailTemplate } from '@/lib/email';

export async function POST(request) {
  try {
    const { firstName, mobileNumber, consent } = await request.json();

    if (!firstName || !mobileNumber) {
      return NextResponse.json(
        { error: 'First name and mobile number are required' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmail = process.env.NEXT_PUBLIC_TO_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || 'info.premierpenny@gmail.com';

    // Generate HTML email template
    const emailHtml = getCreditCheckEmailTemplate({ firstName, mobileNumber });
    const emailText = `Credit Check Request\n\nName: ${firstName}\nMobile Number: ${mobileNumber}\nConsent Given: Yes`;

    // Send email asynchronously (non-blocking)
    sendOtpEmailAsync({
      to: adminEmail,
      subject: `Credit Check Request: ${firstName}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ message: 'Credit check request submitted successfully' });
  } catch (error) {
    console.error('Credit check form error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    // Return success even if email fails
    return NextResponse.json({
      message: 'Credit check request submitted successfully. We will process it soon.'
    });
  }
}
