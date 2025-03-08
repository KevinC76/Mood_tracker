import { Fugaz_One } from 'next/font/google';
import React from 'react';

const fugaz = Fugaz_One({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400',
});

type ButtonProps = {
  text: string;
  dark: boolean;
  full: boolean;
};

export default function Button(props: ButtonProps) {
  const { text, dark, full } = props;

  return (
    <button
      className={`border-solid border-indigo-600 rounded-full overflow-hidden border-2 duration-200 hover:opacity-60 ${
        dark ? 'text-white bg-indigo-600 ' : 'text-indigo-600'
      } ${full ? 'grid place-items-center w-full' : ''}`}
    >
      <p
        className={`${fugaz.className} px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3`}
      >
        {text}
      </p>
    </button>
  );
}
