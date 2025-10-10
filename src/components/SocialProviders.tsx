'use client';

import React from 'react'
import Image from 'next/image'

interface SocialProvider {
    name: string;
    icon: string;
    action: () => void;
}

export default function SocialProviders() {
    const handleSocialSignIn = (provider: string) => {
        console.log(`${provider} sign in`);
    }

    const providers: SocialProvider[] = [
        {
            name: 'Google',
            icon: '/google.svg',
            action: () => console.log('Google sign in')
        }, {
            name: 'Apple',
            icon: '/apple.svg',
            action: () => console.log('Apple sign in'),
        },
    ];

    return (
        <div className="space-y-3">
            {providers.map((provider) => (
                <button key={provider.name} onClick={provider.action} type="button" className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-light-100 border-2 border-light-300 rounded-lg text-dark-900 text-body-medium font-jost font-medium hover:border-dark-900 transition-all duration-200">
                    <Image
                        src={provider.icon}
                        alt={`${provider.name} logo`} 
                        width={18}
                        height={18}
                        className="w-[18px] h-[18px]"
                    />
                    <span>Continue with {provider.name}</span>
                </button>
            ))}
        </div>
    );
}