'use client';

import React, { useState, useTransition } from 'react';
import SocialProviders from './SocialProviders';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { signIn, signUp } from '@/lib/auth/actions';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isSignUp = type === 'sign-up';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = isSignUp 
          ? await signUp(formData) 
          : await signIn(formData);

        if (result.error) {
          setError(result.error);
        } else if (result.success) {
          // Redirect to home page on success
          router.push('/');
          router.refresh();
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-caption text-dark-700">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link href={isSignUp ? '/sign-in' : '/sign-up'} className="underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
        <h1 className="mt-3 text-heading-3 text-dark-900 font-medium">
          {isSignUp ? 'Join Nike Today!' : 'Welcome Back!'}
        </h1>
        <p className="mt-1 text-body text-dark-700">
          {isSignUp 
            ? 'Create your account to start your fitness journey' 
            : 'Sign in to continue your journey'}
        </p>
      </div>

      {/* Social Providers */}
      <SocialProviders />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300"></div>
        </div>
        <div className="relative flex justify-center text-caption">
          <span className="px-4 bg-light-200 text-dark-700 font-jost">
            Or {isSignUp ? 'sign up' : 'sign in'} with
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red/10 border border-red text-red px-4 py-3 rounded-lg text-body">
          {error}
        </div>
      )}

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full name input - Sign up only */}
        {isSignUp && (
          <div>
            <label 
              htmlFor="name" 
              className="block text-body-medium font-jost font-medium text-dark-900 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-700" />
              <input 
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                disabled={isPending}
                className="w-full pl-12 pr-4 py-3 border-2 border-light-300 rounded-lg focus:border-dark-900 focus:outline-none transition-colors duration-200 text-body font-jost disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-body-medium font-jost font-medium text-dark-900 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-700" />
            <input 
              id="email"
              name="email"
              type="email"
              required
              placeholder="johndoe@gmail.com"
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3 border-2 border-light-300 rounded-lg focus:border-dark-900 focus:outline-none transition-colors duration-200 text-body font-jost disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password input */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-body-medium font-jost font-medium text-dark-900 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-700" />
            <input 
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your password"
              disabled={isPending}
              className="w-full pl-12 pr-12 py-3 border-2 border-light-300 rounded-lg focus:border-dark-900 focus:outline-none transition-colors duration-200 text-body font-jost disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isPending}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-700 hover:text-dark-900 transition-colors disabled:opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {isSignUp && (
            <p className="mt-2 text-footnote font-jost text-dark-700">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-dark-900 text-light-100 text-body-medium font-jost font-bold rounded-lg hover:bg-dark-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending 
            ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
            : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>

        {/* Terms and Privacy - Sign up only */}
        {isSignUp && (
          <p className="text-footnote font-jost text-center text-dark-900">
            By signing up, you agree to our{' '}
            <a href="#" className="text-dark-900 underline hover:no-underline font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-dark-900 underline hover:no-underline font-medium">
              Privacy Policy
            </a>
          </p>
        )}
      </form>
    </div>
  );
}