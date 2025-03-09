'use client';

import { Days_One, Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { average, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Login from './Login';
import Loading from './Loading';

const fugaz = Fugaz_One({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400',
});

export default function Dashboard() {
  const now = new Date();
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }

    return {
      num_days: total_number_of_days,
      average_mood: sum_moods / total_number_of_days,
    };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${24 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood: number) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      // Copy existing data to prevent mutation
      const newData = { ...userDataObj };

      // Ensure nested structure exists
      if (!newData[year]) newData[year] = {};
      if (!newData[year][month]) newData[year][month] = {};

      // Set the mood
      newData[year][month][day] = mood;

      // Update local state
      setData(newData);
      setUserDataObj(newData);

      // Update Firestore (fix overwriting issue)
      await setDoc(
        doc(db, 'users', currentUser.uid),
        { [`${year}.${month}.${day}`]: mood }, // Use dot notation for deep merge
        { merge: true }
      );
    } catch (error) {
      console.error('Failed to set data:', error);
    }
  }

  const moods = {
    '&*@#$': '😭',
    sad: '🥲',
    existing: '😐',
    good: '😊',
    happy: '🥰',
  };

  // Check if user already login or not
  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {(Object.keys(statuses) as Array<keyof typeof statuses>).map(
          (status, index) => {
            return (
              <div key={index} className=" flex flex-col gap-1 sm:gap-2">
                <p className="font-medium capitalize text-xs sm:text-sm truncate">
                  {status.replaceAll('_', ' ')}
                </p>
                <p className={`${fugaz.className} text-base sm:text-lg`}>
                  {statuses[status]}
                  {status === 'num_days' ? '🔥' : ''}
                </p>
              </div>
            );
          }
        )}
      </div>
      <h4
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {(Object.keys(moods) as Array<keyof typeof moods>).map(
          (mood, index) => {
            return (
              <button
                className={`p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center  flex-1`}
                key={index}
                onClick={() => {
                  const currentMoodValue = index + 1;
                  handleSetMood(currentMoodValue);
                }}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl">
                  {moods[mood]}
                </p>
                <p
                  className={`${fugaz.className} text-indigo-500 text-xs sm:text-sm md:text-md`}
                >
                  {mood}
                </p>
              </button>
            );
          }
        )}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
