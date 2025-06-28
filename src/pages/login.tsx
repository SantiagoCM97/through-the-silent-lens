/*
 * =====================================================================================
 *
 * --- FILE 2 of 5 ---
 * Path: /src/app/login/page.tsx
 * Description: This is the new login page. It's a simple form that asks for
 * the password. It's styled to match your site's aesthetic.
 *
 * =====================================================================================
 */

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // On successful login, redirect to the upload page
        router.push("/upload");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-100">
            Authentication Required
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Please enter the password to access the upload area.
          </p>
        </header>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700"
        >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
            />
          </div>

          {error && (
            <p className="mb-4 text-center text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-500 disabled:bg-gray-500"
          >
            {isLoading ? "Verifying..." : "Access"}
          </button>
        </form>
      </div>
    </main>
  );
}
