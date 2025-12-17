import { NextResponse } from 'next/server';
import { sendOtpEmailAsync } from '@/lib/email';

export async function POST(request) {
  try {
    const formData = await request.json();

    const { name, phone, city, propertyType, loanAmount, duration, monthlyIncome, employmentType, remarks } = formData;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmail = process.env.NEXT_PUBLIC_TO_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || 'codeshorts007@gmail.com';

    const durationText = (() => {
      const months = Number(duration || 120);
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      return `${years > 0 ? years + ' year' + (years > 1 ? 's' : '') : ''}${years > 0 && remMonths > 0 ? ' ' : ''}${remMonths > 0 ? remMonths + ' month' + (remMonths > 1 ? 's' : '') : ''}`.trim() || 'Not specified';
    })();

    // Send email asynchronously (non-blocking)
    sendOtpEmailAsync({
      to: adminEmail,
      subject: `Home Loan Inquiry: ${name}`,
      text: `
Home Loan Inquiry Form Submission

Name: ${name}
Phone: ${phone}
City: ${city || 'Not provided'}
Property Type: ${propertyType || 'Not provided'}
Loan Amount: ₹${loanAmount || 'Not provided'}
Loan Duration: ${durationText} (${duration || 'N/A'} months)
Monthly Income: ₹${monthlyIncome || 'Not provided'}
Employment Type: ${employmentType || 'Not provided'}
Remarks: ${remarks || 'None'}
      `,
      html: `
        <h2>New Home Loan Inquiry</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city || 'Not provided'}</p>
          <p><strong>Property Type:</strong> ${propertyType || 'Not provided'}</p>
          <p><strong>Loan Amount:</strong> ₹${loanAmount || 'Not provided'}</p>
          <p><strong>Loan Duration:</strong> ${durationText} (${duration || 'N/A'} months)</p>
          <p><strong>Monthly Income:</strong> ₹${monthlyIncome || 'Not provided'}</p>
          <p><strong>Employment Type:</strong> ${employmentType || 'Not provided'}</p>
          <p><strong>Remarks:</strong> ${remarks || 'None'}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Home loan inquiry submitted successfully' });
  } catch (error) {
    console.error('Home loan form error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    // Return success even if email fails
    return NextResponse.json({
      message: 'Home loan inquiry submitted successfully. Our expert will call you soon.'
    });
  }
}
