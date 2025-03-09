'use client';

import React, { useState } from 'react';
import { gradients, baseRating } from '@/utils/index';
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400',
});

const months = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};
const monthsArr = Object.keys(months);

const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface calendarProps {
  demo?: boolean;
  completeData?: Record<number, Record<number, Record<number, number>>>;
}

export default function Calendar(props: calendarProps) {
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const { demo, completeData } = props;

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  console.log(data);

  function handleIncrementMonth(val: number) {
    // +1 or -1
    // if we hit the bounds of the month, then we can adjust the year
    if (numericMonth + val < 0) {
      //set month value = 11 and decrement the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      // numeric month = 0 increment year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  // const year = 2024;
  // const month = 'July';
  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-2">
        <button onClick={() => handleIncrementMonth(-1)}>
          <i className="mr-auto text-indigo-500 text-lg sm:text-xl duration-200 hover:opacity-60 fa-solid fa-chevron-left"></i>
        </button>
        <p
          className={`text-center capitalize ${fugaz.className} textGradient whitespace-nowrap col-span-3`}
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button onClick={() => handleIncrementMonth(+1)}>
          <i className="ml-auto text-indigo-500 text-lg sm:text-xl duration-200 hover:opacity-60 fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py10">
        {[...Array(numRows).keys()].map((row, index) => {
          return (
            <div key={index} className="grid grid-cols-7 gap-1 ">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                const dayIndex =
                  index * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                const dayOfDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                const isToday = dayIndex === now.getDate();

                if (!dayOfDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex} />;
                }

                const color = demo
                  ? gradients.indigo[baseRating[String(dayIndex)]] // Convert number to string
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : 'white';

                return (
                  <div
                    style={{ background: color }}
                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                      isToday ? 'border-indigo-400' : 'border-indigo-100'
                    } ${color === 'white' ? 'text-indigo-400' : 'text-white'}`}
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
