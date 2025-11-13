import { Link } from "react-router"
import notfound from "../../assets/404.jpg"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 text-center">
      <div className="max-w-lg">
        <img
          src={notfound}
          alt="404 Not Found"
          className="w-full h-auto rounded-lg shadow-lg mb-6 animate-pulse"
        />
        <p className="text-xl font-medium text-gray-700 mb-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          It might have been moved or deleted — or maybe the URL is just a
          little off.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-wide transition-transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
