import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Failure() {
  const location = useLocation();
  const [paymentId, setPaymentId] = useState<string | null>(null);

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
            className="h-20 w-20 text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.636-1.14.984-1.914l-6.928-9.52a1.5 1.5 0 0 0-2.472 0l-6.928 9.52c-.653.774-.07 1.914.984 1.914z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Payment Failed
          </h2>
          <p className="mt-2 text-gray-600">
            Unfortunately, your payment could not be processed. Please try
            again.
          </p>
        </div>

        {paymentId && (
          <div className="bg-gray-100 p-4 rounded-lg text-center text-sm">
            <p className="text-gray-600">Payment ID:</p>
            <p className="font-mono text-gray-900 text-base break-all">{paymentId}</p>
          </div>
        )}

        <div className="flex justify-center mt-6 space-x-4">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark"
          >
            Back to Home
          </a>
          <a
            href="/checkout"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-500 hover:bg-red-600"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  );
}
