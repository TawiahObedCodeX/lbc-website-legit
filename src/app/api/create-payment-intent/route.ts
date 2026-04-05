import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, amount, fullName, phone, paymentType } = await req.json();

    if (!email || !amount || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reference = `DON-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    const supabase = await createServerClient();

    const { data: donation, error: dbError } = await supabase
      .from("donations")
      .insert({
        reference,
        full_name: fullName,
        email,
        phone: phone || null,
        amount: Math.round(amount * 100), // pesewas
        payment_type: paymentType || null,
        status: "pending",
        currency: "GHS",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to initialize transaction" },
        { status: 500 }
      );
    }

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100),
          reference,
          currency: "GHS",
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-payment?reference=${reference}`,
          metadata: {
            full_name: fullName,
            phone: phone || null,
            payment_type: paymentType || null,
            donation_id: donation.id,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      await supabase
        .from("donations")
        .update({ status: "failed" })
        .eq("reference", reference);

      return NextResponse.json(
        { error: paystackData.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      reference,
      access_code: paystackData.data.access_code,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}