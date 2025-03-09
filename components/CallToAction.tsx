'use client';
import React from 'react';
import Button from './Button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="mx-auto max-w-[600px] w-full">
        <Link href={'/dashboard'}>
          <Button text="Go To Dashboard" dark={true} full={true} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={'/dashboard'}>
        <Button text="Sign Up" dark={false} full={false} />
      </Link>
      <Link href={'/dashboard'}>
        <Button text="Login" dark full={false} />
      </Link>
    </div>
  );
}
