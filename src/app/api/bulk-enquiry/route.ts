import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, organisation, city, state, quantity, product_interest, message } = body;

    if (!name || !phone || !city || !quantity) {
      return NextResponse.json({ error: "Name, phone, city and quantity are required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("bulk_enquiries").insert({
      name,
      phone,
      email: email ?? null,
      organisation: organisation ?? null,
      city,
      state: state ?? null,
      quantity: Number(quantity),
      product_interest: product_interest ?? null,
      message: message ?? null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Bulk enquiry route error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
