import { NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/email';

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

    await sendOtpEmail({
      to: adminEmail,
      subject: `Credit Check Request: ${firstName}`,
      text: `
Credit Check Request

Name: ${firstName}
Mobile Number: ${mobileNumber}
Consent Given: Yes
      `,
      html: `
        <h2>New Credit Check Request</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${firstName}</p>
          <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
          <p><strong>Consent Given:</strong> Yes</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Credit check request submitted successfully' });
  } catch (error) {
    console.error('Credit check form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
