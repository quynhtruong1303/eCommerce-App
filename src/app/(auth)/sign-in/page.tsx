import React from 'react'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function SignInPage() {
    return (
        <div><AuthForm type="sign-in" /></div>
    )
}