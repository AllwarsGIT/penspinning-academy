import React from 'react'

function Footer() {
    return (
        <footer className="w-full px-8 py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span className="font-bold text-sm">PSA</span>
                    <span className="text-xs text-gray-500">Pen Spinning Academy</span>
                </div>
                
                <span className="text-xs text-gray-500">© 2026 Álvaro Sánchez</span>
            </div>
        </footer>
    )
}

export default Footer