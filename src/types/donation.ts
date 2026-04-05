export interface DonationData {
  fullName: string;
  email: string;
  phone?: string;
  amount: number;
  paymentType?: "tithe" | "offering" | "missions";
  newsletter?: boolean;
}

export interface PaystackTransaction {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    currency: string;
    transaction_date: string;
    gateway_response: string;
    paid_at: string;
    channel: string;
    ip_address: string;
    metadata: any;
    log: any;
    fees: number;
    authorization: {
      authorization_code: string;
      card_type: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      bin: string;
      bank: string;
      channel: string;
      signature: string;
      reusable: boolean;
      country_code: string;
      account_name: string;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: any;
      risk_action: string;
    };
  };
}