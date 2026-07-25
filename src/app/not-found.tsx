// app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen pt-16 flex flex-col items-center justify-center gap-6 text-center px-8">
            <span className="text-xs font-mono tracking-widest uppercase text-gray-400">404</span>
            <h1 className="text-4xl font-bold">Page not found</h1>
            <p className="text-gray-500 text-sm max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link 
                href="/"
                className="px-5 py-2.5 text-sm border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
                Go home
            </Link>
        </div>
    )
}