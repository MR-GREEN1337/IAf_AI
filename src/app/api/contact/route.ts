import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    console.log("API Request Received:", { name, email, subject, message });
    console.log("Sending email via Resend...");

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    console.log("Resend API Response:", response);

    // ✅ Fix: Correctly check if `response.data.id` exists
    if (!response || !response.data || !response.data.id) {
      throw new Error("Invalid response from Resend API");
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Error sending email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
