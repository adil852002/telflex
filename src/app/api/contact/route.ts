import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email: email ?? null,
      phone: phone ?? null,
      subject: subject ?? null,
      message,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
