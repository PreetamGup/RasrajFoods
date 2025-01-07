import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SuccessPayment() {
  const location = useLocation();
  const [paymentId, setPaymentId] = useState<string | null>(null);

  localStorage.removeItem('cart')

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("payment_id");
    setPaymentId(id);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-lg rounded-lg">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4 -4M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Thank you for your payment. Your transaction has been successfully
            processed.
          </p>
        </div>

        {paymentId && (
          <div className="bg-gray-100 p-4 rounded-lg text-center text-sm">
            <p className="text-gray-600">Payment ID:</p>
            <p className="font-mono text-gray-900 text-base break-all">{paymentId}</p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
