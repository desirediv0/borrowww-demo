import { NextResponse } from 'next/server';
import { sendOtpEmailAsync, getHomeLoanEmailTemplate } from '@/lib/email';

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
    const adminEmail = process.env.NEXT_PUBLIC_TO_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || 'info.premierpenny@gmail.com';

    const durationText = (() => {
      const months = Number(duration || 120);
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      return `${years > 0 ? years + ' year' + (years > 1 ? 's' : '') : ''}${years > 0 && remMonths > 0 ? ' ' : ''}${remMonths > 0 ? remMonths + ' month' + (remMonths > 1 ? 's' : '') : ''}`.trim() || 'Not specified';
    })();

    // Generate HTML email template
    const emailHtml = getHomeLoanEmailTemplate({
      name,
      phone,
      city,
      propertyType,
      loanAmount,
      duration,
      monthlyIncome,
      employmentType,
      remarks,
      durationText
    });
    const emailText = `Home Loan Inquiry Form Submission\n\nName: ${name}\nPhone: ${phone}\nCity: ${city || 'Not provided'}\nProperty Type: ${propertyType || 'Not provided'}\nLoan Amount: ₹${loanAmount || 'Not provided'}\nLoan Duration: ${durationText} (${duration || 'N/A'} months)\nMonthly Income: ₹${monthlyIncome || 'Not provided'}\nEmployment Type: ${employmentType || 'Not provided'}\nRemarks: ${remarks || 'None'}`;

    // Send email asynchronously (non-blocking)
    sendOtpEmailAsync({
      to: adminEmail,
      subject: `Home Loan Inquiry: ${name}`,
      text: emailText,
      html: emailHtml,
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
