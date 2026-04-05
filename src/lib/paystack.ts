export const initializePaystack = async (
    email: string,
    amount: number,
    fullName: string,
    phone?: string,
    paymentType?: string
  ) => {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount, fullName, phone, paymentType }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Failed to initialize payment");
    }
  
    return data;
  };