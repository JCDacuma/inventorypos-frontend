import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">🏠 Home Page TO</h1>
        <p className="text-gray-500">
          Welcome! wagmuna naten to galawin, tsaka na naten ayusin to pag may
          authentication na at login, Navigate to your dashboard below:
        </p>

        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}
