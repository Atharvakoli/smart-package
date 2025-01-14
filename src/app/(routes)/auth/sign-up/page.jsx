"use client";

import { useAuth } from "@/app/auth-context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const { state, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateContact(contact)) {
      alert("Please enter a valid contact number.");
      return;
    }

    const userDetails = { name, email, contactNumber: contact, password };
    const user = await signUp(userDetails);

    if (user) {
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
    }
    console.log(user?.message);

    if (user?.error === "User already exists.") {
      router.push("/auth/sign-in");
    } else if (user?.message === "User registered successfully.") {
      router.push("/");
    }
  };

  const validateContact = (contact) => {
    const contactRegex =
      /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    return contactRegex.test(contact);
  };

  return (
    <div className="min-h-48 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-purple-600 font-bold mb-6 text-center">
          Sign Up
        </h1>
        {state.loading && (
          <p className="text-center text-blue-500 mb-4">Loading...</p>
        )}
        {state.error && (
          <p className="text-center text-red-500 mb-4">{state.error}</p>
        )}
        {state.user?.message && (
          <p className="text-center text-green-500 mb-4">
            {state.user?.message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-80">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-purple-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={state.loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-purple-700"
            />
          </div>
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
              disabled={state.loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-purple-700"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-purple-700"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={state.loading}
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
              disabled={state.loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-purple-700"
            />
          </div>
          <button
            type="submit"
            disabled={state.loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              state.loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {state.loading ? "Submitting..." : "Sign Up"}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => router.push("/auth/sign-in")}
              className="text-blue-500 hover:underline"
            >
              Already have an account? Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
