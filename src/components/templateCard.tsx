import React from 'react'

function TemplateCard() {
    return (
        <div className="w-full rounded-xl overflow-hidden animate-pulse">
            {/* Thumbnail */}
            <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800" />
            {/* Info */}
            <div className="p-3 flex flex-col gap-2">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
        </div>
    )
}

export default TemplateCard
