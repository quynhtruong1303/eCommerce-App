import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/auth/actions'

export default function SignUpPage() {
  return (
    <div><AuthForm mode="sign-up" onSubmit={signUp}/></div>
  )
}