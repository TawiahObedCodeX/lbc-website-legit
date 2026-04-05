import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate?error=missing_reference`
      );
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate?error=verification_failed`
      );
    }

    const { data: transaction } = paystackData;

    const supabase = await createServerClient();

    const { error: updateError } = await supabase
      .from("donations")
      .update({
        status: transaction.status === "success" ? "successful" : "failed",
        transaction_id: transaction.id.toString(),
        payment_method: transaction.channel,
        updated_at: new Date().toISOString(),
      })
      .eq("reference", reference);

    if (updateError) {
      console.error("Update error:", updateError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate?error=update_failed`
      );
    }

    if (transaction.status === "success") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate?success=true&reference=${reference}`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate?error=payment_failed`
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/donate?error=verification_error`
    );
  }
}