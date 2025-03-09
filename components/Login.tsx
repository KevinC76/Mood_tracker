'use client';
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400',
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log('Signing up a new user');
        await signup(email, password);
      } else {
        console.log('Logging in existing user');
        await login(email, password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          text={authenticating ? 'Submitting' : 'Submit'}
          dark={false}
          full
          clickHandler={handleSubmit}
        />
        <p className="text-center py-2">
          {isRegister
            ? 'Already have an account? '
            : " Don't have an account? "}

          <button
            className="text-indigo-600"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
