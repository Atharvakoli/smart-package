"use client";
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-500">
          Contact Us
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-purple-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-purple-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-purple-700 font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-purple-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-500"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-purple-500">
            Other Ways to Reach Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-purple-500">
                Customer Support
              </h4>
              <p className="text-purple-700">Email: support@smartpack.com</p>
              <p className="text-purple-700">Phone: +1 (800) 123-4567</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sales Inquiries</h4>
              <p className="text-purple-700">Email: sales@smartpack.com</p>
              <p className="text-purple-700">Phone: +1 (800) 987-6543</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
