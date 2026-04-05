import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Read body ONCE as text for both signature verification and JSON parsing
    const rawBody = await req.text();

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody); // Safe — already have the text
    const { event: eventType, data } = event;

    if (eventType === "charge.success") {
      const supabase = await createServerClient();

      const { error: updateError } = await supabase
        .from("donations")
        .update({
          status: "successful",
          transaction_id: data.id.toString(),
          payment_method: data.channel,
          updated_at: new Date().toISOString(),
        })
        .eq("reference", data.reference);

      if (updateError) {
        console.error("Webhook update error:", updateError);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}