"use client";
import Link from 'next/link'
import React from 'react'

export default function Error() {
    // error page
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we that post.</p>
                    <p className="mt-4 mb-8 dark:text-gray-400">But you can view other great posts in our homvepage</p>
                    <Link rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
                </div>
            </div>
        </section>
    )
}
