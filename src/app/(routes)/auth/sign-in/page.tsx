"use client";

import { useAuth } from "@/app/auth-context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, state } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log(user?.error);
      if (user?.error === "New User, Please Sign Up or Password Incorrect.") {
        router.push("/auth/sign-up");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleNavigation = () => {
    router.push("/auth/sign-up");
  };

  return (
    <div className="min-h-48 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-purple-600 font-bold mb-6 text-center">
          Sign In
        </h1>
        {state.error && (
          <p className="text-center w-48 text-red-500 mb-4">{state.error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-80">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-purple-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Enter your email address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-purple-700"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-purple-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              aria-label="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-purple-700 "
            />
          </div>
          <button
            type="submit"
            aria-label="Sign In"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {state.loading ? (
              <p className="text-center text-blue-500 mb-4">Loading...</p>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleNavigation}
              className="text-blue-500 hover:underline"
            >
              Need an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
