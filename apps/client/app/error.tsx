"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong!
          </h2>
          <p className="mb-4">{error.message || "Unexpected error."}</p>
          <Button onClick={() => reset()}>Retry</Button>
        </div>
      </body>
    </html>
  );
}
