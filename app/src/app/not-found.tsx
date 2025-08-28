export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="mt-4 text-lg text-gray-200">Page Not Found</p>
        <p className="mt-2 text-sm text-gray-300">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
