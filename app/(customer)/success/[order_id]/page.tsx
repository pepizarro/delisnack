import { getPaymentMethod, PaymentMethods } from "@/payments/payments";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ order_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const orderId = (await params).order_id;
  const search = await searchParams;

  if (!search.token_ws) {
    return (
      <div>
        <h1>Error</h1>
        <p>Token not found</p>
      </div>
    );
  }

  const payment = getPaymentMethod("webpay" as PaymentMethods);
  const status = await payment.confirmTransaction(
    orderId,
    search.token_ws as string,
  );

  if (!status) {
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Success</h1>
    </div>
  );
}
