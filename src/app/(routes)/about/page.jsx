import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">
          About SmartPack
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-purple-500">
              SmartPack is your intelligent travel companion for effortless
              packing.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-purple-500">Purpose</dt>
                <dd className="mt-1 text-sm text-purple-900 sm:mt-0 sm:col-span-2">
                  To assist users in planning their travel by providing clothing
                  suggestions tailored to weather conditions, travel
                  preferences, and activity patterns.
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-purple-500">
                  Target Audience
                </dt>
                <dd className="mt-1 text-sm text-purple-900 sm:mt-0 sm:col-span-2">
                  Travelers who want personalized packing lists based on weather
                  and activities.
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-purple-500">
                  Key Features
                </dt>
                <dd className="mt-1 text-sm text-purple-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Weather-based clothing suggestions</li>
                    <li>
                      Personalized recommendations based on user preferences
                    </li>
                    <li>Activity-specific packing lists</li>
                    <li>Multi-traveler support</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/" className="text-purple-600 hover:text-purple-900">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
