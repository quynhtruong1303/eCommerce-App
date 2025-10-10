import React from 'react'

export default function AuthLayout ({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-light-200 flex">
            { /* Left side - Brand section */ }
            <div className="hidden lg:flex lg:w-1/2 bg-dark-900 text-light-100 p-12 flex-col justify-between realtive overflow-hidden">
                { /* Nike logo */ }
                <div className="relative z-10">
                    <svg width="80" height="29" viewBox="0 0 80 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M79.7143 0L21.418 25.1469C16.5644 27.2409 12.4814 28.2857 9.19105 28.2857C5.48886 28.2857 2.79193 26.9572 1.13569 24.3047C-1.01212 20.8822 -0.0732836 15.379 3.6112 9.56968C5.79885 6.17413 8.57993 3.05779 11.2901 0.0765583C10.6524 1.13035 5.02387 10.655 11.1794 15.1404C12.3973 16.041 14.1288 16.4824 16.2589 16.4824C17.9683 16.4824 19.9301 16.1986 22.0867 15.6267L79.7143 0Z" fill="white"/> 
                    </svg>
                </div>

                { /* Main content */ }
                <div className="relative z-10 space-y-6">
                    <h2 className="text-heading-2 font-jost font-bold leading-tight">
                        Just Do It
                    </h2>
                    <p className="text-lead font-jost text-dark-500 max-w-md">
                        Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
                    </p>

                    { /* Featured dots */}
                    <div className="flex gap-2 pt-8">
                        <div className="w-3 h-3 bg-light-100 rounded-full"></div>
                        <div className="w-3 h-3 bg-dark-700 rounded-full"></div>
                        <div className="w-3 h-3 bg-dark-700 rounded-full"></div>
                    </div>
                </div>

                { /* Copy rights */ }
                <div className="relative z-10">
                    <p className="text-caption font-jost text-dark-500">
                        © 2025 Nike. All rights reserved.
                    </p>
                </div>

                { /* Background pattern */ }
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-light-100 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-light-100 rounded-full blur-3xl"></div>
                </div>
            </div>

            { /* Right side - sign-in/sign-out section */ }
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}